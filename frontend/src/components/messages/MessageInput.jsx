// components/MessageInput.jsx
import React, { useState } from "react";
import { BsSend, BsPaperclip } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { loading, sendMessage } = useSendMessage();
  const fileInputRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && selectedFiles.length === 0) return;
    await sendMessage(message, selectedFiles);
    setMessage("");
    setSelectedFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  return (
    <form className="px-4 my-3 relative" onSubmit={handleSubmit}>
      <div className="relative w-full flex items-center">
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="p-2 cursor-pointer text-white hover:text-blue-500"
        >
          <BsPaperclip size={20} />
        </label>
        <input
          type="text"
          className="border text-sm font-normal font-Geist rounded-lg block w-full p-2.5 pr-10 bg-slate-900 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center justify-center w-10 h-full text-white rounded-r-lg hover:bg-blue-700 transition duration-200"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend size={16} />
          )}
        </button>
      </div>
      {selectedFiles.length > 0 && (
        <div className="mt-2 text-sm text-gray-400">
          {selectedFiles.length} file(s) selected
        </div>
      )}
    </form>
  );
};

export default MessageInput;
