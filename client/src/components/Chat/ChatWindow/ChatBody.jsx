import { useEffect, useRef } from "react";

export const ChatBody = ({ currentConversation, user }) => {
  const { messages } = currentConversation;
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full overflow-y-auto" ref={chatBodyRef}>
      <div className="flex-1 p-4">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet.</p>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender.username === user.username
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-3 my-2 ${
                  message.sender.username === user.username
                    ? `bg-${user?.colors.mainColor} text-white rounded-br-none`
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                <div className="flex items-center">
                  <img
                    src={message.sender.avatarUrl}
                    alt={message.sender.username}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div>
                    <p className="text-sm break-words break-all">
                      {message.content}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender.username === user.username
                          ? "text-gray-200"
                          : "text-gray-500"
                      }`}
                    >
                      {message.sender.username} -{" "}
                      {new Date(message.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
