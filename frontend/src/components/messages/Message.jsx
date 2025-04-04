import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Download, Image as ImageIcon, File } from "lucide-react";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const fromMe = message?.senderId === authUser?._id;

  const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const chatClass = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-700";

  // Check if file is an image
  const isImage = (fileType) => {
    return fileType?.startsWith("image/");
  };

  return (
    <div className={`chat ${chatClass}`}>
      <div className={`chat-bubble text-white ${bubbleBgColor} break-words`}>
        {message.message && <p className="mb-2">{message.message}</p>}

        {/* Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {message.attachments.map((file, index) => (
              <div key={index} className="max-w-xs">
                {isImage(file.type) ? (
                  // Display image preview
                  <div className="rounded-lg overflow-hidden border border-gray-600">
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-full h-auto max-h-48 object-contain"
                      />
                    </a>
                    <div className="bg-black bg-opacity-50 p-2 flex justify-between items-center text-xs">
                      <span className="text-white truncate">{file.name}</span>
                      <a
                        href={file.url}
                        download={file.name}
                        className="text-white hover:text-blue-300"
                        title="Download"
                      >
                        <Download size={16} />
                      </a>
                    </div>
                  </div>
                ) : (
                  // Display file with icon
                  <div className="flex items-center gap-3 p-2 bg-black bg-opacity-20 rounded-lg">
                    <div className="flex-shrink-0">
                      {file.type.includes("pdf") ? (
                        <File size={24} className="text-red-500" />
                      ) : file.type.includes("word") ? (
                        <File size={24} className="text-blue-500" />
                      ) : file.type.includes("excel") ? (
                        <File size={24} className="text-green-500" />
                      ) : file.type.includes("zip") ? (
                        <File size={24} className="text-yellow-500" />
                      ) : (
                        <File size={24} className="text-gray-400" />
                      )}
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-medium truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-300">
                        {file.type.split("/")[1] || "file"}
                      </p>
                    </div>
                    <a
                      href={file.url}
                      download={file.name}
                      className="flex-shrink-0 text-white hover:text-blue-300"
                      title="Download"
                    >
                      <Download size={16} />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-xs text-gray-400 mt-1">{formattedTime}</div>
    </div>
  );
};

export default Message;
