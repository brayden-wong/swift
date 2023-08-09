import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/landing.module.css";
import logo from "public/logo.png";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
export default function Home() {
  return (
    <>
      <Head>
        <title>SwiftConnect - Feed</title>
      </Head>
      <div className={styles.header}>
        <Image src={logo} width={200} height={50} alt="logo" />
        <div className={styles.links}>
          <Link href="/auth/login">Login</Link>
        </div>
      </div>
      <div className={styles.content}>
        <input
          placeholder="Job title,key word"
          className={styles.input}
          type="text"
        />
        <BsSearch className={styles.icon} />
      </div>
    </>
  );
}
