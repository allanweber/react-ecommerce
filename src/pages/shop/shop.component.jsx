import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.action";
import CollectionContainer from "../collection/collection.container";

class ShopPage extends Component {
  componentDidMount() {
    const { fetchCollectionsStartAsyncFunc } = this.props;
    fetchCollectionsStartAsyncFunc();
  }

  render() {
    const { match } = this.props;
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
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsyncFunc: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
