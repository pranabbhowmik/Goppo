import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { id } = useParams();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const conversationId = id || selectedConversation?._id;
        if (!conversationId) return;

        const res = await fetch(`/api/messages/${conversationId}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, [id, selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
