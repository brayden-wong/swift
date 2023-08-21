import styles from "@/styles/landing.module.css";
import React from "react";
import {
  HiArrowUpRight,
  HiMagnifyingGlass,
  HiOutlineArrowRightOnRectangle,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineArrowUpOnSquare,
} from "react-icons/hi2";

const Selection = ({ setChangePage }: any) => {
  return (
    <div className={`${styles.userSelection}`}>
      <div
        onClick={() => {
          setChangePage(true);
        }}
        className={`${styles.selections} `}
      >
        <HiArrowUpRight/>
        <span className={`${styles.iconText}`}>Access</span>
      </div>
    </div>
  );
};

export default Selection;
