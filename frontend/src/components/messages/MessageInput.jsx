import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <form className="px-4 my-3 relative" onSubmit={handelSubmit}>
      <div className="relative w-full">
        <input
          type="text"
          className="border text-sm font-normal font-Geist rounded-lg block w-full p-2.5 pr-10 bg-slate-900 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center justify-center w-10 h-full  text-white rounded-r-lg hover:bg-blue-700 transition duration-200"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend size={16} />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
