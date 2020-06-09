import React from "react";
import styles from './Order.module.css';

const order = (props) => {

    const ingrs = [];

    for(let ingr in props.ingredients){
        ingrs.push({name: ingr, amount:props.ingredients[ingr]});
    }

    const ingrOut = ingrs.map(
        ig=>{
            return <span style={{textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #ccc', padding: '5px'}}
                         key={ig.name}>{ig.name} ({ig.amount})</span>
        }
    );

    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingrOut}</p>
            <p>Price <strong>{props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default order;
