import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import { fetchCollectionsStart } from "../../redux/shop/shop.action";
import CollectionContainer from "../collection/collection.container";

const ShopPage = ({ fetchCollectionsStartFunc, match }) => {
  useEffect(() => {
    fetchCollectionsStartFunc();
  }, [fetchCollectionsStartFunc]);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionContainer}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartFunc: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
