



import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import io, { Socket } from "socket.io-client";
import { Send, X, Minimize2, Image } from 'lucide-react';
 
interface UserInfo {
  _id: string;
  name: string;
  profilePic?: string;
}
 
interface ChatMessage {
  _id?: string;
  senderId: string | UserInfo;  // Can be populated or just ID
  receiverId: string | UserInfo | null;
  message: string;
  files?: string[];
  seen?: boolean;
  timestamp: string;
}
 
interface PopupChatProps {
  isOpen: boolean;
  onClose: () => void;
 
  // Page context - determines which side is "me"
  pageRole: "ownerView" | "customerView";
 
  // Current user info
  currentUserId: string;
  currentUserName?: string;
 
  // Owner info (vehicle owner)
  ownerId: string;
  ownerName: string;
  ownerAvatar?: string;
 
  // Customer info (person who booked)
  customerId: string;
  customerName: string;
  customerAvatar?: string;
 
  // Booking context
  bookingId: string;
  vehicleId?: string;
 
  // API config
  apiUrl: string;
  useRealtime?: boolean;
}
 
const PopupChat: React.FC<PopupChatProps> = ({
  isOpen,
  onClose,
  pageRole,
  currentUserId,
  currentUserName,
  ownerId,
  ownerName,
  ownerAvatar,
  customerId,
  customerName,
  customerAvatar,
  bookingId,
  vehicleId,
  apiUrl,
  useRealtime = true
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isConnected, setIsConnected] = useState(false);
 
  // Determine who is the "other person" based on current user
  const isOwner = currentUserId === ownerId;
  const otherUserId = isOwner ? customerId : ownerId;
  const otherUserName = isOwner ? customerName : ownerName;
  const otherUserAvatar = isOwner ? customerAvatar : ownerAvatar;
  const myAvatar = isOwner ? ownerAvatar : customerAvatar;
 
  const defaultOtherAvatar = otherUserAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${otherUserName}`;
  const defaultMyAvatar = myAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUserName || 'You'}`;
 
  // Debug on mount
  useEffect(() => {
    if (useRealtime) {
      console.log("🔍 ========= POPUP CHAT INITIALIZED =========");
      console.log("📄 Page Role:", pageRole);
      console.log("👤 Current User ID:", currentUserId);
      console.log("🎭 Is Owner?:", isOwner);
      console.log("🏢 Owner ID:", ownerId, "| Name:", ownerName);
      console.log("👥 Customer ID:", customerId, "| Name:", customerName);
      console.log("💬 Other User ID:", otherUserId, "| Name:", otherUserName);
      console.log("💬 Booking ID:", bookingId);
      console.log("🚗 Vehicle ID:", vehicleId);
      console.log("===========================================");
    }
  }, [pageRole, currentUserId, ownerId, customerId, bookingId, vehicleId, useRealtime, isOwner, otherUserId, otherUserName, ownerName, customerName]);
 
  // Auto-scroll to bottom
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
 
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
 
  // Initialize Socket.IO
  useEffect(() => {
    if (!isOpen || !useRealtime) return;
 
    console.log("🔌 Connecting to Socket.IO...", apiUrl);
    const socket = io(apiUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
   
    socketRef.current = socket;
 
    socket.on("connect", () => {
      console.log("✅ Socket connected, ID:", socket.id);
      setIsConnected(true);
     
      // Join room with userId
      socket.emit("join", currentUserId);
      console.log("👋 Joined room with userId:", currentUserId);
    });
 
    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      setIsConnected(false);
    });
 
    // Listen for incoming messages
    socket.on("receiveMessage", (msg: ChatMessage) => {
      console.log("📨 Received message via Socket:", msg);
      setMessages((prev) => {
        const exists = prev.some(m => m._id && m._id === msg._id);
        if (exists) {
          console.log("⚠️ Duplicate message ignored");
          return prev;
        }
        return [...prev, msg];
      });
    });
 
    socket.on("error", (error: any) => {
      console.error("❌ Socket error:", error);
    });
 
    return () => {
      console.log("🔌 Disconnecting socket...");
      socket.disconnect();
    };
  }, [currentUserId, apiUrl, isOpen, useRealtime]);
 
  // Fetch existing messages
  useEffect(() => {
    if (!isOpen || !useRealtime) return;
 
    const fetchMessages = async () => {
      try {
        console.log("📥 Fetching messages for bookingId:", bookingId);
        const res = await fetch(`${apiUrl}/getMessages/${bookingId}`);
       
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
       
        const data = await res.json();
        console.log("📦 Fetched messages response:", data);
       
        if (data.success && Array.isArray(data.messages)) {
          console.log(`✅ Loaded ${data.messages.length} messages`);
          setMessages(data.messages);
        } else if (Array.isArray(data)) {
          console.log(`✅ Loaded ${data.length} messages`);
          setMessages(data);
        } else {
          console.warn("⚠️ No messages or invalid response format");
        }
      } catch (err: any) {
        console.error("❌ Fetch messages error:", err.message);
      }
    };
   
    fetchMessages();
  }, [bookingId, apiUrl, isOpen, useRealtime]);
 
  // Handle file input
  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
      console.log("📸 Selected files:", selectedFiles.map(f => f.name));
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
 
  // Send message
  const handleSendMessage = async () => {
    if (!inputValue.trim() && files.length === 0) {
      console.warn("⚠️ Empty message, not sending");
      return;
    }
 
    if (!currentUserId || !otherUserId || !bookingId) {
      console.error("❌ Missing required IDs:", { currentUserId, otherUserId, bookingId });
      alert("Error: Cannot send message. Missing user or booking information.");
      return;
    }
 
    console.log("📤 ========= SENDING MESSAGE =========");
    console.log("  Message:", inputValue);
    console.log("  From (senderId):", currentUserId);
    console.log("  To (receiverId):", otherUserId);
    console.log("  Booking ID:", bookingId);
    console.log("  Files:", files.length);
    console.log("=====================================");
 
    // Optimistic UI update
    const optimisticMessage: ChatMessage = {
      senderId: currentUserId,
      receiverId: otherUserId,
      message: inputValue,
      files: files.map(f => URL.createObjectURL(f)),
      timestamp: new Date().toISOString(),
      _id: `temp-${Date.now()}`,
      seen: false
    };
 
    setMessages((prev) => [...prev, optimisticMessage]);
    const messageToSend = inputValue;
    const filesToSend = [...files];
    setInputValue("");
    setFiles([]);
 
    if (useRealtime) {
      // Wait for socket connection
      const waitForConnection = () => {
        return new Promise<void>((resolve) => {
          if (socketRef.current?.connected) {
            resolve();
          } else {
            const checkInterval = setInterval(() => {
              if (socketRef.current?.connected) {
                clearInterval(checkInterval);
                resolve();
              }
            }, 100);
           
            setTimeout(() => {
              clearInterval(checkInterval);
              resolve();
            }, 5000);
          }
        });
      };
 
      await waitForConnection();
 
      // Send via Socket.IO
      if (socketRef.current?.connected) {
        socketRef.current.emit("sendMessage", {
          senderId: currentUserId,
          receiverId: otherUserId,
          message: messageToSend,
          bookingId,
        });
        console.log("🔌 Sent via Socket.IO");
      }
 
      // Persist via REST API (your actual endpoint)
      try {
        const formData = new FormData();
        formData.append("bookingId", bookingId);
        formData.append("senderId", currentUserId);
        formData.append("receiverId", otherUserId);
        formData.append("message", messageToSend);
 
        filesToSend.forEach((file) => {
          formData.append("files", file);
        });
 
        console.log("📦 Sending to /sendMessage endpoint");
 
        const res = await fetch(`${apiUrl}/sendMessage`, {
          method: "POST",
          body: formData,
        });
       
        const data = await res.json();
        console.log("✅ API Response:", data);
       
        if (data.success) {
          console.log("✅ Message saved to database");
          if (data.message) {
            // Replace optimistic message with real one from server
            setMessages((prev) =>
              prev.map(m => m._id === optimisticMessage._id ? data.message : m)
            );
          }
        } else {
          throw new Error(data.message || "Failed to send message");
        }
      } catch (err: any) {
        console.error("❌ API send message error:", err);
        setMessages((prev) => prev.filter(m => m._id !== optimisticMessage._id));
        alert(`Failed to send message: ${err.message}`);
      }
    }
  };
 
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
 
  const formatTime = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return "";
    }
  };
 
  // Helper to extract senderId from message (handles both populated and non-populated)
  const getSenderId = (msg: ChatMessage): string | null => {
    if (!msg.senderId) {
      return null;
    }
    if (typeof msg.senderId === 'string') {
      return msg.senderId;
    }
    return msg.senderId._id;
  };
 
  // ✅ FIXED: Determine message side based on PAGE ROLE and sender
  const isMyMessage = (msg: ChatMessage): boolean => {
    const msgSenderId = getSenderId(msg);
   
    // If senderId is null, treat as received message (left side)
    if (!msgSenderId) {
      return false;
    }
   
    if (pageRole === "ownerView") {
      // On owner view page: owner messages on RIGHT, customer on LEFT
      return msgSenderId === ownerId;
    } else {
      // On customer view page: customer messages on RIGHT, owner on LEFT
      return msgSenderId === customerId;
    }
  };
 
  if (!isOpen) return null;
 
  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />
 
      <div
        className={`fixed right-6 bottom-6 bg-white rounded-2xl shadow-2xl z-50 flex flex-col transition-all duration-300 ${
          isMinimized ? 'h-16' : 'h-[600px]'
        }`}
        style={{ width: '400px' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white rounded-t-2xl">
          <img
            src={defaultOtherAvatar}
            alt={otherUserName}
            className="w-10 h-10 rounded-full ring-2 ring-blue-100"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{otherUserName}</h3>
            <p className="text-xs flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${
                useRealtime
                  ? (isConnected ? 'bg-green-500' : 'bg-gray-400')
                  : 'bg-blue-500'
              }`}></span>
              <span className={
                useRealtime
                  ? (isConnected ? 'text-green-600' : 'text-gray-500')
                  : 'text-blue-600'
              }>
                {useRealtime
                  ? (isConnected ? 'Online' : 'Connecting...')
                  : 'Chat Mode'
                }
              </span>
            </p>
          </div>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Minimize2 className="w-4 h-4 text-gray-600" />
          </button>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
 
        {!isMinimized && (
          <>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  No messages yet. Start the conversation!
                </div>
              ) : (
                messages.map((msg, idx) => {
                  const isMine = isMyMessage(msg);
                 
                  return (
                    <div
                      key={msg._id || idx}
                      className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-end gap-2 max-w-[75%] ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>
                        <img
                          src={isMine ? defaultMyAvatar : defaultOtherAvatar}
                          alt={isMine ? "You" : otherUserName}
                          className="w-7 h-7 rounded-full flex-shrink-0 self-end"
                        />
                       
                        <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
                          {!isMine && (
                            <p className="text-xs text-gray-600 mb-1 px-2">
                              {otherUserName}
                            </p>
                          )}
                         
                          <div
                            className={`rounded-2xl px-4 py-2 shadow-sm ${
                              isMine
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm'
                                : 'bg-white text-gray-900 rounded-bl-sm border border-gray-200'
                            }`}
                          >
                            {msg.message && (
                              <p className="text-sm break-words whitespace-pre-wrap">
                                {msg.message}
                              </p>
                            )}
                           
                            {msg.files && msg.files.length > 0 && msg.files.map((file, i) => (
                              <img
                                key={i}
                                src={file}
                                alt="attachment"
                                className={`max-w-full h-auto rounded-lg max-h-64 cursor-pointer ${msg.message ? 'mt-2' : ''}`}
                                onClick={() => window.open(file, '_blank')}
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            ))}
                          </div>
                         
                          <p className="text-xs text-gray-400 mt-1 px-2">
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>
 
            {/* Input Area */}
            <div className="border-t border-gray-200 p-4 bg-white rounded-b-2xl">
              {files.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {files.map((file, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${idx + 1}`}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        onClick={() => setFiles(prev => prev.filter((_, i) => i !== idx))}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
 
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
               
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all shadow-sm hover:shadow-md flex-shrink-0"
                >
                  <Image className="w-5 h-5" />
                </button>
               
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Write your message..."
                  className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
               
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() && files.length === 0}
                  className="p-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex-shrink-0"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
 
export default PopupChat;