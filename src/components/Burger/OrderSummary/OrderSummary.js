import React, {Component} from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {

    render(){
        const ingrSummary = Object.keys(this.props.ingredients).map(
            (key)  =>{
                return <li key={key}><span style={{textTransform:'capitalize'}}>{key}</span>: {this.props.ingredients[key]}</li>
            }
        );
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>You ordered a burger with the following ingredients: </p>
                <ul>
                    {ingrSummary}
                </ul>
                <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType={"Danger"} clicked={this.props.cancel}>CANCEL</Button>
                <Button btnType={"Success"} clicked={this.props.continue}>CONTINUE</Button>
            </Aux>
        );
    }
}
export default OrderSummary;
