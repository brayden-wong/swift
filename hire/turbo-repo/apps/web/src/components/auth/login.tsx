import styles from "@/styles/login.module.css";
import React, { useState } from "react";
import { HiArrowRight, HiArrowUpRight } from "react-icons/hi2";
import AccountLogin from "./AccountLogin";
import AccountSignUp from "./AccountSignUp";
import EmailEntry from "./EmailEntry";

const Login = ({ setChangePage, ChangePage }: any) => {
  const [screen, setScreen] = useState<any>("email");
  const [Email, setEmail] = useState<string>("");
  const screens = ["email", "signup", "login"];
  //determine the state by returtned data
  return (
    <div
      className={` absolute z-[10] flex w-[100vw] h-[100vh] pointer-events-none ${
        styles.loginBackground
      } } ${ChangePage === true && styles.fade}`}
    >
      <div className=" h-[50%]  w-[40%]  z-[5] absolute left-[10%] bg-[#ccc]/40 backdrop-blur rounded-3xl  overflow-hidden">
        <EmailEntry
          Email={Email}
          setEmail={setEmail}
          Page={screen}
          setScreen={setScreen}
        />
        <AccountSignUp Email={Email} Page={screen} />
        <AccountLogin Email={Email} Page={screen} />
        <div className="flex absolute bottom-10 w-full  h-[7%] justify-between">
          <button
            onClick={() => {
              let nextPage =
                screens.findIndex((val: any) => val === screen) - 1;
              setScreen(screens[nextPage]);
            }}
            className={`${styles.loginBackButton} ${
              screen === "email" || screen === "login"
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            } smooth`}
          >
            Back
          </button>

          <button
            onClick={() => {
              let nextPage =
                screens.findIndex((val: any) => val === screen) + 1;
              setScreen(screens[nextPage]);
            }}
            className={`${styles.loginButton}  smooth`}
          >
            Continue
          </button>
        </div>
      </div>
      <div
        className="relative left-[-20px] 
      z-[1] h-full w-[100%] 
    
      justify-center items-center flex"
      >
        <HiArrowUpRight
          onClick={() => setChangePage(false)}
          className={styles.backIcon}
        />

        {/* {/* <h3 className={styles.welcome}>Welcome</h3> */}
        <h3 className={styles.welcome2}>Welcome</h3>
      </div>
    </div>
  );
};

export default Login;
