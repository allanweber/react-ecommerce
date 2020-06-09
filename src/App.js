import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import "./App.css";
import Header from "./components/header/header.component";
import {
  auth,
  createUSerProfileDocument,
} from "./firebase/firebase.utils";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";
import CheckoutPage from "./pages/checkout/checkout.component";
import { selectShopCollections } from "./redux/shop/shop.selector";

class App extends Component {
  unsubscribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUserLocal } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUSerProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUserLocal({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUserLocal(null);
      }
    });

    //const collectionArray = Object.keys(collections).map(key => collections[key]);

    // addCollectionsAndItems(
    //   "collections",
    //   collectionArray.map(({ title, items }) => ({ title, items }))
    // );
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  redirectIfSignedIn = () => {
    return this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />;
  };

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route exact path="/signin" render={this.redirectIfSignedIn} />
        </Switch>
      </div>
    );
  }
}

const mapStateProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collections: selectShopCollections,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUserLocal: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateProps, mapDispatchToProps)(App);
