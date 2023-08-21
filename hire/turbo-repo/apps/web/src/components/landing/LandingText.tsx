import styles from "@/styles/landing.module.css";
import React from "react";

const LandingText = ({ ChangePage }: any) => {
  return (
    <div
      className={`${styles.landingTextContent}  ${
        ChangePage === true && styles.move
      }`}
    >
      <div className={styles.landingTextBox}>
        <h1 className={styles.landingTextBold}>HIRING/FOR HIRE?</h1>
        <p className={styles.landingTextLightSmall}>
          Seamlessly Secure Your Dream Tech Role or Discover the Perfect Tech
          Talent for Hire - Your Pathway to Success in the Tech World!
        </p>
        <button className={styles.landingButton}>Learn More?</button>
      </div>
    </div>
  );
};

export default LandingText;
