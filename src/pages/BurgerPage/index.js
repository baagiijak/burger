import React, { Component } from "react";

import Burger from "../../components/Burger";
import BuildControls from "../../components/BuildControls";
import Modal from "../../components/General/Modal";
import OrderSummary from "../../components/OrderSummery";
import Spinner from "../../components/General/Spinner";

class BurgerBuilder extends Component {
  state = {
    confirmOrder: false,
  };

  continueOrder = () => {
    this.props.history.push("/Ship");
  };

  showConfirmModal = () => {
    this.setState({ confirmOrder: true });
  };

  closeConfirmModal = () => {
    this.setState({ confirmOrder: false });
  };

  render() {
    return (
      <div>
        <Modal
          closeConfirmModal={this.closeConfirmModal}
          show={this.state.confirmOrder}
        >
          {this.state.loader ? (
            <Spinner />
          ) : (
            <OrderSummary
              closeConfirmModal={this.closeConfirmModal}
              onContinue={this.continueOrder}
            />
          )}
        </Modal>
        <Burger />
        <BuildControls showConfirmModal={this.showConfirmModal} />
      </div>
    );
  }
}

export default BurgerBuilder;
