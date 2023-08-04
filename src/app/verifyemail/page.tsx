"use client";

import axios from "axios";
import Link from "next/link";

import {useEffect, useState} from "react";

const VerifyEmailPage = () => {
  const [tokken, setTokken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", {tokken});
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data, "error veryfied");
    }
  };

  useEffect(() => {
    const urlTokken = window.location.search.split("=")[1];
    setTokken(urlTokken || "");
  }, []);

  useEffect(() => {
    if (tokken.length > 0) verifyUserEmail();
  }, [tokken]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {tokken ? `${tokken}` : "No Tokken"}
      </h2>

      {verified && (
        <div className="">
          <h2 className="text-2xl">Email Veryfid</h2>
          <Link href={"/login"}>Login</Link>
        </div>
      )}
      {error && (
        <div className="">
          <h2 className="text-2xl bg-red-500 text-white">Error</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;
