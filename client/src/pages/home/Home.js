import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Card from "../../components/card/Card";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3004/api/users/");
        setUsers(res.data);
        console.log(users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className='flex flex-row justify-center flex-wrap'>
      {users.map((u) => {
        return <Card user={u} key={u._id} />;
      })}
    </div>
  );
}
