import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

// ----------- Types -----------
interface CallData {
  _id: string;
  callerId: string;
  receiverId: string;
  callType: "audio" | "video";
  status: "ringing" | "accepted" | "rejected" | "missed" | "ended";
  callerSocketId?: string;
  receiverSocketId?: string;
  offer?: RTCSessionDescriptionInit;
  answer?: RTCSessionDescriptionInit;
  iceCandidates?: RTCIceCandidateInit[];
  startedAt?: Date;
  endedAt?: Date;
  duration?: number;
}

type Props = { 
  userId: string; // MongoDB ObjectId
  receiverId: string; // MongoDB ObjectId
  socketServerUrl?: string;
  apiBaseUrl?: string;
};

// ----------- Component -----------
const CallApp: React.FC<Props> = ({ 
  userId, 
  receiverId,
  socketServerUrl = "http://3.110.122.127:3000",
  apiBaseUrl = "http://3.110.122.127:3000"
}) => {
  const [callId, setCallId] = useState<string | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [incomingCall, setIncomingCall] = useState<CallData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionState, setConnectionState] = useState<string>("new");
  const [callStatus, setCallStatus] = useState<string>("idle");

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);
  const iceCandidatesQueue = useRef<RTCIceCandidateInit[]>([]);
  const socketRef = useRef<Socket | null>(null);

  const servers: RTCConfiguration = { 
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" }
    ] 
  };

  // ----------- API Helper -----------
  const apiCall = async (endpoint: string, data: any) => {
    try {
      const response = await fetch(`${apiBaseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'API call failed');
      }
      
      return result;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  };

  // ----------- Initialize Socket.IO -----------
  useEffect(() => {
    console.log("🔌 Connecting to Socket.IO server:", socketServerUrl);
    
    const socket = io(socketServerUrl, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    socketRef.current = socket;

    // Connection events
    socket.on("connect", () => {
      console.log("✅ Socket.IO connected, Socket ID:", socket.id);
      setIsConnected(true);
      
      // Register user
      console.log("📝 Registering user:", userId);
      socket.emit("register-user", { userId });
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Socket.IO disconnected, Reason:", reason);
      setIsConnected(false);
    });

    socket.on("connect_error", (error) => {
      console.error("❌ Socket.IO connection error:", error);
      setIsConnected(false);
    });

    // Call events
    socket.on("incoming-call", (data: CallData) => {
      console.log("📞 Incoming call received:", data);
      setIncomingCall(data);
      setCallStatus("ringing");
    });

    socket.on("receive-offer", async (data: { callId: string; offer: RTCSessionDescriptionInit; from: string }) => {
      console.log("📨 Offer received from:", data.from);
      await handleReceiveOffer(data);
    });

    socket.on("receive-answer", async (data: { answer: RTCSessionDescriptionInit; from: string }) => {
      console.log("📨 Answer received from:", data.from);
      await handleReceiveAnswer(data);
    });

    socket.on("receive-ice", async (data: { candidate: RTCIceCandidateInit; from: string }) => {
      console.log("🧊 ICE candidate received from:", data.from);
      await handleReceiveIce(data);
    });

    socket.on("call-ended", (data: { from: string; callId: string }) => {
      console.log("📴 Call ended by:", data.from);
      handleRemoteEndCall();
    });

    return () => {
      console.log("🔌 Disconnecting socket...");
      socket.disconnect();
    };
  }, [userId, socketServerUrl]);

  // ----------- Handle Offer -----------
  const handleReceiveOffer = async (data: { callId: string; offer: RTCSessionDescriptionInit; from: string }) => {
    if (!peerConnection.current) {
      console.warn("⚠️ Peer connection not initialized, initializing now...");
      await initWebRTC(data.callId, "receiver");
    }

    if (!peerConnection.current) {
      console.error("❌ Failed to initialize peer connection");
      return;
    }

    try {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.offer));
      console.log("✅ Remote description set from offer");

      // Process queued ICE candidates
      while (iceCandidatesQueue.current.length > 0) {
        const candidate = iceCandidatesQueue.current.shift();
        if (candidate && peerConnection.current) {
          await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
        }
      }
    } catch (err) {
      console.error("❌ Error setting remote description:", err);
    }
  };

  // ----------- Handle Answer -----------
  const handleReceiveAnswer = async (data: { answer: RTCSessionDescriptionInit; from: string }) => {
    if (!peerConnection.current) {
      console.warn("⚠️ Peer connection not available");
      return;
    }

    try {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.answer));
      console.log("✅ Answer set as remote description");
      setCallStatus("accepted");

      // Process queued ICE candidates
      while (iceCandidatesQueue.current.length > 0) {
        const candidate = iceCandidatesQueue.current.shift();
        if (candidate && peerConnection.current) {
          await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
        }
      }
    } catch (err) {
      console.error("❌ Error setting answer:", err);
    }
  };

  // ----------- Handle ICE Candidate -----------
  const handleReceiveIce = async (data: { candidate: RTCIceCandidateInit; from: string }) => {
    if (!peerConnection.current) {
      console.warn("⚠️ Peer connection not ready, queueing ICE candidate");
      iceCandidatesQueue.current.push(data.candidate);
      return;
    }

    try {
      if (peerConnection.current.remoteDescription) {
        await peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate));
        console.log("✅ ICE candidate added");
      } else {
        console.warn("⚠️ Remote description not set, queueing ICE candidate");
        iceCandidatesQueue.current.push(data.candidate);
      }
    } catch (err) {
      console.error("❌ Error adding ICE candidate:", err);
    }
  };

  // ----------- Initialize WebRTC -----------
  const initWebRTC = async (callId: string, role: "caller" | "receiver") => {
    console.log(`🚀 Initializing WebRTC as ${role}`);
    
    try {
      // Create peer connection
      peerConnection.current = new RTCPeerConnection(servers);

      // Monitor connection state
      peerConnection.current.onconnectionstatechange = () => {
        const state = peerConnection.current?.connectionState || "unknown";
        console.log("🔗 Connection state:", state);
        setConnectionState(state);

        if (state === "connected" && callId) {
          apiCall("/update-status", {
            callId,
            status: "accepted"
          }).catch(err => console.error("Error updating status:", err));
        }
      };

      peerConnection.current.oniceconnectionstatechange = () => {
        console.log("🧊 ICE connection state:", peerConnection.current?.iceConnectionState);
      };

      // Handle ICE candidates
      peerConnection.current.onicecandidate = async (event) => {
        if (event.candidate) {
          console.log("🧊 New ICE candidate generated");
          
          const target = role === "caller" ? receiverId : incomingCall?.callerId;
          
          if (!target) {
            console.error("❌ No target for ICE candidate");
            return;
          }
          
          try {
            // Save to database
            await apiCall("/add-ice", { 
              callId, 
              candidate: event.candidate 
            });
            
            // Send via socket
            if (socketRef.current) {
              socketRef.current.emit("send-ice", { 
                to: target, 
                candidate: event.candidate,
                from: userId
              });
              console.log("✅ ICE candidate sent to:", target);
            }
          } catch (err) {
            console.error("❌ Error sending ICE candidate:", err);
          }
        }
      };

      // Handle remote track
      peerConnection.current.ontrack = (event) => {
        console.log("🎥 Remote track received");
        if (remoteVideoRef.current && event.streams[0]) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      // Get local media
      localStream.current = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      console.log("📹 Local media stream obtained");

      // Add local tracks to peer connection
      localStream.current.getTracks().forEach((track) => {
        if (peerConnection.current && localStream.current) {
          peerConnection.current.addTrack(track, localStream.current);
        }
      });

      // Display local video
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream.current;
      }

      // Create and send offer (caller only)
      if (role === "caller") {
        console.log("📤 Creating offer...");
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        
        // Save offer to database
        await apiCall("/save-offer", { 
          callId, 
          offer,
          receiverSocketId: socketRef.current?.id || ""
        });
        
        // Send offer via socket
        if (socketRef.current) {
          socketRef.current.emit("send-offer", { 
            to: receiverId, 
            offer,
            from: userId,
            callId
          });
          console.log("✅ Offer sent to:", receiverId);
        }
      }
    } catch (err) {
      console.error("❌ Error initializing WebRTC:", err);
      alert("Failed to access camera/microphone. Please check permissions.");
      
      // Clean up on error
      setIsCalling(false);
      setCallStatus("idle");
    }
  };

  // ----------- Start Call -----------
  const startCall = async () => {
    if (!isConnected) {
      alert("Not connected to server. Please wait...");
      return;
    }

    if (!socketRef.current) {
      alert("Socket not initialized");
      return;
    }

    console.log("📞 Starting call to:", receiverId);
    setIsCalling(true);
    setCallStatus("ringing");

    try {
      // Create call entry using backend API
      const result = await apiCall("/start", {
        callerId: userId,
        receiverId,
        callType: "video",
        callerSocketId: socketRef.current.id
      });

      const newCallId = result.call._id;
      setCallId(newCallId);
      console.log("✅ Call created with ID:", newCallId);

      // Initialize WebRTC
      await initWebRTC(newCallId, "caller");

      // Emit start-call event to receiver with full call data
      console.log("📤 Emitting start-call to receiver:", receiverId);
      console.log("📤 Call data being sent:", {
        callId: newCallId,
        callerId: userId,
        receiverId: receiverId,
        call: result.call
      });
      
      socketRef.current.emit("start-call", {
        callId: newCallId,
        callerId: userId,
        receiverId: receiverId,
        call: result.call  // Send full call object
      });

      console.log("✅ Call started successfully");
    } catch (err) {
      console.error("❌ Error starting call:", err);
      setIsCalling(false);
      setCallStatus("idle");
      alert("Failed to start call. Please try again.");
    }
  };

  // ----------- Accept Call -----------
  const acceptCall = async () => {
    if (!incomingCall) {
      console.error("❌ No incoming call to accept");
      return;
    }

    console.log("✅ Accepting call from:", incomingCall.callerId);
    setCallId(incomingCall._id);
    setIsCalling(true);
    setCallStatus("accepted");

    try {
      // Initialize WebRTC
      await initWebRTC(incomingCall._id, "receiver");

      if (!peerConnection.current) {
        console.error("❌ Peer connection not initialized");
        return;
      }

      // Set remote description (offer)
      if (incomingCall.offer) {
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(incomingCall.offer)
        );
        console.log("✅ Remote offer set");
      }

      // Create and send answer
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      console.log("📤 Answer created");

      // Save answer to database
      await apiCall("/save-answer", { 
        callId: incomingCall._id, 
        answer 
      });

      // Send answer via socket
      if (socketRef.current) {
        socketRef.current.emit("send-answer", { 
          to: incomingCall.callerId,
          callId: incomingCall._id,
          answer,
          from: userId
        });
        console.log("✅ Answer sent to caller");
      }

      setIncomingCall(null);
    } catch (err) {
      console.error("❌ Error accepting call:", err);
      alert("Failed to accept call. Please try again.");
      setIsCalling(false);
      setCallStatus("idle");
    }
  };

  // ----------- Reject Call -----------
  const rejectCall = async () => {
    console.log("❌ Rejecting call");
    
    if (incomingCall && incomingCall._id) {
      try {
        // Update call status to rejected
        await apiCall("/update-status", {
          callId: incomingCall._id,
          status: "rejected"
        });

        // Notify caller
        if (socketRef.current) {
          socketRef.current.emit("call-ended", {
            to: incomingCall.callerId,
            from: userId,
            callId: incomingCall._id,
            reason: "rejected"
          });
        }
      } catch (err) {
        console.error("Error rejecting call:", err);
      }
    }
    
    setIncomingCall(null);
    setCallStatus("idle");
  };

  // ----------- End Call -----------
  const endCall = async () => {
    console.log("📴 Ending call");

    if (callId) {
      try {
        // End call in database
        await apiCall("/end", {
          callId,
          reason: "user ended"
        });

        // Notify other user
        const otherUser = incomingCall?.callerId || receiverId;
        if (socketRef.current) {
          socketRef.current.emit("end-call", {
            to: otherUser,
            from: userId,
            callId
          });
        }
      } catch (err) {
        console.error("Error ending call:", err);
      }
    }

    cleanupCall();
  };

  // ----------- Handle Remote End Call -----------
  const handleRemoteEndCall = () => {
    console.log("📴 Remote user ended call");
    alert("Call ended by remote user");
    cleanupCall();
  };

  // ----------- Cleanup Call -----------
  const cleanupCall = () => {
    // Close peer connection
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }

    // Stop local stream
    if (localStream.current) {
      localStream.current.getTracks().forEach(track => track.stop());
      localStream.current = null;
    }

    // Reset state
    setIsCalling(false);
    setCallId(null);
    setIncomingCall(null);
    iceCandidatesQueue.current = [];
    setConnectionState("new");
    setCallStatus("idle");

    // Clear video elements
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Video Call App</h1>
          <p className="text-gray-400 text-sm">User ID: {userId.substring(0, 8)}...</p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-gray-400">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            {callStatus !== "idle" && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-sm text-blue-400 font-semibold capitalize">
                  {callStatus}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Connection State */}
        {isCalling && (
          <div className="text-center mb-4">
            <span className="text-sm text-gray-400">
              WebRTC: <span className="text-blue-400 font-semibold">{connectionState}</span>
            </span>
          </div>
        )}

        {/* Start Call Button */}
        {!isCalling && !incomingCall && (
          <div className="text-center mb-6">
            <button
              onClick={startCall}
              disabled={!isConnected}
              className="px-8 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-xl font-semibold text-lg shadow-lg transition-all transform hover:scale-105 disabled:cursor-not-allowed"
            >
              📞 Start Video Call
            </button>
            <p className="text-gray-400 text-sm mt-3">
              Calling: {receiverId.substring(0, 8)}...
            </p>
          </div>
        )}

        {/* Incoming Call Banner */}
        {incomingCall && (
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-2xl mb-6 shadow-2xl animate-pulse">
            <div className="text-center">
              <p className="text-2xl font-bold text-white mb-2">📞 Incoming Call</p>
              <p className="text-white text-lg mb-4">
                From: {incomingCall.callerId.substring(0, 8)}...
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={acceptCall}
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow-lg transition-all transform hover:scale-105"
                >
                  ✅ Accept
                </button>
                <button
                  onClick={rejectCall}
                  className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-lg transition-all transform hover:scale-105"
                >
                  ❌ Reject
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Video Grid */}
        {isCalling && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Local Video */}
              <div className="relative">
                <div className="absolute top-3 left-3 bg-black bg-opacity-60 px-3 py-1 rounded-lg z-10">
                  <span className="text-white text-sm font-semibold">You</span>
                </div>
                <video 
                  ref={localVideoRef} 
                  autoPlay 
                  muted 
                  playsInline
                  className="w-full aspect-video rounded-xl bg-gray-900 shadow-2xl border-2 border-gray-700"
                />
              </div>

              {/* Remote Video */}
              <div className="relative">
                <div className="absolute top-3 left-3 bg-black bg-opacity-60 px-3 py-1 rounded-lg z-10">
                  <span className="text-white text-sm font-semibold">
                    {(receiverId || incomingCall?.callerId || 'Remote').substring(0, 8)}...
                  </span>
                </div>
                <video 
                  ref={remoteVideoRef} 
                  autoPlay 
                  playsInline
                  className="w-full aspect-video rounded-xl bg-gray-900 shadow-2xl border-2 border-gray-700"
                />
              </div>
            </div>

            {/* End Call Button */}
            <div className="text-center mt-6">
              <button
                onClick={endCall}
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-lg shadow-lg transition-all transform hover:scale-105"
              >
                📴 End Call
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallApp;