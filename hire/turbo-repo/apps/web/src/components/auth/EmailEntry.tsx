import styles from "@/styles/login.module.css";
import React from "react";

const EmailEntry = ({ Email, setEmail, Page, setScreen }: any) => {
  return (
    <form
      className={`${
        Page === "email" ? "translate-x-0" : "translate-x-[-100%]"
      } smooth  h-full w-full flex-col flex justify-center items-center absolute`}
    >
      <label className="w-[60%] font-[700] text-md">Email</label>
      <input
        name="email"
        type="email"
        defaultValue={Email}
        placeholder="janedoe@mail.com"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className={styles.input}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setScreen("login");
          }
        }}
      />
    </form>
  );
};

export default EmailEntry;
