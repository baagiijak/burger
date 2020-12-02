import axios from "axios";

import * as actions from "../actions/signupActions";

export const loginUser = (email, password) => {
  return function (dispatch) {
    dispatch(loginUserStart());

    const data = {
      email,
      password,
      returnSecureToken: true,
    };

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBck9KbnBY480YYz9eQNgl-QAvDhUBBQi8",
        data
      )
      .then((result) => {
        const token = result.data.idToken;
        const userId = result.data.localId;
        const expireIn = result.data.expireIn;
        const expireDate = new Date(new Date().getTime + expireIn * 1000);
        const refreshToken = result.data.refreshToken;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("expireDate", expireDate);
        localStorage.setItem("refreshToken", refreshToken);

        dispatch(loginUserSucces(token, userId));
        dispatch(actions.autoLogoutAfterMillsec(expireIn * 1000));
      })
      .catch((error) => {
        dispatch(loginUserError(error));
      });
  };
};
export const loginUserStart = () => {
  return {
    type: "LOGIN_USER_START",
  };
};
export const loginUserSucces = (token, userId) => {
  return {
    type: "LOGIN_USER_SUCCES",
    token,
    userId,
  };
};
export const loginUserError = (error) => {
  return {
    type: "LOGIN_USER_ERROR",
    error,
  };
};
