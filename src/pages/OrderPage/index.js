import React from "react";
import { connect } from "react-redux";

import css from "./style.module.css";
import axios from "../../axios-orders";
import Spinner from "../../components/General/Spinner";
import Order from "../../components/Order";
import * as actions from "../../redux/actions/orderActions";

class OrderPage extends React.Component {
  state = {
    orders: [],
    loader: false,
  };

  componentDidMount() {
    this.props.loadOrders(this.props.userId);
    // this.setState({ loader: true });
  }

  render() {
    // console.log("============", JSON.stringify(this.state.orders));
    return (
      <div className={css.OrderPage}>
        {this.props.loader ? (
          <Spinner />
        ) : (
          this.props.orders.map((el) => <Order key={el[0]} order={el[1]} />)
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orderReducer.orders,
    loader: state.orderReducer.loader,
    userId: state.signupReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadOrders: (userId) => dispatch(actions.loadOrders(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
