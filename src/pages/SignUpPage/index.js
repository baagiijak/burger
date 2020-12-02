import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import css from "./style.module.css";
import Button from "../../components/General/Button";
import * as actions from "../../redux/actions/signupActions";
import Spinner from "../../components/General/Spinner";

class SignUpPage extends React.Component {
  state = {
    email: "",
    password: "",
    repassword: "",
    error: "",
  };

  Email = (e) => {
    this.setState({ email: e.target.value });
  };

  Password = (e) => {
    this.setState({ password: e.target.value });
  };

  RePassword = (e) => {
    this.setState({ repassword: e.target.value });
  };

  SignUp = () => {
    if (this.state.password === this.state.repassword) {
      this.props.signupUser(this.state.email, this.state.password);
    } else {
      this.setState({ error: "Нууц үг таарахгүй байна." });
    }
  };

  render() {
    return (
      <div className={css.SignUp}>
        {this.props.userId && <Redirect to="/" />}
        {this.props.saving ? (
          <Spinner />
        ) : (
          <div>
            <input onChange={this.Email} type="text" placeholder="Емэйл хаяг" />
            <input
              onChange={this.Password}
              type="password"
              placeholder="Нууц үг"
            />
            <input
              onChange={this.RePassword}
              type="password"
              placeholder="Нууц үгээ давт"
            />
            {this.state.error && (
              <div style={{ color: "red" }}>{this.state.error}</div>
            )}
            {this.props.firebaseError && (
              <div style={{ color: "red" }}>{this.props.firebaseError}</div>
            )}
            <Button
              text="БҮРТГҮҮЛЭХ"
              btnType="Succes"
              daragdsan={this.SignUp}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.signupReducer.userId,
    firebaseError: state.signupReducer.firebaseError,
    saving: state.signupReducer.saving,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signupUser: (email, password) =>
      dispatch(actions.signupUser(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
