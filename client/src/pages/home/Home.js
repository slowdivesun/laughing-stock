import axios from "axios";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [userid, setUserid] = useState("");
  const [alert, setAlert] = useState(false);
  const [negativeAlert, setNegativeAlert] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://laughing-stock-api.vercel.app/api/users/"
        );
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const req = {
      senderId: user._id,
      receiverId: userid,
    };
    try {
      const res = await axios.post(
        "https://laughing-stock-api.vercel.app/api/conversations/",
        req
      );
      setAlert(true);
      setTimeout(() => setAlert(false), 5000);
    } catch (err) {
      setNegativeAlert(true);
      setTimeout(() => setNegativeAlert(false), 5000);
    }
  };
  return (
    <div>
      <div className='flex flex-col items-center'>
        <form
          onSubmit={(e) => onSubmit(e)}
          className='flex flex-col items-center'
        >
          <input
            onChange={(e) => setUserid(e.target.value)}
            type='text'
            placeholder='Enter User ID'
            className='p-3 my-3 border-2 border-black w-[50vw]'
            required
          />
          <button
            type='submit'
            className='transition ease-in-out delay-400 bg-black text-white hover:text-black hover:bg-white border-2 border-black px-3 py-2'
          >
            Add to contacts
          </button>
          <Link to='/messenger'>
            <button className='transition ease-in-out delay-400 bg-blue-300 text-black hover:text-black hover:bg-white border-2 border-black px-3 py-2 my-3'>
              Open Messenger
            </button>
          </Link>
        </form>
        <div
          className={`bg-green-200 my-3 p-3 w-[50vw] flex items-center justify-center ${
            alert ? "" : "hidden"
          }`}
        >
          Added
        </div>
        <div
          className={`bg-red-200 my-3 p-3 w-[50vw] flex items-center justify-center ${
            negativeAlert ? "" : "hidden"
          }`}
        >
          Invalid ID
        </div>
      </div>
      <div className='flex flex-row justify-center flex-wrap'>
        {users.map((u) => {
          return user._id !== u._id ? <Card user={u} key={u._id} /> : null;
        })}
      </div>
    </div>
  );
}
