import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";
import { useRef } from "react";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("https://vercel.com/slowdivesun/laughing-stock-socket");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
      });
    });
  }, []);
  console.log(arrivalMessage);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "https://laughing-stock-api.vercel.app/api/conversations/" + user._id
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
          "https://laughing-stock-api.vercel.app/api/messages/" +
            currentChat._id
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

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        "https://laughing-stock-api.vercel.app/api/messages",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Topbar />
      <div className='messenger h-[90vh] flex flex-col sm:flex-row'>
        <div className='chatMenu w-[80vw] sm:w-[30vw] sm:h-[90vh] p-5 h-[30vh]  sm:border-r-2 sm:border-blue-300 overflow-scroll'>
          {/* <input
            type='text'
            placeholder='Search for Friends'
            className='chatSearch w-full p-3 my-2 border-2 border-black'
          /> */}
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
        <div className='chatBox flex-1 h-[50vh] sm:h-[90vh]'>
          {currentChat ? (
            <>
              <div className='chatBoxTop w-full flex flex-col h-[85%] overflow-scroll'>
                {messages.map((m) => (
                  <div ref={scrollRef}>
                    <Message
                      message={m}
                      own={m.sender === user._id}
                      key={m._id}
                    />
                  </div>
                ))}
                {messages.length === 0 ? (
                  <div className='w-full h-full flex items-center justify-center text-xl text-gray-500'>
                    Empty
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className='chatBoxBotton flex flex-row items-center justify-around h-[10%] sticky bottom-3'>
                <textarea
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                  placeholder='Write Something'
                  className='chatInput w-[80%] p-3 border-2 border-black'
                  required
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
