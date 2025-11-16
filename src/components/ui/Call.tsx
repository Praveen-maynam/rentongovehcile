// import React, { useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";

// interface CallProps {
//   userId: string;
//   receiverId: string;
//   isOpen: boolean;
//   onClose: () => void;
// }

// interface Call {
//   callId: string;
//   receiverId: string;
//   callType: string;
//   offer?: any;
// }

// const Call: React.FC<CallProps> = ({ userId, receiverId, isOpen, onClose }) => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [callHistory, setCallHistory] = useState<Call[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [isConnected, setIsConnected] = useState(false);

//   // Initialize WebSocket connection with reconnection logic
//   useEffect(() => {
//     console.log("🔍 useEffect triggered. isOpen state:", isOpen);

//     if (!isOpen) {
//       console.log("🔒 Call component is closed. Skipping WebSocket initialization.");
//       return;
//     }

//     console.log("🌐 Initializing WebSocket connection...");

//     const serverUrl = "wss://3.110.122.127:3000"; // Updated to secure WebSocket

//     // Fetch authToken dynamically (example implementation)
//     const fetchAuthToken = async () => {
//       try {
//         console.log("🔑 Fetching authentication token...");
//         const response = await fetch("/api/auth/token"); // Replace with your API endpoint
//         const data = await response.json();
//         console.log("🔑 Authentication token fetched successfully:", data.token);
//         return data.token;
//       } catch (error) {
//         console.error("❌ Failed to fetch auth token:", error);
//         setError("Failed to fetch authentication token. Please try again.");
//         return null;
//       }
//     };

//     const initializeSocket = async () => {
//       const authToken = await fetchAuthToken();
//       if (!authToken) {
//         console.error("❌ Authentication token is null. Aborting WebSocket initialization.");
//         return;
//       }

//       console.log("🌐 Creating WebSocket instance with token:", authToken);

//       const s = io(serverUrl, {
//         transports: ["websocket"],
//         auth: { token: authToken },
//         reconnection: true,
//         reconnectionAttempts: 5,
//         reconnectionDelay: 2000,
//       });

//       console.log("🌐 WebSocket instance created:", s);

//       setSocket(s);

//       s.on("connect", () => {
//         console.log("✅ Connected to WebSocket server");
//         setIsConnected(true);
//       });

//       s.on("disconnect", (reason) => {
//         console.warn("⚠️ Disconnected from WebSocket server:", reason);
//         setIsConnected(false);
//         if (reason === "io server disconnect") {
//           console.warn("Server disconnected the client. Attempting to reconnect...");
//           s.connect();
//         }
//       });

//       s.on("reconnect", (attempt) => {
//         console.log(`🔄 Reconnected to WebSocket server after ${attempt} attempts`);
//         setIsConnected(true);
//       });

//       s.on("reconnect_failed", () => {
//         console.error("❌ Failed to reconnect to WebSocket server");
//         setError("Unable to reconnect to server. Please check your connection.");
//       });

//       s.on("connect_error", (err) => {
//         console.error("❌ Connection error:", err.message);
//         setError("Connection error. Please verify the server URL and your network.");
//       });

//       s.on("callHistory", (history: Call[]) => {
//         console.log("📜 Received call history:", history);
//         setCallHistory(history);
//       });

//       s.on("error", (err: string) => {
//         console.error("❌ WebSocket error:", err);
//         setError(err);
//       });

//       return () => {
//         console.log("🔌 Disconnecting from WebSocket server");
//         s.disconnect();
//       };
//     };

//     initializeSocket();
//   }, [isOpen]);

//   // Clear success message after a delay
//   useEffect(() => {
//     if (successMessage) {
//       const timer = setTimeout(() => setSuccessMessage(null), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage]);

//   const waitForConnection = (callback: () => void, interval = 1000, maxAttempts = 5) => {
//     let attempts = 0;

//     const intervalId = setInterval(() => {
//       if (isConnected) {
//         clearInterval(intervalId);
//         callback();
//       } else {
//         attempts++;
//         console.warn(`Waiting for WebSocket connection... Attempt ${attempts}`);
//         if (attempts >= maxAttempts) {
//           clearInterval(intervalId);
//           setError("Unable to connect to server. Please try again later.");
//         }
//       }
//     }, interval);
//   };

//   const handleSocketEmit = (
//     event: string,
//     data: any,
//     successCallback: () => void,
//     errorMessage: string
//   ) => {
//     if (!socket) {
//       setError("WebSocket is not initialized. Please try again later.");
//       console.error("❌ Attempted to emit event without WebSocket instance:", event, data);
//       return;
//     }

//     if (!isConnected) {
//       console.warn("⚠️ Attempted to emit event while disconnected. Retrying...");
//       waitForConnection(() => handleSocketEmit(event, data, successCallback, errorMessage));
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       socket.emit(event, data, (response: any) => {
//         setIsLoading(false);
//         if (response.error) {
//           setError(response.error);
//           console.error("❌ Server responded with error:", response.error);
//         } else {
//           successCallback();
//         }
//       });
//     } catch (err) {
//       setIsLoading(false);
//       setError(errorMessage);
//       console.error("❌ Error emitting event:", event, err);
//     }
//   };

//   const startCall = (callId: string, callType: string, offer: any) => {
//     console.log("🔍 Checking WebSocket instance before starting call...");
//     console.log("Current socket state:", socket);
//     console.log("Connection status:", isConnected);

//     if (!socket) {
//       console.warn("⚠️ WebSocket instance is null. Attempting to reinitialize...");
//       setError("WebSocket is not initialized. Reinitializing connection...");

//       // Attempt to reinitialize WebSocket
//       const serverUrl = "http://3.110.122.127:3000";
//       const authToken = "your-auth-token";

//       const s = io(serverUrl, {
//         transports: ["websocket"],
//         auth: { token: authToken },
//         reconnection: true,
//         reconnectionAttempts: 5,
//         reconnectionDelay: 2000,
//       });

//       console.log("🌐 New WebSocket instance created:", s);

//       setSocket(s);

//       s.on("connect", () => {
//         console.log("✅ Reconnected to WebSocket server");
//         setIsConnected(true);
//         startCall(callId, callType, offer); // Retry starting the call after reconnection
//       });

//       s.on("connect_error", (err) => {
//         console.error("❌ Connection error during reinitialization:", err.message);
//         setError("Failed to reinitialize WebSocket connection.");
//       });

//       return;
//     }

//     if (!isConnected) {
//       console.warn("⚠️ WebSocket is not connected. Retrying...");
//       waitForConnection(() => startCall(callId, callType, offer));
//       return;
//     }

//     setIsLoading(true); // Prevent further actions while processing

//     handleSocketEmit(
//       "startCall",
//       { callId, receiverId, callType, offer },
//       () => {
//         setSuccessMessage("Call started successfully");
//         setIsLoading(false);
//       },
//       "Failed to start call"
//     );
//   };

//   const answerCall = (callId: string) => {
//     handleSocketEmit(
//       "answerCall",
//       { callId },
//       () => setSuccessMessage("Call answered successfully"),
//       "Failed to answer call"
//     );
//   };

//   const endCall = (callId: string) => {
//     handleSocketEmit(
//       "endCall",
//       { callId },
//       () => setSuccessMessage("Call ended successfully"),
//       "Failed to end call"
//     );
//   };

//   const rejectCall = (callId: string) => {
//     handleSocketEmit(
//       "rejectCall",
//       { callId },
//       () => setSuccessMessage("Call rejected successfully"),
//       "Failed to reject call"
//     );
//   };

//   const getCallHistory = () => {
//     handleSocketEmit(
//       "getCallHistory",
//       { userId },
//       () => setSuccessMessage("Call history fetched successfully"),
//       "Failed to fetch call history"
//     );
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold">Call Component</h1>
//       {error && <p className="text-red-500">Error: {error}</p>}
//       {successMessage && <p className="text-green-500">{successMessage}</p>}
//       {isLoading && <p className="text-blue-500">Loading...</p>}
//       <div className="mt-4">
//         <button
//           onClick={() =>
//             startCall("690c9b5ce524c979c761040c", "video", { sdp: "example-offer" })
//           }
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Start Call
//         </button>
//         <button
//           onClick={() => answerCall("690c9fb0e524c979c76104c9")}
//           className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//         >
//           Answer Call
//         </button>
//         <button
//           onClick={() => endCall("")}
//           className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//         >
//           End Call
//         </button>
//         <button
//           onClick={() => rejectCall("call123")}
//           className="ml-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//         >
//           Reject Call
//         </button>
//         <button
//           onClick={getCallHistory}
//           className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//         >
//           Get Call History
//         </button>
//         <button
//           onClick={onClose}
//           className="ml-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
//         >
//           Close
//         </button>
//       </div>
//       <div className="mt-4">
//         <h2 className="text-lg font-semibold">Call History</h2>
//         <ul className="mt-2">
//           {callHistory.map((call) => (
//             <li key={call.callId} className="border-b py-2">
//               <p>Call ID: {call.callId}</p>
//               <p>Receiver ID: {call.receiverId}</p>
//               <p>Call Type: {call.callType}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Call;












// import React, { useEffect, useRef, useState } from "react";
// import { io, Socket } from "socket.io-client";

// interface Call {
//   callId: string;
//   senderId: string;
//   receiverId: string;
//   callType: "audio" | "video";
//   status: "ringing" | "connected" | "ended" | "rejected";
// }

// const App: React.FC = () => {
//   const socketRef = useRef<Socket | null>(null);

//   const [userId, setUserId] = useState("userA");
//   const [receiverId, setReceiverId] = useState("userB");
//   const [callType, setCallType] = useState<"audio" | "video">("audio");
//   const [activeCalls, setActiveCalls] = useState<Call[]>([]);
//   const [callHistory, setCallHistory] = useState<Call[]>([]);
//   const [isConnected, setIsConnected] = useState(false);

//   // Connect to Socket.IO (only on mount)
//   useEffect(() => {
//     if (socketRef.current) {
//       console.log("⚠️ Socket already connected, skipping reinitialization");
//       return;
//     }

//     console.log("🔌 Initializing Socket.IO connection...");
    
//     const socket = io("http://3.110.122.127:3000", {
//       transports: ["websocket"],
//       reconnection: true,
//       reconnectionAttempts: 10,
//       reconnectionDelay: 1000,
//       reconnectionDelayMax: 5000,
//     });
    
//     socketRef.current = socket;

//     // Connection status listeners
//     socket.on("connect", () => {
//       console.log("✅ Socket connected successfully");
//       setIsConnected(true);
//       // Emit getCallHistory only after connection is established
//       socket.emit("getCallHistory", { userId });
//     });

//     socket.on("connect_error", (error: any) => {
//       console.error("❌ Socket connection error:", error);
//       setIsConnected(false);
//     });

//     socket.on("disconnect", (reason: string) => {
//       console.warn("⚠️ Socket disconnected:", reason);
//       setIsConnected(false);
//     });

//     // Listen to incoming events
//     socket.on("incomingCall", (call: Call) => {
//       if (call.receiverId === userId) {
//         alert(`Incoming ${call.callType} call from ${call.senderId}`);
//         setActiveCalls((prev) => [...prev, call]);
//       }
//     });

//     socket.on("callAnswered", (call: Call) => {
//       setActiveCalls((prev) =>
//         prev.map((c) => (c.callId === call.callId ? call : c))
//       );
//     });

//     socket.on("callEnded", (call: Call) => {
//       setActiveCalls((prev) => prev.filter((c) => c.callId !== call.callId));
//       setCallHistory((prev) => [...prev, call]);
//     });

//     socket.on("callRejected", (call: Call) => {
//       setActiveCalls((prev) => prev.filter((c) => c.callId !== call.callId));
//       setCallHistory((prev) => [...prev, call]);
//     });

//     socket.on("callHistory", (history: Call[]) => {
//       console.log("📜 Received call history:", history);
//       setCallHistory(history);
//     });

//     return () => {
//       console.log("🔌 Cleaning up Socket.IO connection");
//       socket.disconnect();
//       socketRef.current = null;
//     };
//   }, []); // Empty dependency array - connect only on mount

//   // Refetch call history when userId changes
//   useEffect(() => {
//     if (socketRef.current?.connected) {
//       console.log("🔄 Requesting call history for userId:", userId);
//       socketRef.current.emit("getCallHistory", { userId });
//     }
//   }, [userId]);

//   // Call actions
//   const startCall = () => {
//     if (!socketRef.current?.connected) {
//       console.warn("⚠️ Socket not connected yet. Waiting...");
//       setTimeout(startCall, 500); // Retry after 500ms
//       return;
//     }

//     const callId = Date.now().toString();
//     console.log("📞 Starting call:", { callId, receiverId, callType });
    
//     socketRef.current.emit("startCall", {
//       callId,
//       senderId: userId,
//       receiverId,
//       callType,
//       offer: { sdp: "fake-offer" }, // replace with real WebRTC offer
//     });
//   };

//   const answerCall = (callId: string) => {
//     if (!socketRef.current?.connected) {
//       console.warn("⚠️ Socket not connected");
//       return;
//     }
//     socketRef.current.emit("answerCall", {
//       callId,
//       answer: { sdp: "fake-answer" }, // replace with real WebRTC answer
//     });
//   };

//   const endCall = (callId: string) => {
//     if (!socketRef.current?.connected) {
//       console.warn("⚠️ Socket not connected");
//       return;
//     }
//     socketRef.current.emit("endCall", { callId });
//   };

//   const rejectCall = (callId: string) => {
//     if (!socketRef.current?.connected) {
//       console.warn("⚠️ Socket not connected");
//       return;
//     }
//     socketRef.current.emit("rejectCall", { callId });
//   };

//   const refreshHistory = () => {
//     if (!socketRef.current?.connected) {
//       console.warn("⚠️ Socket not connected");
//       return;
//     }
//     socketRef.current.emit("getCallHistory", { userId });
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-bold">📞 Real-time Calls</h1>
//         <div className="flex items-center gap-2">
//           <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
//           <span className="text-sm font-semibold">{isConnected ? '🟢 Connected' : '🔴 Disconnected'}</span>
//         </div>
//       </div>

//       <div className="mb-4">
//         <label className="mr-2">Your ID:</label>
//         <input
//           value={userId}
//           onChange={(e) => setUserId(e.target.value)}
//           className="border px-2 py-1 rounded"
//         />
//       </div>

//       <div className="mb-6">
//         <label className="mr-2">Call User:</label>
//         <input
//           value={receiverId}
//           onChange={(e) => setReceiverId(e.target.value)}
//           className="border px-2 py-1 rounded mr-2"
//         />
//         <select
//           value={callType}
//           onChange={(e) => setCallType(e.target.value as "audio" | "video")}
//           className="border px-2 py-1 rounded mr-2"
//         >
//           <option value="audio">Audio</option>
//           <option value="video">Video</option>
//         </select>
//         <button
//           onClick={startCall}
//           disabled={!isConnected}
//           className={`${isConnected ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'} text-white px-3 py-1 rounded`}
//         >
//           Start Call
//         </button>
//       </div>

//       <div className="mb-6">
//         <h2 className="font-semibold mb-2">Active Calls</h2>
//         {activeCalls.length === 0 && <p>No active calls</p>}
//         <ul>
//           {activeCalls.map((call) => (
//             <li key={call.callId} className="mb-2">
//               {call.senderId} → {call.receiverId} ({call.callType}) -{" "}
//               <strong>{call.status}</strong>
//               {call.status === "ringing" && call.receiverId === userId && (
//                 <>
//                   <button
//                     onClick={() => answerCall(call.callId)}
//                     className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
//                   >
//                     Answer
//                   </button>
//                   <button
//                     onClick={() => rejectCall(call.callId)}
//                     className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
//                   >
//                     Reject
//                   </button>
//                 </>
//               )}
//               {call.status === "connected" && (
//                 <button
//                   onClick={() => endCall(call.callId)}
//                   className="ml-2 bg-gray-500 text-white px-2 py-1 rounded"
//                 >
//                   End
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <h2 className="font-semibold mb-2">Call History</h2>
//         <button
//           onClick={refreshHistory}
//           className="mb-2 bg-indigo-500 text-white px-3 py-1 rounded"
//         >
//           Refresh
//         </button>
//         {callHistory.length === 0 && <p>No call history</p>}
//         <ul>
//           {callHistory.map((call) => (
//             <li key={call.callId}>
//               {call.senderId} → {call.receiverId} ({call.callType}) -{" "}
//               <strong>{call.status}</strong>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default App;












// import React, { useRef } from "react";
// import io, { Socket } from "socket.io-client";

// type CallProps = {
//   callerId: string;
//   receiverId: string;
//   apiUrl: string; // http://3.110.122.127:3000
// };

// const CallButton: React.FC<CallProps> = ({ callerId, receiverId, apiUrl }) => {
//   const socketRef = useRef<Socket | null>(null);
//   const peerRef = useRef<RTCPeerConnection | null>(null);

//   const startCall = async (callType: "audio" | "video") => {
//     // ✔ 1. Connect Socket
//     socketRef.current = io(apiUrl);
//     socketRef.current.emit("join", callerId);

//     // ✔ 2. Setup Peer Connection
//     peerRef.current = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });

//     // Get media stream
//     const stream = await navigator.mediaDevices.getUserMedia({
//       audio: true,
//       video: callType === "video",
//     });

//     stream.getTracks().forEach((track) => {
//       peerRef.current?.addTrack(track, stream);
//     });

//     // Create WebRTC offer
//     const offer = await peerRef.current.createOffer();
//     await peerRef.current.setLocalDescription(offer);

//     // ✔ 3. POST API → /startCall
//     const payload = {
//       callerId,
//       receiverId,
//       callType,
//       offer, // WebRTC offer SDP
//     };

//     try {
//       const response = await fetch(`${apiUrl}/startCall`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();
//       console.log("📞 Call API Response:", data);

//       if (!data.success) {
//         alert("Call failed to initialize");
//         return;
//       }

//       // ✔ 4. Emit socket event to receiver
//       socketRef.current?.emit("startCall", {
//         callerId,
//         receiverId,
//         offer,
//         callType,
//       });

//       alert("☎️ Calling...");
//     } catch (error) {
//       console.error("Call API Error:", error);
//     }

//     // Listen for answer
//     socketRef.current?.on("callAnswered", async (answer: any) => {
//       console.log("📡 Received answer:", answer);
//       await peerRef.current?.setRemoteDescription(answer);
//     });
//   };

//   return (
//     <div className="p-3">
//       <button
//         className="px-4 py-2 bg-green-600 text-white rounded shadow w-full mb-2"
//         onClick={() => startCall("audio")}
//       >
//         🎤 Audio Call
//       </button>

//       <button
//         className="px-4 py-2 bg-blue-600 text-white rounded shadow w-full"
//         onClick={() => startCall("video")}
//       >
//         🎥 Video Call
//       </button>
//     </div>
//   );
// };

// export default CallButton;
















































// import React, { useEffect, useRef, useState } from "react";
// import io, { Socket } from "socket.io-client";

// interface CallProps {
//   userId: string;        // logged-in user or owner ID
//   receiverId: string;     // other person's ID
//   apiUrl: string;        // backend server URL
// }

// export default function UserOwnerCall({ userId, receiverId, apiUrl }: CallProps) {
//   const socketRef = useRef<Socket | null>(null);
//   const peerRef = useRef<RTCPeerConnection | null>(null);
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);

//   const [incomingCall, setIncomingCall] = useState<any>(null);
//   const [calling, setCalling] = useState(false);
//   const [inCall, setInCall] = useState(false);

//   // -------------------------------
//   // INIT SOCKET
//   // -------------------------------
//   // useEffect(() => {
//   //   socketRef.current = io(apiUrl);

//   //   // join room with self id
//   //   socketRef.current.emit("join", userId);

//   //   // incoming call
//   //   socketRef.current.on("incomingCall", (data) => {
//   //     setIncomingCall(data);
//   //   });

//   //   // answered call
//   //   socketRef.current.on("callAnswered", async ({ answer }) => {
//   //     await peerRef.current?.setRemoteDescription(answer);
//   //     setCalling(false);
//   //     setInCall(true);
//   //   });

//   //   // rejected
//   //   socketRef.current.on("callRejected", () => {
//   //     alert("❌ Call Rejected");
//   //     setCalling(false);
//   //   });

//   //   // end call
//   //   socketRef.current.on("callEnded", () => {
//   //     endLocalCall();
//   //   });

//   //   // ICE
//   //   socketRef.current.on("iceCandidate", async ({ candidate }) => {
//   //     try {
//   //       await peerRef.current?.addIceCandidate(candidate);
//   //     } catch (error) {
//   //       console.error("ICE add error", error);
//   //     }
//   //   });

//   //   return () => socketRef.current?.disconnect();
//   // }, [userId]);





//   useEffect(() => {
//   socketRef.current = io(apiUrl);

//   // Join room
//   socketRef.current.emit("join", userId);

//   // Incoming call
//   socketRef.current.on("incomingCall", (data) => {
//     setIncomingCall(data);
//   });

//   socketRef.current.on("callAnswered", async ({ answer }) => {
//     await peerRef.current?.setRemoteDescription(answer);
//     setCalling(false);
//     setInCall(true);
//   });

//   socketRef.current.on("callRejected", () => {
//     alert("❌ Call Rejected");
//     setCalling(false);
//   });

//   socketRef.current.on("callEnded", () => {
//     endLocalCall();
//   });

//   socketRef.current.on("iceCandidate", async ({ candidate }) => {
//     if (candidate) {
//       try {
//         await peerRef.current?.addIceCandidate(candidate);
//       } catch (e) {
//         console.error("ICE add error", e);
//       }
//     }
//   });

//   // Cleanup function
//   return () => {
//     socketRef.current?.disconnect();
//   };
// }, [userId, apiUrl]);


//   // -------------------------------
//   // SETUP WEBRTC
//   // -------------------------------
//   const setupPeer = async (callType: string) => {
//     peerRef.current = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });

//     peerRef.current.onicecandidate = (event) => {
//       if (event.candidate) {
//         socketRef.current?.emit("iceCandidate", {
//           receiverId: receiverId,
//           candidate: event.candidate,
//         });
//       }
//     };

//     peerRef.current.ontrack = (event) => {
//       if (remoteVideoRef.current) {
//         remoteVideoRef.current.srcObject = event.streams[0];
//       }
//     };

//     const stream = await navigator.mediaDevices.getUserMedia({
//       audio: true,
//       video: callType === "video",
//     });

//     if (localVideoRef.current) localVideoRef.current.srcObject = stream;

//     stream.getTracks().forEach((track) => {
//       peerRef.current?.addTrack(track, stream);
//     });
//   };

//   // -------------------------------
//   // START CALL
//   // -------------------------------
//   const startCall = async (callType: "audio" | "video") => {
//     setCalling(true);

//     await setupPeer(callType);

//     const offer = await peerRef.current!.createOffer();
//     await peerRef.current!.setLocalDescription(offer);

//     // POST API
//     await fetch(`${apiUrl}/startCall`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         callerId: userId,
//         receiverId: receiverId,
//         callType,
//         offer,
//       }),
//     });

//     socketRef.current?.emit("startCall", {
//       callerId: userId,
//       receiverId: receiverId,
//       callType,
//       offer,
//     });

//     console.log("📞 Calling partner...");
//   };

//   // -------------------------------
//   // ANSWER CALL
//   // -------------------------------
//   const answerCall = async () => {
//     if (!incomingCall) return;

//     await setupPeer(incomingCall.callType);

//     await peerRef.current!.setRemoteDescription(incomingCall.offer);

//     const answer = await peerRef.current!.createAnswer();
//     await peerRef.current!.setLocalDescription(answer);

//     // API
//     await fetch(`${apiUrl}/answerCall`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         callerId: incomingCall.callerId,
//         receiverId: userId,
//         answer,
//       }),
//     });

//     socketRef.current?.emit("answerCall", {
//       callerId: incomingCall.callerId,
//       receiverId: userId,
//       answer,
//     });

//     setIncomingCall(null);
//     setInCall(true);
//   };

//   // -------------------------------
//   // REJECT CALL
//   // -------------------------------
//   const rejectCall = async () => {
//     if (!incomingCall) return;

//     await fetch(`${apiUrl}/rejectCall`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         callerId: incomingCall.callerId,
//         receiverId: userId,
//       }),
//     });

//     socketRef.current?.emit("rejectCall", {
//       callerId: incomingCall.callerId,
//       receiverId: userId,
//     });

//     setIncomingCall(null);
//   };

//   // -------------------------------
//   // END CALL
//   // -------------------------------
//   const endCall = async () => {
//     await fetch(`${apiUrl}/endCall`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         userId: userId,
//         receiverId: receiverId,
//       }),
//     });

//     socketRef.current?.emit("endCall", {
//       userId: userId,
//       receiverId: receiverId,
//     });

//     endLocalCall();
//   };

//   // cleanup
//   const endLocalCall = () => {
//     setInCall(false);
//     setCalling(false);

//     peerRef.current?.getSenders().forEach((s) => s.track?.stop());
//     peerRef.current?.close();
//     peerRef.current = null;

//     if (localVideoRef.current) localVideoRef.current.srcObject = null;
//     if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
//   };

//   // -------------------------------
//   // UI
//   // -------------------------------
//   return (
//     <div className="p-4 space-y-4">
//       {/* USER TYPE: USER or OWNER - THEY BOTH USE THIS SAME FILE */}

//       {!inCall && !calling && (
//         <>
//           <button
//             onClick={() => startCall("audio")}
//             className="w-full p-3 bg-green-600 text-white rounded"
//           >
//             🎤 Audio Call
//           </button>

//           <button
//             onClick={() => startCall("video")}
//             className="w-full p-3 bg-blue-600 text-white rounded"
//           >
//             🎥 Video Call
//           </button>
//         </>
//       )}

//       {calling && (
//         <p className="text-center text-yellow-500 font-bold">📞 Calling...</p>
//       )}

//       {inCall && (
//         <button
//           onClick={endCall}
//           className="w-full p-3 bg-red-600 text-white rounded"
//         >
//           🔴 End Call
//         </button>
//       )}

//       {/* VIDEOS */}
//       <div className="grid grid-cols-2 gap-4">
//         <video ref={localVideoRef} autoPlay muted className="bg-black h-40" />
//         <video ref={remoteVideoRef} autoPlay className="bg-black h-40" />
//       </div>

//       {/* INCOMING CALL POPUP */}
//       {incomingCall && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg text-center">
//             <h1 className="text-xl font-bold mb-2">📞 Incoming Call</h1>
//             <p>From: {incomingCall.callerId}</p>

//             <div className="flex gap-4 mt-4 justify-center">
//               <button
//                 onClick={answerCall}
//                 className="px-4 py-2 bg-green-600 text-white rounded"
//               >
//                 Answer
//               </button>

//               <button
//                 onClick={rejectCall}
//                 className="px-4 py-2 bg-red-600 text-white rounded"
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





















































// import React, { useEffect, useRef, useState } from "react";
// import { io, Socket } from "socket.io-client";

// interface CallProps {
//   userId: string;         // logged-in user or owner
//   receiverId: string;     // the other person
//   apiUrl: string;         // backend API base URL
// }

// interface CallData {
//   callId: string;
//   callerId: string;
//   receiverId: string;
//   callType: string;
//   offer?: RTCSessionDescriptionInit;
// }

// export default function AudioCall({ userId, receiverId, apiUrl }: CallProps) {
//   const socketRef = useRef<Socket | null>(null);
//   const peerRef = useRef<RTCPeerConnection | null>(null);
//   const remoteAudioRef = useRef<HTMLAudioElement>(null);

//   const [incomingCall, setIncomingCall] = useState<CallData | null>(null);
//   const [calling, setCalling] = useState(false);
//   const [inCall, setInCall] = useState(false);
//   const [currentCallId, setCurrentCallId] = useState<string | null>(null);

//   // -------------------------------
//   // SOCKET.IO INIT
//   // -------------------------------
//   useEffect(() => {
//     const socket = io(apiUrl);
//     socketRef.current = socket;

//     socket.emit("join", userId);

//     socket.on("incomingCall", (data: CallData) => {
//       setIncomingCall(data);
//     });

//     socket.on("callAnswered", async ({ callId, answer }: { callId: string; answer: RTCSessionDescriptionInit }) => {
//       if (callId === currentCallId) {
//         await peerRef.current?.setRemoteDescription(answer);
//         setCalling(false);
//         setInCall(true);
//       }
//     });

//     socket.on("callRejected", ({ callId }: { callId: string }) => {
//       if (callId === currentCallId) {
//         alert("❌ Call Rejected");
//         setCalling(false);
//         setIncomingCall(null);
//       }
//     });

//     socket.on("callEnded", ({ callId }: { callId: string }) => {
//       if (callId === currentCallId) {
//         endLocalCall();
//       }
//     });

//     socket.on("iceCandidate", async ({ callId, candidate }: { callId: string; candidate: RTCIceCandidateInit }) => {
//       if (callId === currentCallId && candidate) {
//         try {
//           await peerRef.current?.addIceCandidate(candidate);
//         } catch (err) {
//           console.error("ICE candidate error", err);
//         }
//       }
//     });

//    return () => {
//     socket.disconnect();
//    }
//   }, [userId, apiUrl, currentCallId]);

//   // -------------------------------
//   // SETUP AUDIO PEER
//   // -------------------------------
//   const setupPeer = async () => {
//     peerRef.current = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });

//     peerRef.current.onicecandidate = (event) => {
//       if (event.candidate && currentCallId) {
//         socketRef.current?.emit("iceCandidate", {
//           callId: currentCallId,
//           candidate: event.candidate,
//         });
//       }
//     };

//     peerRef.current.ontrack = (event) => {
//       if (remoteAudioRef.current) {
//         remoteAudioRef.current.srcObject = event.streams[0];
//       }
//     };

//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
//     stream.getTracks().forEach((track) => peerRef.current?.addTrack(track, stream));
//   };

//   // -------------------------------
//   // START CALL
//   // -------------------------------
//   const startCall = async () => {
//     setCalling(true);

//     await setupPeer();

//     const offer = await peerRef.current!.createOffer();
//     await peerRef.current!.setLocalDescription(offer);

//     // API call
//     const res = await fetch(`${apiUrl}/startCall`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         callerId: userId,
//         receiverId,
//         callType: "audio",
//         offer: offer,
//       }),
//     });
//     const data: { callId: string } = await res.json();

//     setCurrentCallId(data.callId);

//     // Socket event
//     socketRef.current?.emit("startCall", {
//       callId: data.callId,
//       callerId: userId,
//       receiverId,
//       callType: "audio",
//       offer,
//     });
//   };

//   // -------------------------------
//   // ANSWER CALL
//   // -------------------------------
//   const answerCall = async () => {
//     if (!incomingCall) return;

//     setCurrentCallId(incomingCall.callId);

//     await setupPeer();

//     await peerRef.current!.setRemoteDescription(incomingCall.offer!);

//     const answer = await peerRef.current!.createAnswer();
//     await peerRef.current!.setLocalDescription(answer);

//     await fetch(`${apiUrl}/answerCall`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         callId: incomingCall.callId,
//         answer,
//       }),
//     });

//     socketRef.current?.emit("answerCall", {
//       callId: incomingCall.callId,
//       answer,
//     });

//     setIncomingCall(null);
//     setInCall(true);
//   };

//   // -------------------------------
//   // REJECT CALL
//   // -------------------------------
//   const rejectCall = async () => {
//     if (!incomingCall) return;

//     await fetch(`${apiUrl}/rejectCall`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ callId: incomingCall.callId }),
//     });

//     socketRef.current?.emit("rejectCall", { callId: incomingCall.callId });

//     setIncomingCall(null);
//   };

//   // -------------------------------
//   // END CALL
//   // -------------------------------
//   const endCall = async () => {
//     if (!currentCallId) return;

//     await fetch(`${apiUrl}/endCall`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ callId: currentCallId }),
//     });

//     socketRef.current?.emit("endCall", { callId: currentCallId });

//     endLocalCall();
//   };

//   // Cleanup local peer
//   const endLocalCall = () => {
//     try {
//       peerRef.current?.getSenders().forEach((s) => s.track?.stop());
//       peerRef.current?.close();
//     } catch {}
//     peerRef.current = null;
//     setInCall(false);
//     setCalling(false);
//     setIncomingCall(null);
//     setCurrentCallId(null);
//     if (remoteAudioRef.current) remoteAudioRef.current.srcObject = null;
//   };

//   // -------------------------------
//   // UI
//   // -------------------------------
//   return (
//     <div className="p-4 space-y-4">
//       {!calling && !inCall && (
//         <button
//           onClick={startCall}
//           className="w-full p-3 bg-green-600 text-white rounded"
//         >
//           🎤 Start Audio Call
//         </button>
//       )}

//       {calling && <p className="text-center text-yellow-500 font-bold">📞 Calling...</p>}

//       {inCall && (
//         <button
//           onClick={endCall}
//           className="w-full p-3 bg-red-600 text-white rounded"
//         >
//           🔴 End Call
//         </button>
//       )}

//       <audio ref={remoteAudioRef} autoPlay className="hidden" />

//       {incomingCall && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg text-center">
//             <h1 className="text-xl font-bold">📞 Incoming Audio Call</h1>
//             <p className="mt-2">From: {incomingCall.callerId}</p>
//             <div className="mt-4 flex gap-4 justify-center">
//               <button
//                 onClick={answerCall}
//                 className="px-4 py-2 bg-green-600 text-white rounded"
//               >
//                 Answer
//               </button>
//               <button
//                 onClick={rejectCall}
//                 className="px-4 py-2 bg-red-600 text-white rounded"
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

























// import React, { useEffect, useRef, useState } from "react";
// import io, { Socket } from "socket.io-client";

// interface CallProps {
//   userId: string;
//   receiverId: string;
//   apiUrl: string;
// }

// export default function AudioCall({ userId, receiverId, apiUrl }: CallProps) {
//   const socketRef = useRef<Socket | null>(null);
//   const peerRef = useRef<RTCPeerConnection | null>(null);
//   const localAudioRef = useRef<HTMLAudioElement>(null);
//   const remoteAudioRef = useRef<HTMLAudioElement>(null);

//   const [incomingCall, setIncomingCall] = useState<any>(null);
//   const [calling, setCalling] = useState(false);
//   const [inCall, setInCall] = useState(false);
//   const [callId, setCallId] = useState<string>("");

//   // -----------------------
//   // Socket.IO INIT
//   // -----------------------
//   useEffect(() => {
//     const socket = io(apiUrl);
//     socketRef.current = socket;
//     socket.emit("join", userId);

//     socket.on("incomingCall", (data) => setIncomingCall(data));

//     socket.on("callAnswered", async ({ answer }) => {
//       await peerRef.current?.setRemoteDescription(answer);
//       setCalling(false);
//       setInCall(true);
//     });

//     socket.on("callRejected", () => {
//       alert("❌ Call Rejected");
//       setCalling(false);
//       setIncomingCall(null);
//     });

//     socket.on("callEnded", () => endLocalCall());

//     socket.on("iceCandidate", async ({ candidate }) => {
//       if (candidate) await peerRef.current?.addIceCandidate(candidate);
//     });

//     return () => {socket.disconnect();}
//   }, [userId, apiUrl]);

//   // -----------------------
//   // WebRTC Setup
//   // -----------------------
//   const setupPeer = async () => {
//     peerRef.current = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });

//     peerRef.current.onicecandidate = (event) => {
//       if (event.candidate) {
//         socketRef.current?.emit("iceCandidate", {
//           receiverId: incomingCall ? incomingCall.callerId : receiverId,
//           candidate: event.candidate,
//         });
//       }
//     };

//     peerRef.current.ontrack = (event) => {
//       if (remoteAudioRef.current) remoteAudioRef.current.srcObject = event.streams[0];
//     };

//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     if (localAudioRef.current) localAudioRef.current.srcObject = stream;

//     stream.getTracks().forEach((track) => peerRef.current?.addTrack(track, stream));
//   };

//   // -----------------------
//   // START CALL
//   // -----------------------
//   const startCall = async () => {
//     setCalling(true);
//     await setupPeer();

//     const offer = await peerRef.current!.createOffer();
//     await peerRef.current!.setLocalDescription(offer);

//     const res = await fetch(`${apiUrl}/startCall`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ callerId: userId, receiverId, callType: "audio", offer }),
//     });
//     const data = await res.json();
//     setCallId(data.callId);

//     socketRef.current?.emit("startCall", { callerId: userId, receiverId, callType: "audio", offer });
//   };

//   // -----------------------
//   // ANSWER CALL
//   // -----------------------
//   const answerCall = async () => {
//     if (!incomingCall) return;
//     await setupPeer();

//     await peerRef.current!.setRemoteDescription(incomingCall.offer);
//     const answer = await peerRef.current!.createAnswer();
//     await peerRef.current!.setLocalDescription(answer);

//     await fetch(`${apiUrl}/answerCall`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ callId: incomingCall.callId, answer }),
//     });

//     socketRef.current?.emit("answerCall", { callId: incomingCall.callId, answer });
//     setIncomingCall(null);
//     setInCall(true);
//   };

//   // -----------------------
//   // REJECT CALL
//   // -----------------------
//   const rejectCall = async () => {
//     if (!incomingCall) return;
//     await fetch(`${apiUrl}/rejectCall`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ callId: incomingCall.callId }),
//     });

//     socketRef.current?.emit("rejectCall", { callId: incomingCall.callId });
//     setIncomingCall(null);
//   };

//   // -----------------------
//   // END CALL
//   // -----------------------
//   const endCall = async () => {
//     if (!callId) return;
//     await fetch(`${apiUrl}/endCall`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ callId }),
//     });

//     socketRef.current?.emit("endCall", { callId });
//     endLocalCall();
//   };

//   const endLocalCall = () => {
//     setCalling(false);
//     setInCall(false);
//     peerRef.current?.getSenders().forEach((s) => s.track?.stop());
//     peerRef.current?.close();
//     peerRef.current = null;

//     if (localAudioRef.current) localAudioRef.current.srcObject = null;
//     if (remoteAudioRef.current) remoteAudioRef.current.srcObject = null;
//     setCallId("");
//   };

//   // -----------------------
//   // UI
//   // -----------------------
//   return (
//     <div className="p-4 space-y-4">
//       {!inCall && !calling && !incomingCall && (
//         <button onClick={startCall} className="w-full p-3 bg-green-600 text-white rounded">
//           🎤 Start Audio Call
//         </button>
//       )}

//       {calling && <p className="text-center text-yellow-500 font-bold">📞 Calling...</p>}

//       {inCall && (
//         <button onClick={endCall} className="w-full p-3 bg-red-600 text-white rounded">
//           🔴 End Call
//         </button>
//       )}

//       <audio ref={localAudioRef} autoPlay muted />
//       <audio ref={remoteAudioRef} autoPlay />

//       {incomingCall && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg text-center">
//             <h1 className="text-xl font-bold mb-2">📞 Incoming Call</h1>
//             <p>From: {incomingCall.callerId}</p>
//             <div className="flex gap-4 mt-4 justify-center">
//               <button onClick={answerCall} className="px-4 py-2 bg-green-600 text-white rounded">Answer</button>
//               <button onClick={rejectCall} className="px-4 py-2 bg-red-600 text-white rounded">Reject</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }










































































// CallApp.tsx
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";

// ----------- Socket & API setup -----------
const SOCKET_SERVER_URL = "http://192.168.1.31:3000";
const API_BASE_URL = "http://192.168.1.31:3000";

const socket: Socket = io(SOCKET_SERVER_URL, { transports: ["websocket"] });
const API = axios.create({ baseURL: API_BASE_URL });

// ----------- Types -----------
interface Call {
  _id: string;
  callerId: string;
  receiverId: string;
  callType: "audio" | "video";
  status: string;
  offer?: any;
  answer?: any;
  iceCandidates?: any[];
}

type Props = { userId: string; receiverId: string };

// ----------- Component -----------
const CallApp: React.FC<Props> = ({ userId, receiverId }) => {
  const [callId, setCallId] = useState<string | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [incomingCall, setIncomingCall] = useState<Call | null>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);

  const servers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

  // ----------- Start Call -----------
  const startCall = async () => {
    setIsCalling(true);

    // Create call entry on backend
    const { data } = await API.post("/start", {
      callerId: userId,
      receiverId,
      callType: "video",
      
      callerSocketId: socket.id,
    });

    setCallId(data.call._id);

    // Notify receiver via socket
    socket.emit("start-call", {
      receiverId,
      callId: data.call._id,
      callerId: userId,

      socketId: socket.id,
    });

    initWebRTC(data.call._id, "caller");
  };

  // ----------- Initialize WebRTC -----------
  const initWebRTC = async (callId: string, role: "caller" | "receiver") => {
    peerConnection.current = new RTCPeerConnection(servers);

    // ICE candidates
    peerConnection.current.onicecandidate = async (event) => {
      if (event.candidate) {
        await API.post("/add-ice", { callId, candidate: event.candidate });
        socket.emit("send-ice", { receiverId, candidate: event.candidate });
      }
    };

    // Remote track
    peerConnection.current.ontrack = (event) => {
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
    };

    // Local media
    localStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStream.current.getTracks().forEach((track) => {
      peerConnection.current!.addTrack(track, localStream.current!);
    });

    if (localVideoRef.current) localVideoRef.current.srcObject = localStream.current;

    if (role === "caller") {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      await API.post("/save-offer", { callId, offer, receiverSocketId: socket.id });
      socket.emit("send-offer", { receiverId, offer });
    }
  };

  // ----------- Accept Call -----------
  const acceptCall = async (incoming: Call) => {
    setIncomingCall(null);
    setCallId(incoming._id);

    await initWebRTC(incoming._id, "receiver");

    if (!peerConnection.current) return;

    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(incoming.offer));
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);

    await API.post("/save-answer", { callId: incoming._id, answer });
    socket.emit("send-answer", { callerId: incoming.callerId, answer });
  };

  // ----------- Socket Events -----------
  useEffect(() => {
    socket.on("incoming-call", (data: Call) => setIncomingCall(data));

    socket.on("receive-offer", async ({ offer }: { offer: any }) => {
      console.log("Offer received", offer);
    });

    socket.on("receive-answer", async ({ answer }: { answer: any }) => {
      if (peerConnection.current) {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
      }
    });

    socket.on("receive-ice", async ({ candidate }: { candidate: any }) => {
      if (candidate && peerConnection.current) {
        try {
          await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
          console.error("ICE candidate error:", err);
        }
      }
    });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Video Call App</h1>

      {/* Start Call Button */}
      {!isCalling && !incomingCall && (
        <button
          onClick={startCall}
          className="px-6 py-3 bg-green-600 text-white rounded-lg mb-4"
        >
          Start Call
        </button>
      )}

      {/* Incoming Call */}
      {incomingCall && (
        <div className="bg-yellow-300 p-4 rounded-xl mb-4">
          <p className="font-semibold">Incoming Call...</p>
          <button
            onClick={() => acceptCall(incomingCall)}
            className="mt-2 px-5 py-2 bg-blue-600 text-white rounded"
          >
            Accept
          </button>
        </div>
      )}

      {/* Video */}
      <div className="grid grid-cols-2 gap-4 mt-4 w-full max-w-4xl">
        <video ref={localVideoRef} autoPlay muted className="w-full rounded-lg bg-black" />
        <video ref={remoteVideoRef} autoPlay className="w-full rounded-lg bg-black" />
      </div>
    </div>
  );
};

export default CallApp;












































// src/components/CallApp.tsx
// import React, { useEffect, useRef, useState } from "react";
// import { io, Socket } from "socket.io-client";
// import axios from "axios";

// const SOCKET_SERVER_URL = "http://192.168.1.31:3000";
// const API_BASE_URL = "http://192.168.1.31:3000";

// interface Call {
//   _id: string;
//   callerId: string;
//   receiverId: string;
//   callType: "audio" | "video";
//   status: string;
//   offer?: RTCSessionDescriptionInit;
//   answer?: RTCSessionDescriptionInit;
//   iceCandidates?: RTCIceCandidateInit[];
// }

// type Props = { userId: string; receiverId: string };

// const CallApp: React.FC<Props> = ({ userId, receiverId }) => {
//   const [call, setCall] = useState<Call | null>(null);
//   const [status, setStatus] = useState<"idle" | "calling" | "ringing" | "connected" | "ended">("idle");

//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);

//   const peerConnection = useRef<RTCPeerConnection | null>(null);
//   const localStream = useRef<MediaStream | null>(null);

//   const socket = useRef<Socket | null>(null);

//   const servers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
//   const API = axios.create({ baseURL: API_BASE_URL });

//   // ---------- Initialize Socket ----------
//   useEffect(() => {
//     socket.current = io(SOCKET_SERVER_URL, { transports: ["websocket"] });

//     socket.current.on("incoming-call", (incoming: Call) => {
//       setCall(incoming);
//       setStatus("ringing");
//     });

//     socket.current.on("receive-offer", async ({ callId, offer }: { callId: string; offer: RTCSessionDescriptionInit }) => {
//       await initWebRTC(callId, "receiver");
//       if (peerConnection.current) {
//         await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
//         const answer = await peerConnection.current.createAnswer();
//         await peerConnection.current.setLocalDescription(answer);
//         await API.post("/save-answer", { callId, answer });
//         socket.current?.emit("send-answer", { callId, answer });
//       }
//     });

//     socket.current.on("receive-answer", async ({ answer }: { answer: RTCSessionDescriptionInit }) => {
//       if (peerConnection.current) await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
//     });

//     socket.current.on("receive-ice", async ({ candidate }: { candidate: RTCIceCandidateInit }) => {
//       if (peerConnection.current && candidate) await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
//     });

//     return () => {
//       socket.current?.disconnect();
//     };
//   }, []);

//   // ---------- Initialize WebRTC ----------
//   const initWebRTC = async (callId: string, role: "caller" | "receiver") => {
//     peerConnection.current = new RTCPeerConnection(servers);

//     // ICE
//     peerConnection.current.onicecandidate = async (event) => {
//       if (event.candidate) {
//         await API.post("/add-ice", { callId, candidate: event.candidate });
//         socket.current?.emit("send-ice", { receiverId, candidate: event.candidate });
//       }
//     };

//     peerConnection.current.ontrack = (event) => {
//       if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     localStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     localStream.current.getTracks().forEach((track) => peerConnection.current!.addTrack(track, localStream.current!));
//     if (localVideoRef.current) localVideoRef.current.srcObject = localStream.current;

//     if (role === "caller") {
//       const offer = await peerConnection.current.createOffer();
//       await peerConnection.current.setLocalDescription(offer);
//       await API.post("/save-offer", { callId, offer, receiverSocketId: receiverId });
//       socket.current?.emit("send-offer", { receiverId, callId, offer });
//     }
//   };

//   // ---------- Start Call ----------
//   const handleStartCall = async () => {
//     setStatus("calling");
//     const { data } = await API.post("/start", { callerId: userId, receiverId, callType: "video", callerSocketId: socket.current?.id });
//     setCall(data.call);
//     socket.current?.emit("start-call", { callId: data.call._id, callerId: userId, receiverId });
//     await initWebRTC(data.call._id, "caller");
//   };

//   // ---------- Accept Call ----------
//   const handleAcceptCall = async () => {
//     if (!call) return;
//     setStatus("connected");
//     await initWebRTC(call._id, "receiver");
//     if (peerConnection.current && call.offer) {
//       await peerConnection.current.setRemoteDescription(new RTCSessionDescription(call.offer));
//       const answer = await peerConnection.current.createAnswer();
//       await peerConnection.current.setLocalDescription(answer);
//       await API.post("/save-answer", { callId: call._id, answer });
//       socket.current?.emit("send-answer", { callId: call._id, answer });
//     }
//   };

//   // ---------- End Call ----------
//   const handleEndCall = async () => {
//     setStatus("ended");
//     if (peerConnection.current) peerConnection.current.close();
//     if (localStream.current) localStream.current.getTracks().forEach((track) => track.stop());
//     await API.post("/end", { callId: call?._id, reason: "ended_by_user" });
//     socket.current?.emit("end-call", { callId: call?._id });
//     setCall(null);
//   };

//   return (
//     <div className="p-6 flex flex-col items-center">
//       <h1 className="text-2xl font-bold mb-4">Production Video Call</h1>

//       {status === "idle" && <button onClick={handleStartCall} className="bg-green-600 px-6 py-3 rounded text-white">Start Call</button>}

//       {status === "ringing" && (
//         <div className="bg-yellow-300 p-4 rounded mb-4">
//           <p className="font-semibold">Incoming Call...</p>
//           <button onClick={handleAcceptCall} className="mt-2 bg-blue-600 px-4 py-2 rounded text-white">Accept</button>
//           <button onClick={handleEndCall} className="mt-2 ml-2 bg-red-600 px-4 py-2 rounded text-white">Reject</button>
//         </div>
//       )}

//       {status === "calling" && <p className="mb-4 font-semibold">Calling...</p>}

//       {(status === "connected" || status === "calling") && (
//         <div className="grid grid-cols-2 gap-4 mt-4 w-full max-w-4xl">
//           <video ref={localVideoRef} autoPlay muted className="w-full rounded-lg bg-black" />
//           <video ref={remoteVideoRef} autoPlay className="w-full rounded-lg bg-black" />
//         </div>
//       )}

//       {status === "connected" && (
//         <button onClick={handleEndCall} className="mt-4 bg-red-600 px-6 py-3 rounded text-white">End Call</button>
//       )}
//     </div>
//   );
// };

// export default CallApp; 













































// import React, { useEffect, useRef, useState } from "react";
// import { io, Socket } from "socket.io-client";
// import axios from "axios";

// const SOCKET_SERVER_URL = "http://192.168.1.31:3000";
// const API_BASE_URL = "http://192.168.1.31:3000";

// interface Call {
//   _id: string;
//   callerId: string;
//   receiverId: string;
//   callType: "audio";
//   status: string;
//   offer?: RTCSessionDescriptionInit;
//   answer?: RTCSessionDescriptionInit;
//   iceCandidates?: RTCIceCandidateInit[];
// }

// type Role = "owner" | "user";

// interface Props {
//   userId: string;
//   targetId: string;
//   role: Role;
// }

// const AudioCallApp: React.FC<Props> = ({ userId, targetId, role }) => {
//   const [call, setCall] = useState<Call | null>(null);
//   const [callStatus, setCallStatus] = useState<"idle" | "ringing" | "connected" | "ended">("idle");
//   const [isMuted, setIsMuted] = useState(false);

//   const localAudioRef = useRef<HTMLAudioElement>(null);
//   const remoteAudioRef = useRef<HTMLAudioElement>(null);

//   const peerConnection = useRef<RTCPeerConnection | null>(null);
//   const localStream = useRef<MediaStream | null>(null);

//   const socket = useRef<Socket | null>(null);
//   const API = axios.create({ baseURL: API_BASE_URL });

//   const servers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

//   // ---------- Socket Setup ----------
//   useEffect(() => {
//     socket.current = io(SOCKET_SERVER_URL, { transports: ["websocket"] });

//     socket.current.on("incoming-call", (incoming: Call) => {
//       setCall(incoming);
//       setCallStatus("ringing");
//     });

//     socket.current.on("receive-offer", async ({ callId, offer }: { callId: string; offer: RTCSessionDescriptionInit }) => {
//       await initWebRTC(callId, "user");
//       if (peerConnection.current) {
//         await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
//         const answer = await peerConnection.current.createAnswer();
//         await peerConnection.current.setLocalDescription(answer);
//         await API.post("/save-answer", { callId, answer });
//         socket.current?.emit("send-answer", { callId, answer });
//       }
//     });

//     socket.current.on("receive-answer", async ({ answer }: { answer: RTCSessionDescriptionInit }) => {
//       if (peerConnection.current) {
//         await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
//       }
//     });

//     socket.current.on("receive-ice", async ({ candidate }: { candidate: any }) => {
//       if (peerConnection.current && candidate) await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
//     });

//     socket.current.on("end-call", () => endCallCleanup());

//     return () => {
//       socket.current?.disconnect();
//       endCallCleanup();
//     };
//   }, []);

//   // ---------- WebRTC Setup ----------
//   const initWebRTC = async (callId: string, role: Role) => {
//     peerConnection.current = new RTCPeerConnection(servers);

//     peerConnection.current.onicecandidate = async (event) => {
//       if (event.candidate) {
//         await API.post("/add-ice", { callId, candidate: event.candidate });
//         socket.current?.emit("send-ice", { targetId, candidate: event.candidate });
//       }
//     };

//     peerConnection.current.ontrack = (event) => {
//       if (remoteAudioRef.current) remoteAudioRef.current.srcObject = event.streams[0];
//     };

//     // Only audio
//     localStream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
//     localStream.current.getTracks().forEach((track) => peerConnection.current!.addTrack(track, localStream.current!));
//     if (localAudioRef.current) localAudioRef.current.srcObject = localStream.current;

//     if (role === "owner") {
//       const offer = await peerConnection.current.createOffer();
//       await peerConnection.current.setLocalDescription(offer);
//       const { data } = await API.post("/save-offer", { callId, offer, receiverSocketId: socket.current?.id });
//       socket.current?.emit("send-offer", { targetId, callId, offer });
//     }
//   };

//   // ---------- Owner starts call ----------
//   const startCall = async () => {
//     setCallStatus("ringing");
//     const { data } = await API.post("/start", {
//       callerId: userId,
//       receiverId: targetId,
//       callType: "audio",
//       callerSocketId: socket.current?.id,
//     });
//     setCall(data.call);
//     socket.current?.emit("start-call", { callId: data.call._id, callerId: userId, receiverId: targetId });
//     await initWebRTC(data.call._id, "owner");
//   };

//   // ---------- User accepts call ----------
//   const acceptCall = async () => {
//     if (!call) return;
//     setCallStatus("connected");
//     await initWebRTC(call._id, "user");
//     if (peerConnection.current && call.offer) {
//       await peerConnection.current.setRemoteDescription(new RTCSessionDescription(call.offer));
//       const answer = await peerConnection.current.createAnswer();
//       await peerConnection.current.setLocalDescription(answer);
//       await API.post("/save-answer", { callId: call._id, answer });
//       socket.current?.emit("send-answer", { callId: call._id, answer });
//     }
//   };

//   // ---------- End Call ----------
//   const endCall = async () => {
//     setCallStatus("ended");
//     socket.current?.emit("end-call", { callId: call?._id });
//     await API.post("/end", { callId: call?._id });
//     endCallCleanup();
//   };

//   const endCallCleanup = () => {
//     if (peerConnection.current) peerConnection.current.close();
//     if (localStream.current) localStream.current.getTracks().forEach((t) => t.stop());
//     peerConnection.current = null;
//     localStream.current = null;
//     setCall(null);
//     setCallStatus("idle");
//   };

//   // ---------- Mute ----------
//   const toggleMute = () => {
//     if (!localStream.current) return;
//     localStream.current.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
//     setIsMuted(!isMuted);
//   };

//   return (
//     <div className="p-6 flex flex-col items-center">
//       <h1 className="text-2xl font-bold mb-4">Audio Call</h1>

//       {role === "owner" && callStatus === "idle" && (
//         <button onClick={startCall} className="bg-green-600 px-6 py-3 rounded text-white">
//           Start Call
//         </button>
//       )}

//       {role === "user" && callStatus === "ringing" && (
//         <div className="bg-yellow-300 p-4 rounded mb-4">
//           <p className="font-semibold">Incoming Call...</p>
//           <button onClick={acceptCall} className="mt-2 bg-blue-600 px-4 py-2 rounded text-white">
//             Accept
//           </button>
//           <button onClick={endCall} className="mt-2 ml-2 bg-red-600 px-4 py-2 rounded text-white">
//             Reject
//           </button>
//         </div>
//       )}

//       {(callStatus === "ringing" || callStatus === "connected") && (
//         <div className="flex flex-col items-center space-y-4 mt-4">
//           <audio ref={localAudioRef} autoPlay muted />
//           <audio ref={remoteAudioRef} autoPlay />

//           <div className="flex space-x-4">
//             <button
//               onClick={toggleMute}
//               className={`px-4 py-2 rounded ${isMuted ? "bg-gray-600" : "bg-green-600"} text-white`}
//             >
//               {isMuted ? "Unmute" : "Mute"}
//             </button>

//             <button onClick={endCall} className="px-4 py-2 rounded bg-red-600 text-white">
//               End Call
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AudioCallApp;
export {}