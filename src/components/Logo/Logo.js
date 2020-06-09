import React from "react";
import burgerLogo from "../../assets/images/original.png";
import styles from "./Logo.module.css";

const logo = (props) =>(
    <div className={styles.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="logo"/>
    </div>
);

export default logo;
