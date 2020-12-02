import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import css from "./style.module.css";
import Button from "../../components/General/Button";
import * as actions from "../../redux/actions/loginActions";
import Spinner from "../../components/General/Spinner";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };

  Email = (e) => {
    this.setState({ email: e.target.value });
  };

  Password = (e) => {
    this.setState({ password: e.target.value });
  };

  Login = () => {
    this.props.login(this.state.email, this.state.password);
  };

  render() {
    return (
      <div className={css.Login}>
        {this.props.userId && <Redirect to="/orders" />}
        {this.props.loginIn ? (
          <Spinner />
        ) : (
          <div>
            <input onChange={this.Email} text="text" placeholder="Емэйл хаяг" />
            <input
              onChange={this.Password}
              type="password"
              placeholder="Нууц үг"
            />
            {this.props.firebaseError && (
              <div style={{ color: "red" }}>{this.props.firebaseError} </div>
            )}
            <Button text="НЭВТРЭХ" btnType="Succes" daragdsan={this.Login} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginIn: state.signupReducer.loginIn,
    firebaseError: state.signupReducer.firebaseError,
    userId: state.signupReducer.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(actions.loginUser(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
