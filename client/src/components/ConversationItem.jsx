import { useAuth } from "../context/AuthContext";

export const ConversationItem = ({
  conversation,
  currentConversation,
  updateConversationById,
  handleDeleteConversation,
}) => {
  const { user } = useAuth();

  // Prepare variables to hold name and avatar URL conditionally based on conversation type
  let name, icon, subtext;

  if (conversation.type === "group") {
    // For group conversations
    name = conversation.name || "Unnamed Group";
    icon = "https://via.placeholder.com/50"; // Placeholder for group (you might want to use a group icon)
  } else {
    // For private conversations, find the other participant
    const otherParticipant =
      conversation.participants.find((p) => p._id !== user._id) ||
      conversation.participants[0];
    name = otherParticipant.displayName;
    icon = otherParticipant.avatarUrl || "https://via.placeholder.com/50";
  }

  const handleClick = () => {
    if (currentConversation?._id === conversation._id) return;
    updateConversationById(conversation._id); // Function to set the current conversation
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center p-4 rounded-lg cursor-pointer ${
        currentConversation?._id === conversation._id
          ? "bg-gray-200"
          : "hover:bg-gray-100"
      }`}
    >
      <img src={icon} alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
      <div>
        <h3 className="text-sm font-semibold">{name}</h3>
      </div>
      <button
        onClick={() => handleDeleteConversation(conversation._id)}
        className="ml-auto btn-primary bg-red text-white font-bold py-1 px-2 rounded-xl"
      >
        Delete
      </button>
    </div>
  );
};
