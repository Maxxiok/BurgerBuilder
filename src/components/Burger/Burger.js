import React from "react";
import styles from "./Burger.module.css";
import Ingredient from "./Ingredient/Ingredient";

const burger = (props) =>{

    let tIngr = Object.keys(props.ingredients).map(
        igKey => {
            return [...Array(props.ingredients[igKey])].map(
                (_,i)=>{
                    return <Ingredient key={igKey+i} type={igKey}/>
                }
            )
        }
    ).reduce((arr, el)=>{
        return arr.concat(el);
    }, []);
    if (tIngr.length === 0){
        tIngr = <p>Please start adding ingredients</p>
    }
    return (
    <div className={styles.Burger}>
        <Ingredient type="bread-top"/>
        {tIngr}
        <Ingredient type="bread-bottom"/>
    </div>
    );
};

export default burger;
