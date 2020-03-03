import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect} from 'react-redux'

import { logOut, getUser } from './../redux/reducers/authReducer'

class NavBar extends Component {

    handleClickLogout = () => {
        this.props.logOut()
    }

    render() {
        return (
            <nav style={{display: 'flex', justifyContent: 'space-evenly', border: '1px solid grey', width: '100%', boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 5px 0px', position: 'relative'}}>
                <ul style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '30vw' }}>
            
                    <Link to='/'><li onClick={this.handleClickLogout} style={{ listStyle: 'none', textDecoration: 'none' }}>Logout</li></Link>
                </ul>
                <h2>Welcome to the Cocktail App {this.props.user}</h2>
                <Link to="/favorites"><h5 >View My Favorites</h5></Link>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps, {
    logOut,
    getUser
})(NavBar);