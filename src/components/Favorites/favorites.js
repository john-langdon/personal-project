import React, { Component } from "react";
import NavBar from "../NavBar/navBar";
import { connect } from "react-redux";
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
    // console.log(this.props);
  }

  viewModal = () => {
    console.log("model displayed");
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
  };

  backToHome(){
    this.setState({isFavoriteDisplay:false})
  }
  render() {
    // const {isDisplay} = this.state;
    console.log("rendered", this.props.favorites);
    const mappedFavs = this.props.favorites.map((drink, i) => {
      return (
        <div className="favorites" key={i}>
          <p style={{ color: "white" }}>{drink.strDrink}</p>
          <img src={drink.strDrinkThumb} />>
        </div>
      
      
      );  
    });
    
  

    return (
      <div className="page">
        {/* <NavBar /> */}
        <div>
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => this.backToHome()}
          >
            Back To Home
          </button>
        </div>

        <h1>Your Favorites Route -- Cocktails display here</h1>
        {mappedFavs}
      </div>
    );
  }
}

const mapStateToFavorites = reduxState => {
  console.log("mapped");
  return {
    favorites: reduxState.favorites.favorites
  };
};

export default connect(mapStateToFavorites)(Favorites);
