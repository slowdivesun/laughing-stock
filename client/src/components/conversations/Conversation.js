import axios from "axios";
import { useState, useEffect } from "react";
import avatar from "../../images/user.png";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get(
          "https://laughing-stock-api.vercel.app/users/" + friendId
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className='flex flex-row items-center cursor-pointer hover:bg-gray-100 my-2'>
      <img
        src={avatar}
        alt=''
        className='conversationImg w-[50px] h-[50px] rounded-full border-2 border-gray-200'
      />
      <span className='conversationName p-3'>{user?.name}</span>
    </div>
  );
}
