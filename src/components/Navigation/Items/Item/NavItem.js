import React from "react";
import styles from "./NavItem.module.css";
import {NavLink} from "react-router-dom";

const navItem = (props) => (
    <li className={styles.NavItem}><NavLink activeClassName={styles.active} to={props.link} exact={props.exact}>{props.children}</NavLink></li>
);

export default navItem;
