// import React, { useState, useRef } from 'react';
// import { Send, X, Minimize2, Image } from 'lucide-react';
 
// interface Message {
//   id: number;
//   text: string;
//   sender: 'you' | 'other';
//   time: string;
//   image?: string;
// }
 
// interface PopupChatProps {
  // isOpen: boolean;
  // onClose: () => void;
  // ownerName?: string;
  // ownerAvatar?: string;
// }
// const PopupChat: React.FC<PopupChatProps> = ({
//   isOpen,
//   onClose,
//   ownerName = "Manoj Kumar",
//   ownerAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Manoj"
// }) => {
//   // State for messages with initial conversation
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: 1,
//       text: 'Need Car for Rent!',
//       sender: 'you',
//       time: '09:25 AM'
//     },
//     {
//       id: 2,
//       text: 'Yes! Rent Was 500 per Day',
//       sender: 'other',
//       time: '09:25 AM'
//     }
//   ]);
 
//   // Other state variables
  // const [inputValue, setInputValue] = useState('');
  // const [isMinimized, setIsMinimized] = useState(false);
  // const fileInputRef = useRef<HTMLInputElement>(null);
//   // Handler for sending text messages
//   const handleSend = () => {
//     if (inputValue.trim()) {
//       const newMessage: Message = {
//         id: messages.length + 1,
//         text: inputValue,
//         sender: 'you',
//         time: new Date().toLocaleTimeString('en-US', {
//           hour: '2-digit',
//           minute: '2-digit'
//         })
//       };
//       setMessages([...messages, newMessage]);
//       setInputValue('');
//     }
//   };
 
//   // Handler for selecting and sending images
//   const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file && file.type.startsWith('image/')) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const imageUrl = event.target?.result as string;
//         const newMessage: Message = {
//           id: messages.length + 1,
//           text: '',
//           sender: 'you',
//           time: new Date().toLocaleTimeString('en-US', {
//             hour: '2-digit',
//             minute: '2-digit'
//           }),
//           image: imageUrl
//         };
//         setMessages([...messages, newMessage]);
//       };
//       reader.readAsDataURL(file);
//     }
//     // Reset the file input to allow selecting the same file again
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };
 
//   // Handler for Enter key press
//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       handleSend();
//     }
//   };
 
//   // Don't render if chat is closed
//   if (!isOpen) return null;
//   return (
//     <>
//       {/* Backdrop - semi-transparent overlay */}
//       <div
//         className="fixed inset-0 bg-black/20 z-40"
//         onClick={onClose}
//       />
 
//       {/* Chat Popup Container */}
//       <div
//         className={`fixed right-6 bottom-6 bg-white rounded-2xl shadow-2xl z-50 flex flex-col transition-all duration-300 ${
//           isMinimized ? 'h-16' : 'h-[600px]'
//         }`}
//         style={{ width: '400px' }}
//       >
//         {/* Header */}
//         <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white rounded-t-2xl">
//           <img
//             src={ownerAvatar}
//             alt={ownerName}
//             className="w-10 h-10 rounded-full ring-2 ring-blue-100"
//           />
//           <div className="flex-1">
//             <h3 className="font-semibold text-gray-900">{ownerName}</h3>
//             <p className="text-xs text-green-600 flex items-center gap-1">
//               <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//               Online
//             </p>
//           </div>
//           <button
//             onClick={() => setIsMinimized(!isMinimized)}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <Minimize2 className="w-4 h-4 text-gray-600" />
//           </button>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <X className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>
//         {/* Chat Content - Hidden when minimized */}
//         {!isMinimized && (
//           <>
//             {/* Messages Area */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
//               {messages.map((message) => (
//                 <div
//                   key={message.id}
//                   className={`flex ${
//                     message.sender === 'you' ? 'justify-end' : 'justify-start'
//                   }`}
//                 >
//                   <div className="flex items-end gap-2 max-w-[80%]">
//                     {message.sender === 'other' && (
//                       <img
//                         src={ownerAvatar}
//                         alt={ownerName}
//                         className="w-7 h-7 rounded-full flex-shrink-0"
//                       />
//                     )}
//                     <div>
//                       {message.sender === 'other' && (
//                         <p className="text-xs text-gray-600 mb-1 ml-2">
//                           {ownerName}
//                         </p>
//                       )}
//                       <div
//                         className={`rounded-2xl px-4 py-2 shadow-sm ${
//                           message.sender === 'you'
//                             ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm'
//                             : 'bg-white text-gray-900 rounded-bl-sm border border-gray-200'
//                         }`}
//                       >
//                         {message.image ? (
//                           <img
//                             src={message.image}
//                             alt="Sent image"
//                             className="max-w-full h-auto rounded-lg max-h-64 cursor-pointer"
//                             onClick={() => window.open(message.image, '_blank')}
//                           />
//                         ) : (
//                           <p className="text-sm">{message.text}</p>
//                         )}
//                       </div>
//                       <p className="text-xs text-gray-400 mt-1 ml-2">
//                         {message.time}
//                       </p>
//                     </div>
//                     {message.sender === 'you' && (
//                       <img
//                         src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
//                         alt="You"
//                         className="w-7 h-7 rounded-full flex-shrink-0"
//                       />
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//             {/* Input Area */}
//             <div className="border-t border-gray-200 p-4 bg-white rounded-b-2xl">
//               <div className="flex items-center gap-2">
//                 {/* Hidden file input for image selection */}
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleImageSelect}
//                   accept="image/*"
//                   className="hidden"
//                 />
               
//                 {/* Image upload button */}
//                 <button
//                   onClick={() => fileInputRef.current?.click()}
//                   className="p-2.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all shadow-sm hover:shadow-md"
//                   title="Send image"
//                 >
//                   <Image className="w-5 h-5" />
//                 </button>
               
//                 {/* Text input */}
//                 <input
//                   type="text"
//                   value={inputValue}
//                   onChange={(e) => setInputValue(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Write your message..."
//                   className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
//                 />
               
//                 {/* Send button */}
//                 <button
//                   onClick={handleSend}
//                   disabled={!inputValue.trim()}
//                   className="p-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
//                 >
//                   <Send className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };
// export default PopupChat;


// import React, { useEffect, useRef, useState, ChangeEvent } from "react";
// import io, { Socket } from "socket.io-client";
// import { Send, X, Minimize2, Image } from 'lucide-react';

// interface ChatMessage {
//   senderId: string | { _id: string; name: string; profilePic?: string } | null;
//   receiverId: string | { _id: string; name: string; profilePic?: string } | null;
//   message: string;
//   files?: string[];
//   timestamp: string;
//   seen?: boolean;
//   _id?: string;
//   senderType?: string;
//   receiverType?: string;
// }

// export interface PopupChatProps {
//   isOpen: boolean;
//   onClose: () => void;
//   ownerName?: string;
//   ownerAvatar?: string;
//   senderId: string;
//   receiverId: string;
//   bookingId: string;
//   senderType: string;
//   receiverType: string;
//   apiUrl: string;
//   vehicleId?: string;
// }

// const PopupChat: React.FC<PopupChatProps> = ({ 
//   isOpen,
//   onClose,
//   ownerName = "Vehicle Owner",
//   ownerAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Owner",
//   senderId,
//   receiverId, 
//   bookingId, 
//   senderType,
//   receiverType,
//   apiUrl,
//   vehicleId
// }) => {
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [inputValue, setInputValue] = useState('');
//   const [files, setFiles] = useState<File[]>([]);
//   const socketRef = useRef<Socket | null>(null);
//   const [isMinimized, setIsMinimized] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [isSending, setIsSending] = useState(false);

//   // Helper: Extract ID from sender/receiver (handles both string and object)
//   const extractId = (value: string | { _id: string } | null): string => {
//     if (!value) return '';
//     if (typeof value === 'string') return value;
//     if (typeof value === 'object' && value._id) return value._id;
//     return '';
//   };

//   // Debug on mount
//   useEffect(() => {
//     console.log("🔍 ========= POPUP CHAT INITIALIZED =========");
//     console.log("👤 Sender ID:", senderId);
//     console.log("📦 Receiver ID:", receiverId);
//     console.log("💬 Booking ID:", bookingId);
//     console.log("🏷️ Sender Type:", senderType);
//     console.log("🏷️ Receiver Type:", receiverType);
//     console.log("🚗 Vehicle ID:", vehicleId);
//     console.log("🌐 API URL:", apiUrl);
//     console.log("===========================================");

//     if (!senderId || senderId === 'null' || senderId === 'undefined') {
//       console.error("❌ CRITICAL: senderId is invalid:", senderId);
//     }
//     if (!receiverId || receiverId === 'null' || receiverId === 'undefined') {
//       console.error("❌ CRITICAL: receiverId is invalid:", receiverId);
//     }
//     if (!bookingId || bookingId === 'null' || bookingId === 'undefined') {
//       console.error("❌ CRITICAL: bookingId is invalid:", bookingId);
//     }
//   }, [senderId, receiverId, bookingId, senderType, receiverType, vehicleId, apiUrl]);

//   // Auto-scroll to bottom
//   const scrollToBottom = () => {
//     setTimeout(() => {
//       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 100);
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Initialize Socket.IO
//   useEffect(() => {
//     if (!isOpen) return;

//     console.log("🔌 Connecting to Socket.IO...", apiUrl);
//     const socket = io(apiUrl, {
//       transports: ['websocket', 'polling'],
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//     });
    
//     socketRef.current = socket;

//     socket.on("connect", () => {
//       console.log("✅ Socket connected, ID:", socket.id);
//       setIsConnected(true);
//       socket.emit("join", senderId);
//       console.log("👋 Joined room with senderId:", senderId);
//     });

//     socket.on("disconnect", () => {
//       console.log("❌ Socket disconnected");
//       setIsConnected(false);
//     });

//     socket.on("receiveMessage", (msg: ChatMessage) => {
//       console.log("📨 Received message via Socket:", msg);
//       setMessages((prev) => {
//         const exists = prev.some(m => m._id && m._id === msg._id);
//         if (exists) {
//           console.log("⚠️ Duplicate message ignored");
//           return prev;
//         }
//         return [...prev, msg];
//       });
//     });

//     socket.on("error", (error: any) => {
//       console.error("❌ Socket error:", error);
//     });

//     return () => {
//       console.log("🔌 Disconnecting socket...");
//       socket.disconnect();
//     };
//   }, [senderId, apiUrl, isOpen]);

//   // Fetch existing messages
//   useEffect(() => {
//     if (!isOpen) return;
//     if (!bookingId || bookingId === 'null' || bookingId === 'undefined') {
//       console.error("❌ Cannot fetch messages: Invalid bookingId");
//       return;
//     }

//     const fetchMessages = async () => {
//       try {
//         const apiEndpoint = `${apiUrl}/getMessages/${bookingId}`;
//         console.log("📥 Fetching messages from:", apiEndpoint);
        
//         const res = await fetch(apiEndpoint, {
//           method: "GET",
//           headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//           }
//         });
        
//         console.log("📡 Response Status:", res.status);
        
//         if (!res.ok) {
//           const errorText = await res.text();
//           console.error("❌ API Error:", errorText);
          
//           if (res.status === 404) {
//             console.log("ℹ️ No messages found for this booking");
//             setMessages([]);
//             return;
//           }
          
//           throw new Error(`HTTP ${res.status}: ${errorText}`);
//         }
        
//         const data = await res.json();
//         console.log("📦 Fetched data:", data);
        
//         if (data.success && Array.isArray(data.messages)) {
//           const sortedMessages = data.messages.sort((a: ChatMessage, b: ChatMessage) => 
//             new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
//           );
          
//           console.log(`✅ Successfully loaded ${sortedMessages.length} messages`);
//           setMessages(sortedMessages);
//           setTimeout(() => scrollToBottom(), 200);
//         } else {
//           console.log("ℹ️ No messages in response");
//           setMessages([]);
//         }
//       } catch (err: any) {
//         console.error("❌ Fetch messages error:", err.message);
//         setMessages([]);
//       }
//     };
    
//     fetchMessages();
    
//     // Auto-refresh messages every 30 seconds
//     const intervalId = setInterval(() => {
//       console.log("🔄 Auto-refreshing messages...");
//       fetchMessages();
//     }, 30000);
    
//     return () => clearInterval(intervalId);
    
//   }, [bookingId, apiUrl, isOpen]);

//   // Handle file input
//   const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const selectedFiles = Array.from(e.target.files);
//       setFiles(selectedFiles);
//       console.log("📸 Selected files:", selectedFiles.map(f => f.name));
//     }
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   // Send message
//   const handleSendMessage = async () => {
//     if (!inputValue.trim() && files.length === 0) {
//       console.warn("⚠️ Empty message, not sending");
//       return;
//     }

//     if (!senderId || senderId === 'null' || senderId === 'undefined') {
//       alert("Error: Cannot send message. Sender ID is missing.");
//       console.error("❌ Cannot send: Invalid senderId:", senderId);
//       return;
//     }
//     if (!receiverId || receiverId === 'null' || receiverId === 'undefined') {
//       alert("Error: Cannot send message. Receiver ID is missing.");
//       console.error("❌ Cannot send: Invalid receiverId:", receiverId);
//       return;
//     }

//     if (isSending) {
//       console.warn("⚠️ Already sending a message");
//       return;
//     }

//     setIsSending(true);

//     console.log("📤 ========= SENDING MESSAGE =========");
//     console.log("  Message:", inputValue);
//     console.log("  From (senderId):", senderId);
//     console.log("  To (receiverId):", receiverId);
//     console.log("  Booking ID:", bookingId);
//     console.log("  Files:", files.length);
//     console.log("=====================================");

//     // Optimistic UI update
//     const optimisticMessage: ChatMessage = {
//       senderId,
//       receiverId,
//       message: inputValue,
//       files: files.map(f => URL.createObjectURL(f)),
//       timestamp: new Date().toISOString(),
//       _id: `temp-${Date.now()}`,
//       seen: false,
//       senderType,
//       receiverType
//     };

//     setMessages((prev) => [...prev, optimisticMessage]);
//     const messageToSend = inputValue;
//     const filesToSend = [...files];
//     setInputValue("");
//     setFiles([]);

//     try {
//       // Method 1: Try FormData (works for both text and files)
//       const formData = new FormData();
//       formData.append("senderId", senderId);
//       formData.append("receiverId", receiverId);
//       formData.append("bookingId", bookingId);
//       formData.append("message", messageToSend);
//       formData.append("senderType", senderType);
//       formData.append("receiverType", receiverType);

//       filesToSend.forEach((file) => {
//         formData.append("files", file);
//       });

//       console.log("📤 Sending to API (FormData):", `${apiUrl}/sendMessage`);
      
//       let res = await fetch(`${apiUrl}/sendMessage`, {
//         method: "POST",
//         body: formData,
//       });
      
//       console.log("📡 Response status:", res.status);
      
//       let data;
      
//       // If FormData fails and no files, try JSON
//       if (!res.ok && filesToSend.length === 0) {
//         console.log("⚠️ FormData failed, trying JSON...");
        
//         res = await fetch(`${apiUrl}/sendMessage`, {
//           method: "POST",
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             senderId,
//             receiverId,
//             bookingId,
//             message: messageToSend,
//             senderType,
//             receiverType,
//             files: []
//           }),
//         });
        
//         console.log("📡 JSON Response status:", res.status);
//       }
      
//       if (!res.ok) {
//         const errorText = await res.text();
//         console.error("❌ API Error:", errorText);
//         throw new Error(`HTTP ${res.status}: ${errorText}`);
//       }
      
//       data = await res.json();
//       console.log("✅ API Response:", data);
      
//       if (data.success) {
//         console.log("✅ Message saved successfully");
        
//         // Send via Socket.IO for real-time delivery
//         if (socketRef.current?.connected) {
//           const socketPayload = { 
//             senderId, 
//             receiverId, 
//             message: messageToSend, 
//             bookingId,
//             senderType,
//             receiverType
//           };
//           console.log("🔌 Sending via Socket.IO:", socketPayload);
//           socketRef.current.emit("sendMessage", socketPayload);
//         }
        
//         // Replace optimistic message with real one
//         if (data.message) {
//           setMessages((prev) => 
//             prev.map(m => m._id === optimisticMessage._id ? data.message : m)
//           );
//         }
//       } else {
//         throw new Error(data.message || "Failed to send message");
//       }
//     } catch (err: any) {
//       console.error("❌ Send message error:", err.message);
      
//       // Remove optimistic message on error
//       setMessages((prev) => prev.filter(m => m._id !== optimisticMessage._id));
      
//       alert(
//         `Failed to send message: ${err.message || 'Unknown error'}\n\n` +
//         `Debug Info:\n` +
//         `• Sender: ${senderId}\n` +
//         `• Receiver: ${receiverId}\n` +
//         `• Booking: ${bookingId}\n` +
//         `• API: ${apiUrl}/sendMessage\n\n` +
//         `Please check:\n` +
//         `1. Internet connection\n` +
//         `2. API server is running\n` +
//         `3. Backend logs for errors`
//       );
//     } finally {
//       setIsSending(false);
//     }
//   };

//   // Handle Enter key
//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   // Format timestamp
//   const formatTime = (timestamp: string) => {
//     try {
//       return new Date(timestamp).toLocaleTimeString('en-US', {
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return "";
//     }
//   };

//   // Determine if message is from current user
//   const isMyMessage = (msg: ChatMessage): boolean => {
//     if (msg._id?.startsWith('temp-')) {
//       return true;
//     }
    
//     const messageSenderId = extractId(msg.senderId);
    
//     if (!messageSenderId || messageSenderId === 'null') {
//       return msg.senderType === senderType;
//     }
    
//     return messageSenderId === senderId;
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

//       <div
//         className={`fixed right-6 bottom-6 bg-white rounded-2xl shadow-2xl z-50 flex flex-col transition-all duration-300 ${
//           isMinimized ? 'h-16' : 'h-[600px]'
//         }`}
//         style={{ width: '400px' }}
//       >
//         {/* Header */}
//         <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white rounded-t-2xl">
//           <img
//             src={ownerAvatar}
//             alt={ownerName}
//             className="w-10 h-10 rounded-full ring-2 ring-blue-100"
//           />
//           <div className="flex-1">
//             <h3 className="font-semibold text-gray-900">{ownerName}</h3>
//             <p className="text-xs flex items-center gap-1">
//               <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></span>
//               <span className={isConnected ? 'text-green-600' : 'text-gray-500'}>
//                 {isConnected ? 'Online' : 'Connecting...'}
//               </span>
//             </p>
//           </div>
//           <button
//             onClick={() => setIsMinimized(!isMinimized)}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <Minimize2 className="w-4 h-4 text-gray-600" />
//           </button>
//           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//             <X className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>

//         {!isMinimized && (
//           <>
//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
//               {messages.length === 0 ? (
//                 <div className="flex items-center justify-center h-full text-gray-400 text-sm">
//                   No messages yet. Start the conversation!
//                 </div>
//               ) : (
//                 messages.map((msg, idx) => {
//                   const isMine = isMyMessage(msg);
                  
//                   return (
//                     <div
//                       key={msg._id || idx}
//                       className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
//                     >
//                       <div className={`flex items-end gap-2 max-w-[75%] ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>
//                         <img
//                           src={isMine 
//                             ? "https://api.dicebear.com/7.x/avataaars/svg?seed=You" 
//                             : ownerAvatar
//                           }
//                           alt={isMine ? "You" : ownerName}
//                           className="w-7 h-7 rounded-full flex-shrink-0 self-end"
//                         />
                        
//                         <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
//                           {!isMine && (
//                             <p className="text-xs text-gray-600 mb-1 px-2">{ownerName}</p>
//                           )}
                          
//                           <div
//                             className={`rounded-2xl px-4 py-2 shadow-sm ${
//                               isMine
//                                 ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm'
//                                 : 'bg-white text-gray-900 rounded-bl-sm border border-gray-200'
//                             }`}
//                           >
//                             {msg.message && (
//                               <p className="text-sm break-words whitespace-pre-wrap">{msg.message}</p>
//                             )}
                            
//                             {msg.files && msg.files.length > 0 && msg.files.map((file, i) => (
//                               <img
//                                 key={i}
//                                 src={file}
//                                 alt="attachment"
//                                 className={`max-w-full h-auto rounded-lg max-h-64 cursor-pointer ${msg.message ? 'mt-2' : ''}`}
//                                 onClick={() => window.open(file, '_blank')}
//                                 onError={(e) => {
//                                   e.currentTarget.style.display = 'none';
//                                 }}
//                               />
//                             ))}
//                           </div>
                          
//                           <p className="text-xs text-gray-400 mt-1 px-2">
//                             {formatTime(msg.timestamp)}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Input */}
//             <div className="border-t border-gray-200 p-4 bg-white rounded-b-2xl">
//               {files.length > 0 && (
//                 <div className="mb-2 flex flex-wrap gap-2">
//                   {files.map((file, idx) => (
//                     <div key={idx} className="relative">
//                       <img
//                         src={URL.createObjectURL(file)}
//                         alt={`Preview ${idx + 1}`}
//                         className="w-16 h-16 object-cover rounded-lg border border-gray-300"
//                       />
//                       <button
//                         onClick={() => setFiles(prev => prev.filter((_, i) => i !== idx))}
//                         className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <div className="flex items-center gap-2">
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleImageSelect}
//                   accept="image/*"
//                   multiple
//                   className="hidden"
//                 />
               
//                 <button
//                   onClick={() => fileInputRef.current?.click()}
//                   disabled={isSending}
//                   className="p-2.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all shadow-sm hover:shadow-md flex-shrink-0 disabled:opacity-50"
//                 >
//                   <Image className="w-5 h-5" />
//                 </button>
               
//                 <input
//                   type="text"
//                   value={inputValue}
//                   onChange={(e) => setInputValue(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Write your message..."
//                   disabled={isSending}
//                   className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all disabled:opacity-50"
//                 />
               
//                 <button
//                   onClick={handleSendMessage}
//                   disabled={(!inputValue.trim() && files.length === 0) || isSending}
//                   className="p-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex-shrink-0"
//                 >
//                   <Send className={`w-5 h-5 ${isSending ? 'animate-pulse' : ''}`} />
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default PopupChat;

// import React, { useEffect, useRef, useState, ChangeEvent } from "react";
// import io, { Socket } from "socket.io-client";
// import { Send, X, Minimize2, Image } from 'lucide-react';

// interface ChatMessage {
//   senderId: string | null;
//   receiverId: string | null;
//   message: string;
//   files?: string[];
//   timestamp: string;
//   seen?: boolean;
//   _id?: string;
// }

// interface PopupChatProps {
//   isOpen: boolean;
//   onClose: () => void;
//   ownerName?: string;
//   ownerAvatar?: string;
//   userId: string;           // ✅ Current user (sender)
//   receiverId: string;       // ✅ BookingId (receiver)
//   bookingId: string;        // ✅ BookingId (same as receiverId)
//   apiUrl: string;
//   vehicleId?: string;
// }

// const PopupChat: React.FC<PopupChatProps> = ({ 
//   isOpen,
//   onClose,
//   ownerName = "Vehicle Owner",
//   ownerAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Owner",
//   userId, 
//   receiverId, 
//   bookingId, 
//   apiUrl,
//   vehicleId
// }) => {
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [inputValue, setInputValue] = useState('');
//   const [files, setFiles] = useState<File[]>([]);
//   const socketRef = useRef<Socket | null>(null);
//   const [isMinimized, setIsMinimized] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const [isConnected, setIsConnected] = useState(false);

//   // Debug on mount
//   useEffect(() => {
//     console.log("🔍 ========= POPUP CHAT INITIALIZED =========");
//     console.log("👤 User ID (senderId):", userId);
//     console.log("📦 Receiver ID:", receiverId);
//     console.log("💬 Booking ID:", bookingId);
//     console.log("🚗 Vehicle ID:", vehicleId);
//     console.log("🌐 API URL:", apiUrl);
//     console.log("===========================================");
//   }, [userId, receiverId, bookingId, vehicleId, apiUrl]);

//   // Auto-scroll to bottom when new messages arrive
//   const scrollToBottom = () => {
//     setTimeout(() => {
//       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 100);
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Initialize Socket.IO
//   useEffect(() => {
//     if (!isOpen) return;

//     console.log("🔌 Connecting to Socket.IO...", apiUrl);
//     const socket = io(apiUrl, {
//       transports: ['websocket', 'polling'],
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//     });
    
//     socketRef.current = socket;

//     socket.on("connect", () => {
//       console.log("✅ Socket connected, ID:", socket.id);
//       setIsConnected(true);
//       socket.emit("join", userId);
//       console.log("👋 Joined room with userId:", userId);
//     });

//     socket.on("disconnect", () => {
//       console.log("❌ Socket disconnected");
//       setIsConnected(false);
//     });

//     socket.on("receiveMessage", (msg: ChatMessage) => {
//       console.log("📨 Received message via Socket:", msg);
//       setMessages((prev) => {
//         const exists = prev.some(m => m._id && m._id === msg._id);
//         if (exists) {
//           console.log("⚠️ Duplicate message ignored");
//           return prev;
//         }
//         return [...prev, msg];
//       });
//     });

//     socket.on("error", (error: any) => {
//       console.error("❌ Socket error:", error);
//     });

//     return () => {
//       console.log("🔌 Disconnecting socket...");
//       socket.disconnect();
//     };
//   }, [userId, apiUrl, isOpen]);

//   // Fetch existing messages
//   useEffect(() => {
//     if (!isOpen) return;

//     const fetchMessages = async () => {
//       try {
//         console.log("📥 Fetching messages for bookingId:", bookingId);
//         const res = await fetch(`${apiUrl}/getMessages/${bookingId}`);
        
//         if (!res.ok) {
//           throw new Error(`HTTP ${res.status}: ${res.statusText}`);
//         }
        
//         const data = await res.json();
//         console.log("📦 Fetched messages response:", data);
        
//         if (data.success && Array.isArray(data.messages)) {
//           console.log(`✅ Loaded ${data.messages.length} messages`);
//           setMessages(data.messages);
//         } else {
//           console.warn("⚠️ No messages or invalid response format");
//         }
//       } catch (err: any) {
//         console.error("❌ Fetch messages error:", err.message);
//       }
//     };
    
//     fetchMessages();
//   }, [bookingId, apiUrl, isOpen]);

//   // Handle file input for images
//   const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const selectedFiles = Array.from(e.target.files);
//       setFiles(selectedFiles);
//       console.log("📸 Selected files:", selectedFiles.map(f => f.name));
//     }
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   // Send message
//   const handleSendMessage = async () => {
//     if (!inputValue.trim() && files.length === 0) {
//       console.warn("⚠️ Empty message, not sending");
//       return;
//     }

//     console.log("📤 ========= SENDING MESSAGE =========");
//     console.log("  Message:", inputValue);
//     console.log("  From (senderId):", userId);
//     console.log("  To (receiverId):", receiverId);
//     console.log("  Booking ID:", bookingId);
//     console.log("  Files:", files.length);
//     console.log("=====================================");

//     // Optimistic UI update - add message immediately
//     const optimisticMessage: ChatMessage = {
//       senderId: userId,
//       receiverId,
//       message: inputValue,
//       files: files.map(f => URL.createObjectURL(f)),
//       timestamp: new Date().toISOString(),
//       _id: `temp-${Date.now()}`,
//       seen: false
//     };

//     setMessages((prev) => [...prev, optimisticMessage]);
//     const messageToSend = inputValue;
//     const filesToSend = [...files];
//     setInputValue("");
//     setFiles([]);

//     // Send via Socket.IO
//     if (socketRef.current?.connected) {
//       socketRef.current.emit("sendMessage", { 
//         senderId: userId, 
//         receiverId, 
//         message: messageToSend, 
//         bookingId,
//       });
//       console.log("🔌 Sent via Socket.IO");
//     } else {
//       console.warn("⚠️ Socket not connected, skipping real-time send");
//     }

//     // Persist via REST API
//     try {
//       // Try FormData approach first
//       const formData = new FormData();
//       formData.append("senderId", userId);
//       formData.append("receiverId", receiverId);
//       formData.append("bookingId", bookingId);
//       formData.append("message", messageToSend);

//       filesToSend.forEach((file) => {
//         formData.append("files", file);
//       });

//       console.log("📦 Sending FormData to API...");
//       console.log("  Endpoint:", `${apiUrl}/sendMessage`);

//       let res = await fetch(`${apiUrl}/sendMessage`, {
//         method: "POST",
//         body: formData,
//       });
      
//       let data = await res.json();
//       console.log("✅ API Response:", data);
      
//       // If FormData didn't work, try JSON approach
//       if (!data.success && (data.message?.includes('senderId') || data.message?.includes('receiverId'))) {
//         console.log("⚠️ FormData failed, trying JSON approach...");
        
//         res = await fetch(`${apiUrl}/sendMessage`, {
//           method: "POST",
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             senderId: userId,
//             receiverId: receiverId,
//             bookingId: bookingId,
//             message: messageToSend,
//             files: []
//           }),
//         });
        
//         data = await res.json();
//         console.log("✅ JSON API Response:", data);
//       }
      
//       if (data.success) {
//         console.log("✅ Message saved to database");
//         // Replace optimistic message with real one from server
//         if (data.message) {
//           setMessages((prev) => 
//             prev.map(m => m._id === optimisticMessage._id ? data.message : m)
//           );
//         }
//       } else {
//         throw new Error(data.message || "Failed to send message");
//       }
//     } catch (err: any) {
//       console.error("❌ API send message error:", err.message);
//       // Remove optimistic message on error
//       setMessages((prev) => prev.filter(m => m._id !== optimisticMessage._id));
//       alert(`Failed to send message: ${err.message || 'Unknown error'}\n\nPlease check:\n• Internet connection\n• API is running\n• User IDs are correct`);
//     }
//   };

//   // Handler for Enter key press
//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   // Format timestamp
//   const formatTime = (timestamp: string) => {
//     try {
//       return new Date(timestamp).toLocaleTimeString('en-US', {
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return "";
//     }
//   };

//   // Determine if message is from current user
//   const isMyMessage = (msg: ChatMessage): boolean => {
//     // If senderId is null, check if it's a temporary message
//     if (msg.senderId === null && msg._id?.startsWith('temp-')) {
//       return true;
//     }
//     // Otherwise check if senderId matches userId
//     return msg.senderId === userId;
//   };

//   // Don't render if chat is closed
//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Backdrop - semi-transparent overlay */}
//       <div
//         className="fixed inset-0 bg-black/20 z-40"
//         onClick={onClose}
//       />

//       {/* Chat Popup Container */}
//       <div
//         className={`fixed right-6 bottom-6 bg-white rounded-2xl shadow-2xl z-50 flex flex-col transition-all duration-300 ${
//           isMinimized ? 'h-16' : 'h-[600px]'
//         }`}
//         style={{ width: '400px' }}
//       >
//         {/* Header */}
//         <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white rounded-t-2xl">
//           <img
//             src={ownerAvatar}
//             alt={ownerName}
//             className="w-10 h-10 rounded-full ring-2 ring-blue-100"
//           />
//           <div className="flex-1">
//             <h3 className="font-semibold text-gray-900">{ownerName}</h3>
//             <p className="text-xs flex items-center gap-1">
//               <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></span>
//               <span className={isConnected ? 'text-green-600' : 'text-gray-500'}>
//                 {isConnected ? 'Online' : 'Connecting...'}
//               </span>
//             </p>
//           </div>
//           <button
//             onClick={() => setIsMinimized(!isMinimized)}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//             title="Minimize"
//           >
//             <Minimize2 className="w-4 h-4 text-gray-600" />
//           </button>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//             title="Close"
//           >
//             <X className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>

//         {/* Chat Content - Hidden when minimized */}
//         {!isMinimized && (
//           <>
//             {/* Messages Area */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
//               {messages.length === 0 ? (
//                 <div className="flex items-center justify-center h-full text-gray-400 text-sm">
//                   No messages yet. Start the conversation!
//                 </div>
//               ) : (
//                 messages.map((msg, idx) => {
//                   const isMine = isMyMessage(msg);
                  
//                   return (
//                     <div
//                       key={msg._id || idx}
//                       className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
//                     >
//                       <div className={`flex items-end gap-2 max-w-[75%] ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>
//                         {/* Avatar */}
//                         <img
//                           src={isMine 
//                             ? "https://api.dicebear.com/7.x/avataaars/svg?seed=You" 
//                             : ownerAvatar
//                           }
//                           alt={isMine ? "You" : ownerName}
//                           className="w-7 h-7 rounded-full flex-shrink-0 self-end"
//                         />
                        
//                         {/* Message Content */}
//                         <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
//                           {/* Sender Name (only for received messages) */}
//                           {!isMine && (
//                             <p className="text-xs text-gray-600 mb-1 px-2">
//                               {ownerName}
//                             </p>
//                           )}
                          
//                           {/* Message Bubble */}
//                           <div
//                             className={`rounded-2xl px-4 py-2 shadow-sm ${
//                               isMine
//                                 ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm'
//                                 : 'bg-white text-gray-900 rounded-bl-sm border border-gray-200'
//                             }`}
//                           >
//                             {/* Text Message */}
//                             {msg.message && (
//                               <p className="text-sm break-words whitespace-pre-wrap">
//                                 {msg.message}
//                               </p>
//                             )}
                            
//                             {/* Image Attachments */}
//                             {msg.files && msg.files.length > 0 && msg.files.map((file, i) => (
//                               <img
//                                 key={i}
//                                 src={file}
//                                 alt="attachment"
//                                 className={`max-w-full h-auto rounded-lg max-h-64 cursor-pointer ${msg.message ? 'mt-2' : ''}`}
//                                 onClick={() => window.open(file, '_blank')}
//                                 onError={(e) => {
//                                   e.currentTarget.style.display = 'none';
//                                 }}
//                               />
//                             ))}
//                           </div>
                          
//                           {/* Timestamp */}
//                           <p className={`text-xs text-gray-400 mt-1 px-2`}>
//                             {formatTime(msg.timestamp)}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Input Area */}
//             <div className="border-t border-gray-200 p-4 bg-white rounded-b-2xl">
//               {/* Selected Files Preview */}
//               {files.length > 0 && (
//                 <div className="mb-2 flex flex-wrap gap-2">
//                   {files.map((file, idx) => (
//                     <div key={idx} className="relative">
//                       <img
//                         src={URL.createObjectURL(file)}
//                         alt={`Preview ${idx + 1}`}
//                         className="w-16 h-16 object-cover rounded-lg border border-gray-300"
//                       />
//                       <button
//                         onClick={() => setFiles(prev => prev.filter((_, i) => i !== idx))}
//                         className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <div className="flex items-center gap-2">
//                 {/* Hidden file input for image selection */}
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleImageSelect}
//                   accept="image/*"
//                   multiple
//                   className="hidden"
//                 />
               
//                 {/* Image upload button */}
//                 <button
//                   onClick={() => fileInputRef.current?.click()}
//                   className="p-2.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all shadow-sm hover:shadow-md flex-shrink-0"
//                   title="Send image"
//                 >
//                   <Image className="w-5 h-5" />
//                 </button>
               
//                 {/* Text input */}
//                 <input
//                   type="text"
//                   value={inputValue}
//                   onChange={(e) => setInputValue(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Write your message..."
//                   className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
//                 />
               
//                 {/* Send button */}
//                 <button
//                   onClick={handleSendMessage}
//                   disabled={!inputValue.trim() && files.length === 0}
//                   className="p-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex-shrink-0"
//                 >
//                   <Send className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default PopupChat;













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
  senderId: string | UserInfo;
  receiverId: string | UserInfo | null;
  message: string;
  files?: string[];
  seen?: boolean;
  timestamp: string;
}

interface PopupChatProps {
  isOpen: boolean;
  onClose: () => void;
  pageRole: "ownerView" | "customerView";
  currentUserId: string;
  currentUserName?: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar?: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  bookingId: string;
  vehicleId?: string;
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
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

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
      socket.emit("join", currentUserId);
      console.log("👋 Joined room with userId:", currentUserId);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      setIsConnected(false);
    });

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

  // ✅ UNIFIED: Fetch messages based on role (ONE useEffect only)
  useEffect(() => {
    if (!isOpen || !useRealtime) return;

    const fetchMessages = async () => {
      setIsLoadingMessages(true);
      try {
        console.log("📥 ========= FETCHING MESSAGES =========");
        console.log("  Page Role:", pageRole);
        console.log("  Booking ID:", bookingId);
        console.log("  Vehicle ID:", vehicleId);
        console.log("  Current User ID:", currentUserId);
        console.log("  Owner ID:", ownerId);
        console.log("  Customer ID:", customerId);
        console.log("======================================");
        
        // ✅ CRITICAL: Choose endpoint based on pageRole
        let endpoint: string;
        let idToUse: string;
        
        if (pageRole === "ownerView") {
          // Owner fetches by booking ID
          if (!bookingId) {
            console.warn("⚠️ Owner view requires booking ID");
            setIsLoadingMessages(false);
            return;
          }
          idToUse = bookingId;
          endpoint = `${apiUrl}/getMessages/${bookingId}`;
          console.log("🏢 OWNER VIEW: Fetching messages by BOOKING ID");
        } else {
          // Customer fetches by vehicle ID
          if (!vehicleId) {
            console.warn("⚠️ Customer view requires vehicle ID");
            setIsLoadingMessages(false);
            return;
          }
          idToUse = vehicleId;
          endpoint = `${apiUrl}/getMessagesByVehicle/${vehicleId}`;
          console.log("👥 CUSTOMER VIEW: Fetching messages by VEHICLE ID");
        }
        
        console.log("📡 Fetching from:", endpoint);

        const res = await fetch(endpoint);
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        
        const data = await res.json();
        console.log("📦 Raw API Response:", data);
        
        let fetchedMessages: ChatMessage[] = [];
        
        // Extract messages from various response formats
        if (data.success && Array.isArray(data.messages)) {
          fetchedMessages = data.messages;
        } else if (Array.isArray(data)) {
          fetchedMessages = data;
        } else if (data.data && Array.isArray(data.data)) {
          fetchedMessages = data.data;
        } else if (data.messages && Array.isArray(data.messages)) {
          fetchedMessages = data.messages;
        } else {
          console.warn("⚠️ No messages found in response");
          fetchedMessages = [];
        }
        
        console.log(`📊 Extracted ${fetchedMessages.length} messages from API`);
        
        // ✅ CRITICAL: Filter messages where current user is sender OR receiver
        const myMessages = fetchedMessages.filter(msg => {
          const senderId = typeof msg.senderId === 'string' ? msg.senderId : msg.senderId?._id;
          const receiverId = typeof msg.receiverId === 'string' ? msg.receiverId : msg.receiverId?._id;
          
          // Include if I'm sender OR receiver
          return senderId === currentUserId || receiverId === currentUserId;
        });
        
        console.log(`✅ Filtered to ${myMessages.length} messages (where I'm sender or receiver)`);
        
        // ✅ CRITICAL: Sort by timestamp (oldest first) - prevents order flipping
        if (myMessages.length > 0) {
          const sortedMessages = myMessages.sort((a, b) => {
            const timeA = new Date(a.timestamp).getTime();
            const timeB = new Date(b.timestamp).getTime();
            return timeA - timeB;
          });
          
          console.log("📋 MESSAGES WITH ALIGNMENT:");
          sortedMessages.forEach((m, index) => {
            const senderId = typeof m.senderId === 'string' ? m.senderId : m.senderId?._id;
            const receiverId = typeof m.receiverId === 'string' ? m.receiverId : m.receiverId?._id;
            const isMine = senderId === currentUserId;
            console.log(`  [${index + 1}] "${m.message?.substring(0, 30)}" → ${isMine ? '➡️ RIGHT (mine)' : '⬅️ LEFT (theirs)'}`);
            console.log(`      📤 Sender: ${senderId} ${senderId === currentUserId ? '(ME)' : '(OTHER)'}`);
            console.log(`      📥 Receiver: ${receiverId} ${receiverId === currentUserId ? '(ME)' : '(OTHER)'}`);
          });
          console.log(`\n👤 Current User: ${currentUserId}`);
          console.log(`📄 Page Role: ${pageRole}\n`);
          
          setMessages(sortedMessages);
        } else {
          console.log("📭 No messages for this conversation");
          setMessages([]);
        }
      } catch (err: any) {
        console.error("❌ Fetch messages error:", err.message);
        console.error("   Stack:", err.stack);
      } finally {
        setIsLoadingMessages(false);
      }
    };
    
    fetchMessages();
  }, [bookingId, vehicleId, pageRole, apiUrl, isOpen, useRealtime, currentUserId, ownerId, customerId]);

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
    console.log("  Vehicle ID:", vehicleId);
    console.log("  Files:", files.length);
    console.log("=====================================");

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

      if (socketRef.current?.connected) {
        socketRef.current.emit("sendMessage", { 
          senderId: currentUserId,
          receiverId: otherUserId,
          message: messageToSend,
          bookingId,
          vehicleId,
        });
        console.log("🔌 Sent via Socket.IO");
      }

      try {
        const formData = new FormData();
        formData.append("bookingId", bookingId);
        formData.append("senderId", currentUserId);
        formData.append("receiverId", otherUserId);
        formData.append("message", messageToSend);
        
        if (vehicleId) {
          formData.append("vehicleId", vehicleId);
        }

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

  // ✅ Extract senderId with proper handling
  const getSenderId = (msg: ChatMessage): string => {
    if (!msg.senderId) {
      console.warn("⚠️ Message has no senderId:", msg);
      return "";
    }
    
    if (typeof msg.senderId === 'string') {
      return msg.senderId.trim();
    }
    
    if (typeof msg.senderId === 'object' && msg.senderId._id) {
      return msg.senderId._id.trim();
    }
    
    console.warn("⚠️ Unable to extract senderId from:", msg.senderId);
    return "";
  };

  // ✅ FIXED: Determine message alignment based on senderId
  const isMyMessage = (msg: ChatMessage): boolean => {
    const msgSenderId = getSenderId(msg);
    
    if (!msgSenderId) {
      console.warn("⚠️ Cannot determine sender for message:", msg);
      return false;
    }
    
    // Normalize IDs for comparison
    const normalizedMsgSenderId = msgSenderId.toLowerCase().trim();
    const normalizedCurrentUserId = currentUserId.toLowerCase().trim();
    
    // ✅ CRITICAL: If senderId matches currentUserId, it's MINE (show on RIGHT)
    const isMine = normalizedMsgSenderId === normalizedCurrentUserId;
    
    console.log("🔍 Message alignment:", {
      messageText: msg.message?.substring(0, 30),
      msgSenderId: msgSenderId,
      currentUserId: currentUserId,
      isMine: isMine,
      side: isMine ? "➡️ RIGHT" : "⬅️ LEFT",
      pageRole: pageRole
    });
    
    return isMine;
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
              {isLoadingMessages ? (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  <div className="flex flex-col items-center gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span>Loading messages...</span>
                  </div>
                </div>
              ) : messages.length === 0 ? (
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