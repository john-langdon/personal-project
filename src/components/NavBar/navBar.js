import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./navBar.css";

import { logOut, getUser } from "../../redux/reducers/authReducer";

class NavBar extends Component {
  handleClickLogout = () => {
    this.props.logOut();
  };

  render() {
    return (
      <nav>
        <Link to="/" className="logOut">
          <p onClick={this.handleClickLogout}>Logout</p>
        </Link>
        {/* <h2 className="navBar">
          Welcome to the Cocktail App {this.props.user}
        </h2> */}
        {/* <Link to="/favorites" className="viewMyFavorites">
          <h5>View My Favorites</h5>
        </Link> */}
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  };
};

export default connect(mapStateToProps, {
  logOut,
  getUser
})(NavBar);
