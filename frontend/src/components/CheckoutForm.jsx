import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";

class CheckoutForm extends React.Component {
  handleSubmit = async event => {
    event.preventDefault();

    const { stripe, elements } = this.props;
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result.token);
    }
  };

  render() {
     const buttonStyle = {
      backgroundColor: '#6772E5',
      color: 'white',
      padding: '8px 12px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '10px',
      marginBottom: '10px'
    };
    return (
        <div>
        <form onSubmit={this.handleSubmit}>
          <CardSection />
          <button disabled={!this.props.stripe} style={buttonStyle}>
            Book Now
          </button>
        </form>
      </div>
    );
  }
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}