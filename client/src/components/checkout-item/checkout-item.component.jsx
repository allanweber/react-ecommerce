import React from "react";
import "./checkout-item.styles.scss";
import { connect } from "react-redux";
import {
  clearItemFromCart,
  addItem,
  removeItem,
} from "../../redux/cart/cart.actions";

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const clearItemFunc = () => {
    clearItem(cartItem);
  };

  const addItemFunc = () => {
      addItem(cartItem);
  }

  const removeItemFunc = () => {
    removeItem(cartItem);
}

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img alt="item" src={imageUrl} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemFunc}>&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemFunc}>&#10095;</div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={clearItemFunc}>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
