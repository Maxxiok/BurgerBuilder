import React from "react";
import styles from "./Control.module.css";

const control = (props) => {
    return(
        <div className={styles.Control}>
            <div className={styles.Label}>{props.label}</div>
            <button className={styles.More} onClick={props.added}>More</button>
            <button className={styles.Less} onClick={props.removed} disabled={props.disabled}>Less</button>
        </div>
    );
};

export default control;
