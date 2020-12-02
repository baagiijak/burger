const initialState = {
  // Load order
  orders: [],
  loader: false,
  error: null,
  //  save order
  newOrder: {
    saving: false,
    finished: false,
    error: null,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADER_ORDERS_START":
      return {
        ...state,
        loader: true,
      };
    case "LOADER_ORDERS_SUCCES":
      return {
        ...state,
        loader: false,
        orders: action.orders,
      };
    case "LOADER_ORDERS_ERROR":
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case "SAVE_ORDER_START":
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          saving: true,
        },
      };
    case "SAVE_ORDER_SUCCES":
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          saving: false,
          finished: true,
          error: null,
        },
      };
    case "SAVE_ORDER_ERROR":
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          saving: false,
          finished: true,
          error: action.error,
        },
      };

    default:
      return state;
  }
};

export default reducer;
