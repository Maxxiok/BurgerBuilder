import React from "react";
import styles from "./NavItems.module.css";
import NavItem from "./Item/NavItem";

const navItems = (props) => (
    <ul className={styles.NavItems}>
        <NavItem link="/" exact>Burger Builder</NavItem>
        {props.isAuth? <NavItem link="/orders">Orders</NavItem>:null}
        {!props.isAuth? <NavItem link="/auth">Sign In</NavItem>: <NavItem link="/logout">Log Out</NavItem>}
    </ul>
);

export default navItems;
