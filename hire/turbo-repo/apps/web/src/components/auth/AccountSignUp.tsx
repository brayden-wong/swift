import styles from "@/styles/login.module.css";
import React, { useState } from "react";

const AccountSignUp = ({ Email, Page }: any) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <div
      className={`${
        Page === "signup" ? "translate-x-0" : "translate-x-[-100%]"
      } smooth absolute  h-full w-full flex-col flex justify-center items-center `}
    >
      <p className="w-[80%] font-medium text-lg ml-auto">
        Looks like you do not have an an account
      </p>
      <p className="w-[80%]  font-medium text-lg ml-auto">
        Lets create an account for <span className="font-black">{Email}</span>
      </p>
      <input
        value={name}
        placeholder="Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        className={`${styles.input} mt-5`}
      />
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

export default AccountSignUp;
