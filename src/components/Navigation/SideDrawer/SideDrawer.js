import React from "react";
import Logo from "../../Logo/Logo";
import NavItems from "../Items/NavItems";
import styles from"./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

const sideDrawer = (props) => {

    let attachedClasses = [styles.SideDrawer, styles.Close];
    if (props.open ===true){
        attachedClasses = [styles.SideDrawer, styles.Open]
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={styles.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;
