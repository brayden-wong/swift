import Login from "@/components/auth/login";
import Background from "@/components/landing/background";
import LandingText from "@/components/landing/LandingText";
import Selection from "@/components/user-selection/selection";
import styles from "@/styles/landing.module.css";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import logo from "public/logo1.png";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function Home() {
  const [ChangePage, setChangePage] = useState(false);
  return (
    <>
      <Head>
        <title>SwiftHire</title>
      </Head>
      <div
        className={`${styles.header} ${
          ChangePage === true && "h-[0!important] overflow-hidden"
        } `}
      >
        <Image
          className={`${
            ChangePage === true ? " opacity-0 gohidden " : "topper opacity-100"
          } smooth`}
          src={logo}
          alt="logo"
        />
      </div>
      <div
        className={`${styles.content}  ${ChangePage === true && "opacity-0 "}`}
      >
        <Selection setChangePage={setChangePage} />
        <LandingText ChangePage={ChangePage} />
      </div>

      <Login ChangePage={ChangePage} setChangePage={setChangePage} />
    </>
  );
}
