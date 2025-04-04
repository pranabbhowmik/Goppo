import React, { useState } from "react";
import { BsSend, BsPaperclip } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();
    const fileInputRef = React.useRef(null);

    const [uploadingFiles, setUploadingFiles] = useState([]);
    const [uploadedAttachments, setUploadedAttachments] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message && uploadedAttachments.length === 0) return;

        await sendMessage(message, uploadedAttachments); // Send URLs, not raw files

        setMessage("");
        setUploadedAttachments([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const uploadToCloudinary = async (file) => {
        const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/dryjhjgqb/upload`;
        const CLOUDINARY_UPLOAD_PRESET = "message-attachments";

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        formData.append("resource_type", "auto");

        try {
            const response = await fetch(CLOUDINARY_UPLOAD_URL, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            if (data.secure_url) {
                return {
                    url: data.secure_url,
                    name: file.name,
                    type: file.type,
                };
            }
        } catch (err) {
            console.error("Upload failed:", err);
        }
        return null;
    };

    const handleFileChange = async (event) => {
        const files = Array.from(event.target.files);

        for (const file of files) {
            setUploadingFiles((prev) => [...prev, file.name]);

            const uploaded = await uploadToCloudinary(file);

            setUploadingFiles((prev) => prev.filter((f) => f !== file.name));
            if (uploaded) {
                setUploadedAttachments((prev) => [...prev, uploaded]);
            }
        }
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
                    disabled={uploadingFiles.length > 0}
                >
                    {loading ? (
                        <div className="loading loading-spinner" />
                    ) : (
                        <BsSend size={16} />
                    )}
                </button>
            </div>

            {/* Uploaded files preview */}
            {uploadedAttachments.length > 0 && (
                <div className="mt-2 text-sm text-gray-300 space-y-1">
                    <p className="font-medium text-white">Attachments:</p>
                    {uploadedAttachments.map((file, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 truncate"
                        >
                            <span>✅</span>
                            <span className="truncate">{file.name}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Uploading files indicator */}
            {uploadingFiles.length > 0 && (
                <div className="mt-2 text-sm text-yellow-400 space-y-1">
                    <p className="font-medium text-white">Uploading:</p>
                    {uploadingFiles.map((name, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <span>⏳</span>
                            <span className="truncate">{name}</span>
                        </div>
                    ))}
                </div>
            )}
        </form>
    );
};

export default MessageInput;
