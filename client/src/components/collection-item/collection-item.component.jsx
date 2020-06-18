import React from "react";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";
import CustomButton from "../custom-button/custom-button.component";
import "./collection-item.styles.scss";
import styled from "styled-components";

const ButtonInCollection = styled(CustomButton)`
  width: 80%;
  opacity: 0.85;
  position: absolute;
  top: 225px;
  /* display: none; */
`;

const CollectionItem = ({ item, addItemFunc }) => {
  const { name, price, imageUrl } = item;
  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <ButtonInCollection onClick={() => addItemFunc(item)} inverted>
        ADD TO CART
      </ButtonInCollection>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItemFunc: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
