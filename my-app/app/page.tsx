"use client";
import { userAgent } from "next/server"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const accounts = []
const page = () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [phone, setphone] = useState("")
  const [image, setimage] = useState("")
   const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://127.0.0.1:8000/users");
      const data = await response.json();
      if (data.length != 0){
        router.replace("/login");
      }else{
        console.log(data)
        console.log("real kilua")
      }
    }
    fetchData()
  })
  const handleloging = async () => {
    const nextId =
      accounts.length > 0
        ? Math.max(...accounts.map(account => account.id)) + 1
        : 1;
    if(email && password && phone !== ""){
      const userdata = {
      id:nextId,
      email: email,
      password: password,
      image: image,
      phone: phone
    }
    const saved = JSON.parse(localStorage.getItem("accont"));
    if(saved){
      const data = await fetch("http://127.0.0.1:8000/login",{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saved)
      });
      const respond = await data.json()
      console.log(saved)
      console.log(respond)
      window.location.href = "/login"
    }else{
      console.log("data not saved")
    }
    setemail("")
    setpassword("")
    setphone("")
    setimage("")
    console.log(image)
    localStorage.setItem("accont", JSON.stringify(userdata))
    accounts.push(userdata)
    localStorage.setItem("acconts", JSON.stringify(accounts))
    console.log("we logged in yay")
    }else{
      console.log("u need to fill up")
    }
  }
  return (
    <div className="h-screen flex gap-2.5 justify-center items-center">
      <div className="flex justify-center items-center flex-col gap-5 border-2 rounded-2xl border-white p-10">
        <input id="email" className="p-5 border-2 border-white" value={email} onChange={event => setemail(event.target.value)} type="email" placeholder="Put the email" />
        <input id="image" className="p-5 border-2 border-white" onChange={event => {const reader = new FileReader();const file = event.target.files[0];reader.onload = () => setimage(reader.result); reader.readAsDataURL(file);}} type="file" placeholder="Put the image URL" />
        <input className="p-5 border-2 border-white" value={password} onChange={event => setpassword(event.target.value)} type="password" placeholder="Put the password"/>
        <input  className="p-5 border-2 border-white" value={phone} onChange={event => setphone(event.target.value)} type="phone" placeholder="Put the the phone number"/>
        <button className="p-5 bg-blue-500 text-white rounded-lg" onClick={handleloging}>Submit</button>
      </div>
    </div>
  )
}

export default page