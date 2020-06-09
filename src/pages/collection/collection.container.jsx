import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectIsCollectionLoaded } from "../../redux/shop/shop.selector";
import CollectionPage from "./collection.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { compose } from "redux";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsCollectionLoaded(state),
});

const CollectionContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage);

export default CollectionContainer;
