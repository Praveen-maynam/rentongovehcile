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
//   isOpen: boolean;
//   onClose: () => void;
//   ownerName?: string;
//   ownerAvatar?: string;
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
//   const [inputValue, setInputValue] = useState('');
//   const [isMinimized, setIsMinimized] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
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
 







import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import io, { Socket } from "socket.io-client";

interface ChatMessage {
  senderId: string;
  receiverId: string;
  message: string;
  files?: string[];
  timestamp: string;
}

interface PopupChatProps {
  userId: string;
  receiverId: string;
  bookingId: string;
  apiUrl: string; // e.g., http://3.110.122.127:3000
}

const PopupChat: React.FC<PopupChatProps> = ({ userId, receiverId, bookingId, apiUrl }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const socketRef = useRef<Socket | null>(null);

  // Initialize Socket.IO
  useEffect(() => {
    const socket = io(apiUrl);
    socketRef.current = socket;

    socket.emit("join", userId);

    socket.on("receiveMessage", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, apiUrl]);

  // Fetch existing messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${apiUrl}/getMessages/${bookingId}`);
        if (!res.ok) throw new Error("Failed to fetch messages");
        const data = await res.json();
        if (data.success) setMessages(data.messages);
      } catch (err) {
        console.error("Fetch messages error:", err);
      }
    };
    fetchMessages();
  }, [bookingId, apiUrl]);

  // Handle file input
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  // Send message
  const handleSendMessage = async () => {
    if (!message.trim() && files.length === 0) return;

    const formData = new FormData();
    formData.append("senderId", userId);
    formData.append("receiverId", receiverId);
    formData.append("bookingId", bookingId);
    formData.append("message", message);
    formData.append("files", files.map(f => f.name).join(",")); // Just names for demo

    files.forEach((file) => formData.append("files", file));

    // Optimistic UI for text only
    setMessages((prev) => [
      ...prev,
      { senderId: userId, receiverId, message, files: files.map(f => URL.createObjectURL(f)), timestamp: new Date().toISOString() }
    ]);
    setMessage("");
    setFiles([]);

    // 1️⃣ Send via Socket.IO
    socketRef.current?.emit("sendMessage", { senderId: userId, receiverId, message, bookingId });

    // 2️⃣ Persist via REST API
    try {
      const res = await fetch(`${apiUrl}/sendMessage`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!data.success) console.error("Failed to persist message:", data.message);
    } catch (err) {
      console.error("API send message error:", err);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 10, width: 320 }}>
      <h3>Chat</h3>
      <div
        style={{
          height: 300,
          overflowY: "scroll",
          border: "1px solid #eee",
          padding: 5,
          marginBottom: 5,
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx} style={{ margin: "5px 0", textAlign: msg.senderId === userId ? "right" : "left" }}>
            <div
              style={{
                display: "inline-block",
                padding: "5px 10px",
                borderRadius: 10,
                background: msg.senderId === userId ? "#dcf8c6" : "#f1f0f0",
              }}
            >
              {msg.message}
              {msg.files && msg.files.map((file, i) => (
                <div key={i}>
                  <img src={file} alt="media" style={{ maxWidth: 150, marginTop: 5, borderRadius: 5 }} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        style={{ width: "calc(100% - 60px)", padding: 5 }}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
      />
      <input type="file" multiple onChange={handleFileChange} style={{ marginTop: 5 }} />
      <button onClick={handleSendMessage} style={{ width: "100%", marginTop: 5 }}>
        Send
      </button>
    </div>
  );
};

export default PopupChat;