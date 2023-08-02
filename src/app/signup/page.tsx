"use client";

import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";

const SignupPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignup = async () => {};
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-center text-black text-2xl">Signup</h1>

        <hr />
        <label htmlFor="username">username</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500"
          type="text"
          id="username"
          value={user.username || ""}
          onChange={(e) => setUser({...user, username: e.target.value})}
          placeholder="username"
        />

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
          onClick={onSignup}
          className="p-2 border bg-blue-300 border-blue-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500"
        >
          signUp
        </button>
        <Link href={"/login"} className="text-blue-500">
          visit login page
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
