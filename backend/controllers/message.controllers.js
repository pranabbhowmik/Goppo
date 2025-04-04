import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message, attachments } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let parsedAttachments = [];

    // Handle attachments parsing
    if (attachments) {
      try {
        // If attachments is already an array (from direct API call)
        if (Array.isArray(attachments)) {
          parsedAttachments = attachments;
        }
        // If attachments is a string (from JSON stringified data)
        else if (typeof attachments === "string") {
          parsedAttachments = JSON.parse(attachments);
        }

        // Validate each attachment object
        parsedAttachments = parsedAttachments.map((attachment) => ({
          url: attachment.url || "",
          name: attachment.name || "file",
          type: attachment.type || "application/octet-stream",
        }));
      } catch (err) {
        console.error("Error parsing attachments:", err);
        parsedAttachments = [];
      }
    }

    // Validate required fields
    if (!message && parsedAttachments.length === 0) {
      return res
        .status(400)
        .json({ error: "Message or attachment is required" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message: message || "", // Ensure message is at least an empty string
      attachments: parsedAttachments,
    });

    conversation.messages.push(newMessage._id);
    await conversation.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.error("Error in getMessages controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
