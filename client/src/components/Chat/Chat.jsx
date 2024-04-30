import { useEffect, useState } from "react";
import { ChatWindow } from "./ChatWindow/ChatWindow";
import { ConversationList } from "./ConversationList";
import { GroupList } from "./GroupList";
import { useAuth } from "../../context/AuthContext";
import { Modal } from "./Modal";
import { toast } from "react-toastify";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const Chat = () => {
  const { user } = useAuth();
  const [currentConversation, setCurrentConversation] = useState(null); // current conversation
  const [privateConversations, setPrivateConversations] = useState([]); // private conversations state
  const [groupConversations, setGroupConversations] = useState([]); // group conversations state
  const [showModal, setShowModal] = useState(false);
  const [userContacts, setUserContacts] = useState([]);

  // useeffect to set current conversation most recent (make a call to the server to get the most recent conversation)
  useEffect(() => {
    fetchConversations();
    fetchUserContacts();
  }, []);

  // function to update the current conversation by id
  const updateConversationById = (id) => {
    // if id is null then set the current conversation to the most recent conversation
    if (!id) {
      setCurrentConversation(null);
      fetchConversations();
      return;
    }
    axios
      .get(`${API_URL}/chat/conversations/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCurrentConversation(res.data);
      });
  };
  // function to fetch the conversations
  const fetchConversations = () => {
    axios
      .get(`${API_URL}/chat/conversations`, {
        withCredentials: true,
      })
      .then((res) => {
        // loop through the conversations and if the conversation is a group conversation, add it to the groupConversations state
        // if the conversation is a private conversation, add it to the privateConversations state
        // clear the groupConversations and privateConversations state before adding the conversations
        setGroupConversations([]);
        setPrivateConversations([]);
        res.data.forEach((conversation) => {
          if (conversation.type === "group") {
            setGroupConversations((prev) => [...prev, conversation]);
          } else {
            setPrivateConversations((prev) => [...prev, conversation]);
          }
        });
        // if first time loading the page, set the current conversation to the most recent conversation
        if (!currentConversation) {
          updateConversationById(res.data[0]._id);
        }
      });
  };
  const handleAddConversation = (selectedContacts, conversationName = "") => {
    const participantIds = selectedContacts.map((contact) => contact.value);

    // Prepare the data object for the API request
    const data = {
      participants: participantIds,
      name: conversationName,
    };

    axios
      .post(`${API_URL}/chat/conversations`, data, {
        withCredentials: true,
      })
      .then((response) => {
        toast.success("Conversation created successfully");
        updateConversationById(response.data._id); // Update UI accordingly
        fetchConversations(); // Refresh the list of conversations
      })
      .catch((error) => {
        toast.error("Failed to create conversation");
        console.error(
          "Failed to create conversation:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const handleDeleteConversation = (conversationId) => {
    axios
      .delete(`${API_URL}/chat/conversations/${conversationId}`, {
        withCredentials: true,
      })
      .then(() => {
        setPrivateConversations((prevConversations) =>
          prevConversations.filter(
            (conversation) => conversation._id !== conversationId
          )
        );
        setGroupConversations((prevConversations) =>
          prevConversations.filter(
            (conversation) => conversation._id !== conversationId
          )
        );
        setCurrentConversation(null);
        toast.success("Conversation deleted successfully");
      })
      .catch((error) => {
        toast.error("Failed to delete conversation");
        console.error(
          "Failed to delete conversation:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const fetchUserContacts = async () => {
    axios
      .get(`${API_URL}/user/contacts`, {
        withCredentials: true,
      })
      .then((response) => {
        setUserContacts(response.data.contacts);
      })
      .catch((error) => {
        console.error("Error fetching user contacts:", error.response.data);
      });
  };

  return (
    <div className="flex flex-grow m-7 ml-0">
      <div className="flex flex-col flex-grow mr-7 w-1/2">
        <button
          className={`btn-primary mb-7 rounded-xl w-full h-1/7 bg-${user?.colors.mainColor} hover:bg-${user?.colors.darkColor}`}
          onClick={() => setShowModal(true)}
        >
          New Conversation
        </button>

        <GroupList
          groupConversations={groupConversations}
          currentConversation={currentConversation}
          updateConversationById={updateConversationById}
          handleDeleteConversation={handleDeleteConversation}
          fetchConversations={fetchConversations}
        />

        <ConversationList
          user={user}
          privateConversations={privateConversations}
          updateConversationById={updateConversationById}
          handleDeleteConversation={handleDeleteConversation}
          setPrivateConversations={setPrivateConversations}
          currentConversation={currentConversation}
          fetchConversations={fetchConversations}
        />
      </div>
      <ChatWindow
        user={user}
        currentConversation={currentConversation}
        updateConversationById={updateConversationById}
      />
      {showModal && (
        <Modal
          handleAddConversation={handleAddConversation}
          setShowModal={setShowModal}
          fetchUserContacts={fetchUserContacts}
          userContacts={userContacts}
        />
      )}
    </div>
  );
};
