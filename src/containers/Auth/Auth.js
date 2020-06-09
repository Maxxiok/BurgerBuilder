import React, {Component} from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import styles from './Auth.module.css';
import {connect} from "react-redux";
import * as actionCreators from '../../store/actions/index';
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from 'react-router-dom';
import {updateObject, checkValidity} from "../../shared/utility";

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount() {
        if(!this.props.building&&this.props.authRedirect !== '/'){
            this.props.onPathSet();
        }
    }

    changeHandler = (event, inputId) => {
        const formData = updateObject(this.state.controls, {
            [inputId]: updateObject(this.state.controls[inputId],{
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[inputId].validation),
                touched: true
            })
        });
        this.setState({controls: formData});
    }

    submitHander = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            };
        })
    }

    render() {

        if (this.props.isAuth) {
            return <Redirect to={this.props.authRedirect}/>
        }

        const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElementsArray.map(formElement => (
            <Input key={formElement.id}
                   changed={(e)=>this.changeHandler(e,formElement.id)}
                   elementType={formElement.config.elementType}
                   elementConfig={formElement.config.elementConfig}
                   value={formElement.config.value}
                   invalid={!formElement.config.valid}
                   shouldValidate={formElement.config.validation}
                   touched={formElement.config.touched}/>
        ));

        let errorMsg = null;

        if(this.props.error){
            errorMsg = <p style={{'color':'red', 'font-weight': 'bold'}}>{this.props.error.message}</p>
        }

        return (
            <div className={styles.Auth}>
                {errorMsg}
                {
                    this.props.loading? <Spinner/>:
                        <React.Fragment>
                            <form onSubmit={this.submitHander}>
                                {form}
                                <Button btnType="Success">SUBMIT</Button>
                            </form>
                            <Button clicked={this.switchAuthModeHandler} btnType="Danger">SWITCH TO {this.state.isSignUp?'SIGN IN':'SIGN UP'}</Button>
                        </React.Fragment>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirect: state.auth.authRedirectPath
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
      onAuth: (email, password, signUp) => dispatch(actionCreators.auth(email, password, signUp)),
      onPathSet: () => dispatch(actionCreators.setAuthRedirect('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
