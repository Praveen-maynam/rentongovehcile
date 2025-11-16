// import React, { useState, useRef, useEffect } from 'react';
// import { useSocket, useChatMessages } from '../../hooks/useSocket';
// import { useAuth } from '../../hooks/useAuth';
// import { IoSend, IoAttach, IoCheckmarkDone } from 'react-icons/io5';

// interface SupportMessage {
//     id?: string;
//     senderId: string;
//     senderName?: string;
//     message: string;
//     timestamp?: string;
//     isSent?: boolean;
// }

// /**
//  * Support Chat Component for real-time ticket communication
//  */
// const SupportChat: React.FC<{ ticketId: string }> = ({ ticketId }) => {
//     const { user } = useAuth();
//     const userId = user?.userId || user?.id || 'anonymous';
//     const userName = user?.name || user?.username || 'Anonymous';

//     // Initialize socket connection
//     useSocket(userId, 'customer');

//     // Use chat messages hook
//     const { messages, isTyping, sendMessage, sendTypingIndicator, clearMessages } =
//         useChatMessages(ticketId);

//     // Local state
//     const [messageInput, setMessageInput] = useState('');
//     const [isComposing, setIsComposing] = useState(false);
//     const [sentMessages, setSentMessages] = useState<Set<string>>(new Set());
//     const messagesEndRef = useRef<HTMLDivElement>(null);
//     const typingTimeoutRef = useRef<NodeJS.Timeout>();

//     /**
//      * Auto-scroll to bottom when new messages arrive
//      */
//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);

//     /**
//      * Handle message input change with typing indicator
//      */
//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setMessageInput(value);

//         // Send typing indicator
//         if (!isComposing) {
//             sendTypingIndicator(true);
//             setIsComposing(true);
//         }

//         // Clear previous timeout
//         if (typingTimeoutRef.current) {
//             clearTimeout(typingTimeoutRef.current);
//         }

//         // Stop typing indicator after 1 second of inactivity
//         typingTimeoutRef.current = setTimeout(() => {
//             sendTypingIndicator(false);
//             setIsComposing(false);
//         }, 1000);
//     };

//     /**
//      * Handle sending message
//      */
//     const handleSendMessage = (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!messageInput.trim()) return;

//         const messageId = `${Date.now()}_${Math.random()}`;

//         // Send message through socket
//         sendMessage(messageInput);
//         setSentMessages((prev) => new Set(prev).add(messageId));

//         setMessageInput('');
//         setIsComposing(false);

//         // Stop typing indicator
//         sendTypingIndicator(false);
//     };

//     /**
//      * Get typing users message
//      */
//     const getTypingMessage = (): string => {
//         const typingUsers = Object.values(isTyping)
//             .filter((t) => t.isTyping)
//             .map((t) => t.userName || 'Someone')
//             .join(', ');

//         if (typingUsers) {
//             return `${typingUsers} ${Object.values(isTyping).filter((t) => t.isTyping).length > 1 ? 'are' : 'is'} typing...`;
//         }
//         return '';
//     };

//     return (
//         <div className="flex flex-col h-full bg-gray-50">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-4 shadow-lg flex justify-between items-center">
//                 <div>
//                     <h2 className="text-lg font-bold">Support Ticket #{ticketId.slice(-6)}</h2>
//                     <p className="text-sm text-blue-100">Chat with support team</p>
//                 </div>
//             </div>

//             {/* Messages Container */}
//             <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
//                 {messages.length === 0 ? (
//                     <div className="flex items-center justify-center h-full text-center">
//                         <div className="text-gray-500">
//                             <p className="text-lg font-semibold mb-2">No messages yet</p>
//                             <p className="text-sm">Start a conversation by sending a message</p>
//                         </div>
//                     </div>
//                 ) : (
//                     <>
//                         {messages.map((msg, index) => {
//                             const isOwn = msg.senderId === userId;

//                             return (
//                                 <div
//                                     key={index}
//                                     className={`flex ${isOwn ? 'justify-end' : 'justify-start'} gap-2`}
//                                 >
//                                     <div
//                                         className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg shadow-sm ${
//                                             isOwn
//                                                 ? 'bg-blue-500 text-white rounded-br-none'
//                                                 : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'
//                                         }`}
//                                     >
//                                         {msg.senderName && !isOwn && (
//                                             <p className="text-xs font-semibold mb-1 opacity-75">
//                                                 {msg.senderName}
//                                             </p>
//                                         )}
//                                         <p className="text-sm break-words">{msg.message}</p>
//                                         <div
//                                             className={`text-xs mt-2 flex items-center gap-1 ${
//                                                 isOwn ? 'text-blue-100' : 'text-gray-400'
//                                             }`}
//                                         >
//                                             {msg.timestamp && (
//                                                 <span>
//                                                     {new Date(msg.timestamp).toLocaleTimeString(
//                                                         'en-US',
//                                                         {
//                                                             hour: '2-digit',
//                                                             minute: '2-digit',
//                                                         }
//                                                     )}
//                                                 </span>
//                                             )}
//                                             {isOwn && (
//                                                 <IoCheckmarkDone size={14} />
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}

//                         {/* Typing Indicator */}
//                         {getTypingMessage() && (
//                             <div className="flex justify-start">
//                                 <div className="text-gray-500 text-sm italic px-4 py-2 bg-white rounded-lg border border-gray-200">
//                                     {getTypingMessage()}
//                                 </div>
//                             </div>
//                         )}

//                         <div ref={messagesEndRef} />
//                     </>
//                 )}
//             </div>

//             {/* Message Input */}
//             <div className="border-t border-gray-200 bg-white px-6 py-4 shadow-lg">
//                 <form onSubmit={handleSendMessage} className="flex gap-3">
//                     <input
//                         type="text"
//                         value={messageInput}
//                         onChange={handleInputChange}
//                         onKeyPress={(e) => {
//                             if (e.key === 'Enter' && !e.shiftKey) {
//                                 e.preventDefault();
//                                 handleSendMessage(e as any);
//                             }
//                         }}
//                         placeholder="Type your message..."
//                         className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
//                     />

//                     <button
//                         type="button"
//                         className="px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//                         title="Attach file"
//                     >
//                         <IoAttach size={20} />
//                     </button>

//                     <button
//                         type="submit"
//                         disabled={!messageInput.trim()}
//                         className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-semibold"
//                     >
//                         <IoSend size={20} />
//                         Send
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// /**
//  * Support Dashboard Component
//  */
// const SupportDashboard: React.FC = () => {
//     const { user } = useAuth();
//     const userId = user?.userId || user?.id || 'anonymous';

//     // Initialize socket
//     const { isConnected, isLoading, error } = useSocket(userId, 'customer');

//     const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

//     if (isLoading) {
//         return (
//             <div className="flex items-center justify-center h-screen bg-gray-50">
//                 <div className="text-center">
//                     <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//                     <p className="text-gray-600">Connecting to support...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex items-center justify-center h-screen bg-gray-50">
//                 <div className="text-center">
//                     <p className="font-semibold text-red-600 mb-2">Connection Error</p>
//                     <p className="text-sm text-gray-600">{error}</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="flex h-screen bg-gray-100">
//             {/* Status Indicator */}
//             <div className="fixed top-4 right-4 z-50">
//                 <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
//                     <div
//                         className={`w-3 h-3 rounded-full ${
//                             isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
//                         }`}
//                     ></div>
//                     <span className="text-sm font-medium text-gray-600">
//                         {isConnected ? 'Connected' : 'Disconnected'}
//                     </span>
//                 </div>
//             </div>

//             {selectedTicket ? (
//                 <SupportChat ticketId={selectedTicket} />
//             ) : (
//                 <div className="w-full flex items-center justify-center">
//                     <div className="text-center">
//                         <p className="text-gray-600 text-lg mb-4">
//                             Select a support ticket to start chatting
//                         </p>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SupportDashboard;
export{}