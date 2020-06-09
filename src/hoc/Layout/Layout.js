import React, {Component} from "react";
import Aux from "../Auxiliary/Auxiliary";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {connect} from 'react-redux';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState)=>{return({showSideDrawer:!prevState.showSideDrawer})});
    }

   render(){
       return(
           <Aux>
               <Toolbar isAuth={this.props.isAuth} drawerToggleClicked={this.sideDrawerToggleHandler}/>
               <SideDrawer isAuth={this.props.isAuth} closed={this.sideDrawerCloseHandler} open={this.state.showSideDrawer}/>
               <main className={styles.Content}>
                   {this.props.children}
               </main>
           </Aux>
       );
   }
}

const mapStateToProps = state => {
    return {
      isAuth: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(Layout);
