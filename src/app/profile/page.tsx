"use client";
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {toast} from "react-hot-toast/headless";

const UserProfile = async () => {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout Failed" + error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data, "user data");
    setData(res.data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="bg-yellow-600 m-4 p-3 rounded">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}></Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-purple-900 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get user Details
      </button>
    </div>
  );
};

export default UserProfile;
