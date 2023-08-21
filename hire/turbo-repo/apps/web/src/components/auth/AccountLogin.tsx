import styles from "@/styles/login.module.css";
import React, { useState } from "react";
import { HiUserCircle } from "react-icons/hi2";

const AccountLogin = ({ Email, Page }: any) => {
  const [password, setPassword] = useState<string>("");
  return (
    <div
      className={`${
        Page === "login" ? "translate-x-0" : "translate-x-[-100%]"
      } smooth absolute  h-full w-full flex-col flex justify-center items-center `}
    >
      <div className="w-[60%]  h-[15%] flex items-center">
        <HiUserCircle className="w-[15%] h-full " />
        <div className="flex flex-col text-lg ">
          <p className="font-black">Jane Doe</p>
          <p className="font-medium">janedoe@gmail.com</p>
        </div>
      </div>
      <input
        value={password}
        placeholder="Password"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className={`${styles.input} mt-5`}
      />
    </div>
  );
};

export default AccountLogin;
