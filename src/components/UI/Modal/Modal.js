import React, {Component} from "react";
import styles from "./Modal.module.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component{

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render(){
        return (
            <Aux>
                <Backdrop clicked={this.props.modalClosed} show={this.props.show}/>
                <div className={styles.Modal} style={{transform: this.props.show? 'translateY(0)':'translateY(-100vh)',
                    opacity:this.props.show ? '1':'0'}}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}
export default Modal;
