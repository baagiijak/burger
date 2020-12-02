import React from "react";

import { Route } from "react-router-dom";
import { connect } from "react-redux";

import css from "./style.module.css";
import Burger from "../../components/Burger";
import Button from "../../components/General/Button";
import ContactData from "../../components/ContactData";

class ShippingPage extends React.Component {
  goBack = () => {
    this.props.history.goBack();
  };

  showContactData = () => {
    this.props.history.replace("/Ship/Contact");
  };

  render() {
    return (
      <div className={css.ShippingPage}>
        <p style={{ fontSize: "24px" }}>
          <strong>Таны захиалга амттай байх болно гэж найдаж байна...</strong>
        </p>
        <p style={{ fontSize: "24px" }}>
          <strong>Дүн : {this.props.price}₮</strong>
        </p>
        <Burger />
        <Button
          daragdsan={this.goBack}
          btnType={"Danger"}
          text="ЗАХИАЛГЫГ ЦУЦЛАХ"
        />
        <Button
          daragdsan={this.showContactData}
          btnType={"Succes"}
          text="ҮРГЭЛЖЛҮҮЛЭХ"
        />
        <Route path="/Ship/Contact">
          <ContactData />
        </Route>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerReducer.ingredients,
    price: state.burgerReducer.totalPrice,
  };
};

export default connect(mapStateToProps)(ShippingPage);
