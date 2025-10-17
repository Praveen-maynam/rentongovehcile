import React from "react";

const CallOrChat: React.FC = () => {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-semibold mb-4">Call or Chat with the provider</h2>
      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg mb-2">Call</button>
      <button className="bg-green-600 text-white px-6 py-3 rounded-lg">Chat</button>
    </div>
  );
};

export default CallOrChat;
