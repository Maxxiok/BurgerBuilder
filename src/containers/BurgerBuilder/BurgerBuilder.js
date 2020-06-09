import React,{Component} from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import Controls from "../../components/Burger/Controls/Controls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from 'react-redux';
import * as actionCreators from "../../store/actions/index";

export class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.ingredientsInit();
    }

    updatePurchaseState =  (ingreds) => {
        const ingred = {
            ...ingreds
        }
        const sum = Object.keys(ingred).map(ingKey=>{
           return ingred[ingKey];
        }).reduce(
            (sum,el)=>{
                return sum+el;
            },0);
        return sum>0;
    }

    purchaseHandler = () =>{
        if(this.props.isAuth){
            this.setState({purchasing:true});
        } else {
            this.props.onSetRedirect('/checkout');
            this.props.history.push('/auth');
        }

    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onPurchInit();
        this.props.history.push({
            pathname: '/checkout',
        });
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }
        let orderSummary = null;

        let burger = this.props.error?<p>Error fetching data</p>:<Spinner/>;
        if(this.props.ings){
            burger = (<Aux><Burger ingredients = {this.props.ings}/>
                <Controls totalPrice = {this.props.prc}
                          disabled={disabledInfo}
                          ingrAdded = {this.props.addIngredient}
                          ingrRemoved={this.props.removeIngredient}
                          purchasable={this.updatePurchaseState(this.props.ings)}
                          isAuth={this.props.isAuth}
                          order={this.purchaseHandler}/></Aux>);
            orderSummary = <OrderSummary totalPrice={this.props.prc}
                                         continue={this.purchaseContinueHandler}
                                         cancel={this.purchaseCancelHandler}
                                         ingredients={this.props.ings}/>;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        prc: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredient: (ingr)=> {dispatch(actionCreators.addIngredient(ingr))},
        removeIngredient: (ingr)=>{dispatch(actionCreators.removeIngredient(ingr))},
        ingredientsInit: () => (dispatch(actionCreators.initIngredients())),
        onPurchInit: () => dispatch(actionCreators.purchaseInit()),
        onSetRedirect: (path) => dispatch(actionCreators.setAuthRedirect(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
