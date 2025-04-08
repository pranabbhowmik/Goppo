import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import { useNavigate } from "react-router-dom";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { setSelectedConversation } = useConversation();
  const navigate = useNavigate();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  const handleClick = () => {
    // Make sure we're passing the complete conversation object
    setSelectedConversation({
      _id: conversation._id,
      fullName: conversation.fullName,
      profilepic: conversation.profilepic,
      // Include any other necessary fields
    });
    navigate(`/messages/${conversation._id}`);
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer`}
        onClick={handleClick}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilepic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
