import React, { Component } from "react";
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

class App extends Component {
  componentDidMount() {
    const { checkUserSessionFunc } = this.props;
    checkUserSessionFunc();
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
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSessionFunc: () => dispatch(checkUserSession()),
});

export default connect(mapStateProps, mapDispatchToProps)(App);
