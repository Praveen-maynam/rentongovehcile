import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";

const SOCKET_SERVER_URL = "http://192.168.1.31:3000";
const API_BASE_URL = "http://192.168.1.31:3000";

interface Call {
  _id: string;
  callerId: string;
  receiverId: string;
  callType: "audio" | "video";
  status: string;
  offer?: RTCSessionDescriptionInit;
  answer?: RTCSessionDescriptionInit;
  iceCandidates?: RTCIceCandidateInit[];
}

type Props = { userId: string; receiverId: string };

const CallApp: React.FC<Props> = ({ userId, receiverId }) => {
  const [call, setCall] = useState<Call | null>(null);
  const [status, setStatus] = useState<"idle" | "calling" | "ringing" | "connected" | "ended">("idle");

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);

  const socket = useRef<Socket | null>(null);

  const servers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
  const API = axios.create({ baseURL: API_BASE_URL });

  // ---------- Initialize Socket ----------
  useEffect(() => {
    socket.current = io(SOCKET_SERVER_URL, { transports: ["websocket"] });

    socket.current.on("incoming-call", (incoming: Call) => {
      setCall(incoming);
      setStatus("ringing");
    });

    socket.current.on("receive-offer", async ({ callId, offer }: { callId: string; offer: RTCSessionDescriptionInit }) => {
      await initWebRTC(callId, "receiver");
      if (peerConnection.current) {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        await API.post("/save-answer", { callId, answer });
        socket.current?.emit("send-answer", { callId, answer });
      }
    });

    socket.current.on("receive-answer", async ({ answer }: { answer: RTCSessionDescriptionInit }) => {
      if (peerConnection.current) await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.current.on("receive-ice", async ({ candidate }: { candidate: RTCIceCandidateInit }) => {
      if (peerConnection.current && candidate) await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  // ---------- Initialize WebRTC ----------
  const initWebRTC = async (callId: string, role: "caller" | "receiver") => {
    peerConnection.current = new RTCPeerConnection(servers);

    // ICE
    peerConnection.current.onicecandidate = async (event) => {
      if (event.candidate) {
        await API.post("/add-ice", { callId, candidate: event.candidate });
        socket.current?.emit("send-ice", { receiverId, candidate: event.candidate });
      }
    };

    peerConnection.current.ontrack = (event) => {
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
    };

    localStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStream.current.getTracks().forEach((track) => peerConnection.current!.addTrack(track, localStream.current!));
    if (localVideoRef.current) localVideoRef.current.srcObject = localStream.current;

    if (role === "caller") {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      await API.post("/save-offer", { callId, offer, receiverSocketId: receiverId });
      socket.current?.emit("send-offer", { receiverId, callId, offer });
    }
  };

  // ---------- Start Call ----------
  const handleStartCall = async () => {
    setStatus("calling");
    const { data } = await API.post("/start", { callerId: userId, receiverId, callType: "video", callerSocketId: socket.current?.id });
    setCall(data.call);
    socket.current?.emit("start-call", { callId: data.call._id, callerId: userId, receiverId });
    await initWebRTC(data.call._id, "caller");
  };

  // ---------- Accept Call ----------
  const handleAcceptCall = async () => {
    if (!call) return;
    setStatus("connected");
    await initWebRTC(call._id, "receiver");
    if (peerConnection.current && call.offer) {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(call.offer));
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      await API.post("/save-answer", { callId: call._id, answer });
      socket.current?.emit("send-answer", { callId: call._id, answer });
    }
  };

  // ---------- End Call ----------
  const handleEndCall = async () => {
    setStatus("ended");
    if (peerConnection.current) peerConnection.current.close();
    if (localStream.current) localStream.current.getTracks().forEach((track) => track.stop());
    await API.post("/end", { callId: call?._id, reason: "ended_by_user" });
    socket.current?.emit("end-call", { callId: call?._id });
    setCall(null);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Production Video Call</h1>

      {status === "idle" && <button onClick={handleStartCall} className="bg-green-600 px-6 py-3 rounded text-white">Start Call</button>}

      {status === "ringing" && (
        <div className="bg-yellow-300 p-4 rounded mb-4">
          <p className="font-semibold">Incoming Call...</p>
          <button onClick={handleAcceptCall} className="mt-2 bg-blue-600 px-4 py-2 rounded text-white">Accept</button>
          <button onClick={handleEndCall} className="mt-2 ml-2 bg-red-600 px-4 py-2 rounded text-white">Reject</button>
        </div>
      )}

      {status === "calling" && <p className="mb-4 font-semibold">Calling...</p>}

      {(status === "connected" || status === "calling") && (
        <div className="grid grid-cols-2 gap-4 mt-4 w-full max-w-4xl">
          <video ref={localVideoRef} autoPlay muted className="w-full rounded-lg bg-black" />
          <video ref={remoteVideoRef} autoPlay className="w-full rounded-lg bg-black" />
        </div>
      )}

      {status === "connected" && (
        <button onClick={handleEndCall} className="mt-4 bg-red-600 px-6 py-3 rounded text-white">End Call</button>
      )}
    </div>
  );
};

export default CallApp;