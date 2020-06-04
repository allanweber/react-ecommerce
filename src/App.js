import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUSerProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

class App extends Component {
  unsubscribeFromAuth = null;
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      const { setCurrentUserLocal } = this.props;

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
          <Route exact path="/signin" render={this.redirectIfSignedIn} />
        </Switch>
      </div>
    );
  }
}

const mapStateProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUserLocal: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateProps, mapDispatchToProps)(App);
