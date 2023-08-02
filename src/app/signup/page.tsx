"use client";
import {useEffect} from "react";
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {toast} from "react-hot-toast/headless";

const SignupPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", user);
      console.log(res.data, "success");
      router.push("/login");
    } catch (err: any) {
      console.log("signup failed ", err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-center text-black text-2xl">
          {loading ? "procceding.." : "Signup"}
        </h1>

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
          className={`
           p-2 border bg-blue-300 border-blue-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500`}
        >
          {buttonDisabled ? "signup" : "nosignup"}
        </button>
        <Link href={"/login"} className="text-blue-500">
          visit login page
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
