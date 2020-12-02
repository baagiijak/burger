import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";

import css from "./style.module.css";
import Button from "../General/Button";
import axios from "../../axios-orders";
import Spinner from "../General/Spinner";
import * as actions from "../../redux/actions/orderActions";

class ContactData extends React.Component {
  state = {
    name: null,
    city: null,
    street: null,
  };

  componentDidUpdate() {
    if (
      this.props.newOrderStatus.finished &&
      !this.props.newOrderStatus.error
    ) {
      this.props.history.replace("/orders");
    }
  }

  saveOrder = (props) => {
    const newOrder = {
      userId: this.props.userId,
      orts: this.props.ingredients,
      dun: this.props.price,
      hayag: {
        name: this.state.name,
        street: this.state.street,
        city: this.state.city,
      },
    };

    this.props.saveOrderAction(newOrder);

    // this.setState({ loader: true });
  };

  changeName = (e) => {
    this.setState({ name: e.target.value });
  };

  changeStreet = (e) => {
    this.setState({ street: e.target.value });
  };

  changeCity = (e) => {
    this.setState({ city: e.target.value });
  };

  render() {
    return (
      <div className={css.ContactData}>
        <p>Дүн : {this.props.price}₮</p>
        <div>
          {this.props.newOrderStatus.error &&
            `Захиалгыг хадгалах явцад алдаа гарлаа : ${this.props.newOrderStatus.error}`}
        </div>
        {this.props.newOrderStatus.saving ? (
          <Spinner />
        ) : (
          <div>
            <input
              onChange={this.changeName}
              type="text"
              name="name"
              placeholder="ТАНЫ НЭР"
            />
            <input
              onChange={this.changeStreet}
              type="text"
              name="street"
              placeholder="ТАНЫ ГЭРИЙН ХАЯГ"
            />
            <input
              onChange={this.changeCity}
              type="text"
              name="city"
              placeholder="ТАНЫ ХОТ"
            />
            <Button
              btnType={"Succes"}
              text="ИЛГЭЭХ"
              daragdsan={this.saveOrder}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerReducer.ingredients,
    price: state.burgerReducer.totalPrice,
    newOrderStatus: state.orderReducer.newOrder,
    userId: state.signupReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveOrderAction: (newOrder) => dispatch(actions.saveOrder(newOrder)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactData));
