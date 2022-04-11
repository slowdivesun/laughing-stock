import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("localhost:3004/api/users/");
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);
  return <div>Home</div>;
}
