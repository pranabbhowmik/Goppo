import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message, attachments } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    console.log("messages", message);
    console.log("Attachments", attachments);

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    let parsedAttachments = attachments;

    if (typeof attachments === "string") {
      try {
        parsedAttachments = JSON.parse(attachments);
      } catch (err) {
        console.error("Failed to parse attachments:", err.message);
        parsedAttachments = [];
      }
    }


    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId, // corrected field name
      message,
      attachments: parsedAttachments, // corrected to match schema
    });

    console.log("New Messages", newMessage);

    conversation.messages.push(newMessage._id);
    await conversation.save();

    // Emit event for real-time messaging
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
