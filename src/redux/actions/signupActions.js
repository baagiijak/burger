import axios from "axios";

export const signupUser = (email, password) => {
  return function (dispatch) {
    dispatch(signupUserStart());

    const data = {
      email,
      password,
      returnSecureToken: true,
    };

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBck9KbnBY480YYz9eQNgl-QAvDhUBBQi8",
        data
      )
      .then((result) => {
        const token = result.data.idToken;
        const userId = result.data.localId;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);

        dispatch(signupUserSucces(token, userId));
      })
      .catch((error) => {
        dispatch(signupUserError(error));
      });
  };
};
export const signupUserStart = () => {
  return {
    type: "SIGNUP_USER_START",
  };
};
export const signupUserSucces = (token, userId) => {
  return {
    type: "SIGNUP_USER_SUCCES",
    token,
    userId,
  };
};
export const signupUserError = (error) => {
  return {
    type: "SIGNUP_USER_ERROR",
    error,
  };
};

export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expireDate");
  localStorage.removeItem("refreshToken");
  return {
    type: "LOGOUT",
  };
};

export const autoLogoutAfterMillsec = (ms) => {
  return function (dispatch) {
    setTimeout(() => {
      dispatch(logOut());
    }, ms);
  };
};
