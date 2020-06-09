import React, {Component} from 'react';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Route, Switch} from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asynchComponent from "./hoc/asynchComponent";

const OrderComponent = asynchComponent(() => {
    return import('./containers/Orders/Orders');
});

const CheckoutComponent = asynchComponent(() => {
    return import('./containers/Checkout/Checkout');
});

const AuthComponent = asynchComponent(() => {
    return import('./containers/Auth/Auth');
});

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSign();
    }

    render() {

        let routes = (
            <Switch>
                <Route path="/auth" component={AuthComponent}/>
                <Route path="/" component={BurgerBuilder}/>
            </Switch>
        );

        if (this.props.isAuth){
            routes = (
                <Switch>
                    <Route path="/checkout" component={CheckoutComponent}/>
                    <Route path="/orders" component={OrderComponent}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/auth" component={AuthComponent}/>
                    <Route path="/" component={BurgerBuilder}/>
                </Switch>
            );
        }

        return (
            <div>
                <Layout>
                   {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSign: () => dispatch(actions.authCheckState())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
