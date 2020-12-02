import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import reportWebVitals from "./reportWebVitals";
import "./index.css";
import App from "./pages/App";
import burgerReducer from "./redux/reducer/burgerReducer";
import orderReducer from "./redux/reducer/orderReducer";
import signupReducer from "./redux/reducer/userControllerReducer";

const loggerMiddleware = (store) => {
  return (next) => {
    return (action) => {
      // console.log("loggerMiddleware ===> Dispatch", action);
      // console.log("loggerMiddleware : State BEFORE : ", store.getState());

      const result = next(action);
      // console.log("loggerMiddleware : State AFTER : ", store.getState());
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  burgerReducer,
  orderReducer,
  signupReducer,
});

const middleWares = [loggerMiddleware, thunk];

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleWares))
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
