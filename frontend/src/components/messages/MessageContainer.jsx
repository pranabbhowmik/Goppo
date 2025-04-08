import React, { useEffect } from "react";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import MessageInput from "./MessageInput";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import leftArrow from "../../assets/left_arrow.png";
import rightArrow from "../../assets/right_arrow.png";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && !selectedConversation?._id) {
      fetchConversation(id);
    }
  }, [id]);

  useEffect(() => {
    if (selectedConversation?.receiverId && !selectedConversation.username) {
      fetchReceiverUser(selectedConversation.receiverId);
    }
  }, [selectedConversation?.receiverId]);

  const fetchConversation = async (conversationId) => {
    try {
      const res = await fetch(`/api/messages/${conversationId}`);
      const data = await res.json();

      if (res.ok) {
        setSelectedConversation({
          _id: conversationId,
          receiverId: data.receiverId,
        });
        console.log("Fetched conversation:", data);
      } else {
        console.error("Failed to fetch conversation");
      }
    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  };

  const fetchReceiverUser = async (receiverId) => {
    try {
      const res = await fetch(`/api/users/${receiverId}`);
      const data = await res.json();

      if (res.ok) {
        setSelectedConversation((prev) => ({
          ...prev,
          username: data.fullName,
        }));
      } else {
        console.error("Failed to fetch user");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <div className="flex flex-col py-2 px-3 w-[400px] md:w-[550px] h-full">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-900 px-4 py-2 mb-2 flex items-center justify-between">
            <div className="flex">
              <img
                onClick={() => navigate(-1)}
                className="w-8 p-2 rounded-2xl cursor-pointer"
                src={leftArrow}
                alt="Go Back"
              />
              <img
                onClick={() => navigate(1)}
                className="w-8 p-2 rounded-2xl cursor-pointer"
                src={rightArrow}
                alt="Go Forward"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="label-text text-sm md:text-base text-white">
                To:
              </span>
              <span className="text-white font-bold text-sm md:text-base">
                {selectedConversation?.username}
              </span>
            </div>
          </div>

          {/* Messages Section */}
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
