import axios from "../../axios-orders";

export const loadOrders = (userId) => {
  return function (dispatch, getState) {
    dispatch(loadOrderStart());

    const token = getState().signupReducer.token;

    axios
      .get(`orders.json?&auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then((response) => {
        const loadedOrders = Object.entries(response.data).reverse();
        dispatch(loadOrderSucces(loadedOrders));
      })
      .catch((error) => dispatch(loadOrderError(error)));
  };
};

export const loadOrderStart = () => {
  return {
    type: "LOADER_ORDERS_START",
  };
};

export const loadOrderSucces = (loadedOrders) => {
  return {
    type: "LOADER_ORDERS_SUCCES",
    orders: loadedOrders,
  };
};
export const loadOrderError = (error) => {
  return {
    type: "LOADER_ORDERS_ERROR",
    error,
  };
};

// Захиалгыг хагдгална

export const saveOrder = (newOrder) => {
  return function (dispatch, getState) {
    dispatch(saveOrderStart());

    const token = getState().signupReducer.token;

    axios
      .post(`/orders.json?auth=${token}`, newOrder)
      .then((response) => dispatch(saveOrderSucces()))
      .catch((error) => dispatch(saveOrderError(error)));
    // .finally(() => {
    //   this.setState({ loader: false });
    //   this.props.history.replace("/orders");
    // });
  };
};

export const saveOrderStart = () => {
  return {
    type: "SAVE_ORDER_START",
  };
};

export const saveOrderSucces = () => {
  return {
    type: "SAVE_ORDER_SUCCES",
  };
};

export const saveOrderError = (error) => {
  return {
    type: "SAVE_ORDER_ERROR",
    error,
  };
};
