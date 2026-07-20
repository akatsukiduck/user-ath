"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [account, setAccount] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://127.0.0.1:8000/users");
      const data = await response.json();
      setAccount(data);
    }

    fetchData();
  }, []);
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://127.0.0.1:8000/users");
      const data = await response.json();
      if (!data || data.length === 0){
        router.replace("/");
      }else{
        console.log(data)
        console.log("real kilua")
      }
    }
    fetchData()
  })
  const handleDelete = async (id) => {
    await fetch(`http://127.0.0.1:8000/users/${id}`, {
        method: "DELETE",
    });
    router.replace("/");
    setAccount((prev) => prev.filter((user) => user.id !== id));
  }
  return (
    <div>
      {account.map((acc, index) => (
            <div key={acc.id}>
                <p>{acc.email}</p>
                <p>{acc.phone}</p>
                <img src={acc.image} alt="" width={100} />
                <button onClick={() => handleDelete(acc.id)}>Delete this accont</button>
            </div>
        ))}
    </div>
  );
}