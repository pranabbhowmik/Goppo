import React from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  return (
    <div className="flex flex-col w-full md:min-w-[450px] h-full">
      <>
        {/* Header */}
        <div className="bg-slate-500 px-4 py-2 mb-2 flex items-center justify-between">
          <span className="label-text text-sm md:text-base">To:</span>
          <span className="text-gray-900 font-bold text-sm md:text-base">
            John Doe
          </span>
        </div>

        {/* Messages Section */}
        <Messages />
        <MessageInput />
      </>
    </div>
  );
};

export default MessageContainer;
