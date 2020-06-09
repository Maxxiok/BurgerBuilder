import React from "react";
import styles from "./Controls.module.css";
import Control from "./Control/Control";

const ctrls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const controls = (props) => {
    return (
        <div className={styles.Controls}>
            <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            {
                ctrls.map((ctrl)=>{
                   return <Control key={ctrl.label}
                                   label={ctrl.label}
                                    added={() => props.ingrAdded(ctrl.type)}
                                    removed={() => props.ingrRemoved(ctrl.type)}
                                    disabled={props.disabled[ctrl.type]}/>
                })
            }
            <button onClick={() => props.order()} className={styles.OrderButton} disabled={!props.purchasable}>{props.isAuth?'ORDER NOW':'SIGN UP TO ORDER'}</button>
        </div>
    );
};

export default controls;
