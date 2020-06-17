import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import "./App.css";
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import { selectCurrentUser } from "./redux/user/user.selector";
import { checkUserSession } from "./redux/user/user.actions";

const App = ({ checkUserSessionFunc, currentUser }) => {
  useEffect(() => {
    checkUserSessionFunc();
  }, [checkUserSessionFunc]);

  const redirectIfSignedIn = () => {
    return currentUser ? <Redirect to="/" /> : <SignInAndSignUp />;
  };

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route exact path="/signin" render={redirectIfSignedIn} />
      </Switch>
    </div>
  );
};

const mapStateProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSessionFunc: () => dispatch(checkUserSession()),
});

export default connect(mapStateProps, mapDispatchToProps)(App);
