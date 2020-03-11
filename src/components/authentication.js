import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateState,
  resetFields,
  registerUser,
  loginUser
} from "../redux/reducers/authReducer";



class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirect: false,
    };
  }
  handleChange = e => {
    this.props.updateState({ [e.target.name]: e.target.value });
  };
  
  handleClickRegister = () => {
    this.props
    .registerUser(this.props.username, this.props.password)
    .then(() => {
      this.props.loginUser(this.props.username, this.props.password);
    })
    .catch(error => {
      console.log(error);
    });
  };

  handleClickLogin = () => {
    this.props
      .loginUser(this.props.username, this.props.password)
      .then(() => {
       this.setState ({shouldRedirect: true})
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    if(this.props.user.id) {
      return <Redirect to = "/home" />
    }
    return (
      <div>
        <section>
          <br />
          <h2>Login</h2>
          <div>
            <p>Username</p>
            <input type="text" name="username" onChange={this.handleChange} />
            <p>Password</p>
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
            />
          </div>
          <br />
          {/* <Link to="/home"> */}
            <button onClick={this.handleClickLogin}>Login</button>
          {/* </Link> */}
        </section>
        <br />
        <section>
          <h2>Register</h2>
          <div>
            <p>Username</p>
            <input type="text" name="username" onChange={this.handleChange} />
            <p>Password</p>
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
            />
          </div>
          <br />
          <Link to="/home">
            <button onClick={this.handleClickRegister}>Register</button>
          </Link>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.authReducer.username,
    password: state.authReducer.password,
    user: state.authReducer.user
  };
};

export default connect(mapStateToProps, {
  updateState,
  resetFields,
  registerUser,
  loginUser
})(Authentication);
