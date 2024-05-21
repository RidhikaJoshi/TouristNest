import React from "react";
import { CardElement } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  style: {

    base: {
      color: "#303238",
      fontSize: "16px",
      fontFamily: "sans-serif",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#CFD7DF"
      }
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238"
      }
    }
  },
  hidePostalCode: true,
};

const cardSectionStyle = {
  margin: '10px 0',
  padding: '10px',
  border: '1px solid #ccd0d2',
  borderRadius: '4px',
  backgroundColor: 'white'
};

function CardSection() {
  return (
    <div style={cardSectionStyle}>
      <CardElement options={CARD_ELEMENT_OPTIONS}/>
    </div>
    
  );
}

export default CardSection;