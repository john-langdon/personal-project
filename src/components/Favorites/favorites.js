import React, { Component } from 'react';
// import NavBar from '../navBar';
// import { connect, connectAdvanced } from 'react-redux';
// import axios from 'axios';
// import '.favorites.scss';

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drinks: [],
            favorites: [],
            isDisplay: false
        };
    }
    componentDidMount() {
    }

    viewModal = () => {
        console.log("model displayed")
      return (
        <div class="modal">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Modal title</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>Modal body text goes here.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }



    render() {
        // const {isDisplay} = this.state;
        // console.log(isDisplay)
        return (
          <div className="page">
            <h1>Your Favorites Route</h1>
          </div>
        );
      }
    }

    
export default Favorites;