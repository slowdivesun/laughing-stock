import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3004/api/conversations/" + user._id
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3004/api/messages/" + currentChat._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const res = await axios.post(
        "http://localhost:3004/api/messages",
        message
      );
      console.log(res);
      setMessages([...messages, res.data]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Topbar />
      <div className='messenger h-[90vh] flex flex-row'>
        <div className='chatMenu w-[40vw] p-3'>
          <input
            type='text'
            placeholder='Search for Friends'
            className='chatSearch w-full p-3 my-2 border-2 border-black'
          />
          {conversations.map((conversation) => (
            <div onClick={() => setCurrentChat(conversation)}>
              <Conversation
                conversation={conversation}
                currentUser={user}
                key={conversation._id}
              />
            </div>
          ))}
        </div>
        <div className='chatBox flex-1'>
          {currentChat ? (
            <>
              <div className='chatBoxTop w-full flex flex-col h-[85%] overflow-scroll'>
                {messages.map((m) => (
                  <Message message={m} own={m.sender === user._id} />
                ))}
              </div>
              <div className='chatBoxBotton flex flex-row items-center justify-around h-[10%] sticky bottom-3'>
                <textarea
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                  placeholder='Write Something'
                  className='chatInput w-[80%] p-3 border-2 border-black'
                ></textarea>
                <button
                  onClick={handleSubmit}
                  className='cursor-pointer transition ease-in-out delay-400 bg-black text-white hover:text-black hover:bg-white border-2 border-black px-3 py-2'
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className='w-full h-full flex items-center justify-center'>
              <span>Open A Conversation</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
