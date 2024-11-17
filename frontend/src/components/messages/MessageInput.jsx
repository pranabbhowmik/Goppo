import React from "react";
import { BsSend } from "react-icons/bs";

const MessageInput = () => {
  return (
    <form className="px-4 my-3 relative">
      <div className="relative w-full">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 pr-10 bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Send a message"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center justify-center w-10 h-full  text-white rounded-r-lg hover:bg-blue-700 transition duration-200"
        >
          <BsSend size={16} />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
