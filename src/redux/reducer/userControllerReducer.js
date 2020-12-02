const initialState = {
  saving: false,
  loginIn: false,
  firebaseError: null,
  userId: null,
  token: null,
};

const reduce = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_USER_START":
      return {
        ...state,
        saving: true,
      };
    case "SIGNUP_USER_SUCCES":
      return {
        ...state,
        saving: false,
        userId: action.userId,
        token: action.token,
      };
    case "SIGNUP_USER_ERROR":
      return {
        ...state,
        saving: false,
        firebaseError: action.error.response.data.error.message,
      };
    case "LOGIN_USER_START":
      return {
        ...state,
        loginIn: true,
      };
    case "LOGIN_USER_SUCCES":
      return {
        ...state,
        loginIn: false,
        userId: action.userId,
        token: action.token,
      };
    case "LOGIN_USER_ERROR":
      return {
        ...state,
        loginIn: false,
        firebaseError: action.error.response.data.error.message,
      };
    case "LOGOUT":
      return {
        ...state,
        firebaseError: null,
        userId: null,
        token: null,
      };

    default:
      return state;
  }
};

export default reduce;
