import React, { useState } from 'react';
import { Send, X, Minimize2 } from 'lucide-react';
 
interface Message {
  id: number;
  text: string;
  sender: 'you' | 'other';
  time: string;
}
 
interface PopupChatProps {
  isOpen: boolean;
  onClose: () => void;
  ownerName?: string;
  ownerAvatar?: string;
}
 
const PopupChat: React.FC<PopupChatProps> = ({
  isOpen,
  onClose,
  ownerName = "Manoj Kumar",
  ownerAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Manoj"
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Need Car for Rent!',
      sender: 'you',
      time: '09:25 AM'
    },
    {
      id: 2,
      text: 'Yes! Rent Was 500 per Day',
      sender: 'other',
      time: '09:25 AM'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
 
  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        sender: 'you',
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };
 
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
 
  if (!isOpen) return null;
 
  return (
    <>
      {/* Backdrop - semi-transparent overlay */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />
 
      {/* Chat Popup */}
      <div
        className={`fixed right-6 bottom-6 bg-white rounded-2xl shadow-2xl z-50 flex flex-col transition-all duration-300 ${
          isMinimized ? 'h-16' : 'h-[600px]'
        }`}
        style={{ width: '400px' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white rounded-t-2xl">
          <img
            src={ownerAvatar}
            alt={ownerName}
            className="w-10 h-10 rounded-full ring-2 ring-blue-100"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{ownerName}</h3>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Online
            </p>
          </div>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Minimize2 className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
 
        {/* Chat Content - Hidden when minimized */}
        {!isMinimized && (
          <>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'you' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div className="flex items-end gap-2 max-w-[80%]">
                    {message.sender === 'other' && (
                      <img
                        src={ownerAvatar}
                        alt={ownerName}
                        className="w-7 h-7 rounded-full flex-shrink-0"
                      />
                    )}
                    <div>
                      {message.sender === 'other' && (
                        <p className="text-xs text-gray-600 mb-1 ml-2">
                          {ownerName}
                        </p>
                      )}
                      <div
                        className={`rounded-2xl px-4 py-2 shadow-sm ${
                          message.sender === 'you'
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm'
                            : 'bg-white text-gray-900 rounded-bl-sm border border-gray-200'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 ml-2">
                        {message.time}
                      </p>
                    </div>
                    {message.sender === 'you' && (
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
                        alt="You"
                        className="w-7 h-7 rounded-full flex-shrink-0"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
 
            {/* Input Area */}
            <div className="border-t border-gray-200 p-4 bg-white rounded-b-2xl">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Write your message..."
                  className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="p-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
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
 