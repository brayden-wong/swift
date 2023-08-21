import Selection from "@/components/user-selection/selection";
import React from "react";
import styles from "@/styles/landing.module.css";
const Background = ({ ChangePage }: any) => {
  return (
    <div className="container">
     
      <div className={styles.topRightCurve}>
        <Selection />
      </div>
    </div>
  );
};

export default Background;
