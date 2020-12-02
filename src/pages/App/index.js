import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import css from "./style.module.css";
import Toolbar from "../../components/Toolbar";
import BurgerPage from "../BurgerPage";
import SideBar from "../../components/SideBar";
import OrderPage from "../OrderPage";
import ShippingPage from "../ShippingPage";
import LoginPage from "../LoginPage";
import SignUpPage from "../SignUpPage";
import Logout from "../../components/Logout/";
import * as actions from "../../redux/actions/loginActions";
import * as SignupActions from "../../redux/actions/signupActions";
import { bindActionCreators } from "redux";

class App extends Component {
  state = {
    showSidebar: false,
  };

  componentDidMount = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expireDate = new Date(localStorage.getItem("expireDate"));
    const refreshToken = localStorage.getItem("refreshToken");

    if (token) {
      if (expireDate > new Date()) {
        //hugatsaa ni duusagui token bna , autologin hii
        this.props.autoLogin(token, userId);
        // token huchingui bolohod uldej baigaa hugatsaag tootsoolj
        // ter hugatsaanii daraa automataar logout hiine
        this.props.autoLogoutAfterMillsec(
          expireDate.getTime() - new Date().getTime()
        );
      } else {
        // token hugatsaa ni duussan bindActionCreators, logout hii
        this.props.logOut();
      }
    }
  };

  toggleSideBar = () => {
    this.setState((prevState) => {
      return { showSidebar: !prevState.showSidebar };
    });
  };

  render() {
    return (
      <div>
        <Toolbar toggleSideBar={this.toggleSideBar} />
        <SideBar
          showSidebar={this.state.showSidebar}
          toggleSideBar={this.toggleSideBar}
        />
        <main className={css.content}>
          {this.props.userId ? (
            <Switch>
              <Route path="/logout" component={Logout} />
              <Route path="/orders" component={OrderPage} />
              <Route path="/Ship" component={ShippingPage} />
              <Route path="/" component={BurgerPage} />
            </Switch>
          ) : (
            <Switch>
              <Route path="/signup" component={SignUpPage} />
              <Route path="/login" component={LoginPage} />
              <Redirect to="login" />
            </Switch>
          )}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.signupReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    autoLogin: (token, userId) =>
      dispatch(actions.loginUserSucces(token, userId)),
    logOut: () => dispatch(SignupActions.logOut()),
    autoLogoutAfterMillsec: () =>
      dispatch(SignupActions.autoLogoutAfterMillsec()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
