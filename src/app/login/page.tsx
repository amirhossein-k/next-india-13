"use client";

import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.
    } catch (err) {
      console.log(err, "login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-center text-black text-2xl">
          {loading ? "processing" : "login"}
        </h1>

        <hr />

        <label htmlFor="email">email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500"
          type="text"
          id="email"
          value={user.email || ""}
          onChange={(e) => setUser({...user, email: e.target.value})}
          placeholder="email"
        />

        <label htmlFor="password">password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500"
          type="password"
          id="password"
          value={user.password || ""}
          onChange={(e) => setUser({...user, password: e.target.value})}
          placeholder="password"
        />

        <button
          onClick={onLogin}
          className="p-2 border bg-blue-300 border-blue-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500"
        >
          signUp
        </button>
        <Link href={"/signup"} className="text-blue-500">
          visit signup page
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
