import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import GoppoSeo from "../../components/GoppoSeo";
import { useParams } from "react-router-dom";
import useConversation from "../../zustand/useConversation";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

const MessagesPage = () => {
  const { id } = useParams();
  const { setSelectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  useEffect(() => {
    // Set the selected conversation based on the URL param
    if (id) {
      setSelectedConversation({ _id: id });
    }
  }, [id, setSelectedConversation]);

  return (
    <>
      <GoppoSeo />
      <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        {/* <Sidebar /> */}
        <MessageContainer />
      </div>
    </>
  );
};

export default MessagesPage;
