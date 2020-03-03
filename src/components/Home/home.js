import React, { Component } from "react";
import NavBar from "./../NavBar/navBar";
import { connect, connectAdvanced } from "react-redux";
import axios from "axios";
import "./home.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: [],
      favorites: [],
      isDisplay: false
    };
  }
  componentDidMount() {
    this.getData();
  }

  getData() {
    axios
      .get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
      .then(resp => {
        console.log(resp.data);
        this.setState({ drinks: resp.data.drinks }, () => {
          console.log(this.state.drinks);
        });
      });
  }

  addToFavorites() {
    //will call API
  }

  removeFromFavorites() {
    //will call API
  }

  addDrink() {
    //will call API -- not needed?
  }

  viewMyFavorites = () => {
    this.setState({ isDisplay: true });
    //will call API
  };

  viewModal() {
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
  }

  mappedCocktails() {
    const { drinks } = this.state;
    console.log(drinks);
    return (
      drinks &&
      drinks.map((drink, index) => {
        return (
          <div class="card border-secondary mb-3">
            <div class="card-header">{drink.strDrink}</div>
            <div class="card-body">
              <img
                src={drink.strDrinkThumb}
                className="cocktail-image"
                alt="img"
              />
            </div>
            <div class="card-footer">
              <button
                type="button"
                class="btn btn-danger"
                onClick={() => {
                  this.removeFromFavorites(drink.idDrink);
                }}
              >
                Delete
              </button>
              <img
                src="https://toppng.com/uploads/preview/5-point-stars-png-star-icon-flat-11562958768wpf63hu4tq.png"
                onClick={() => {
                  this.addToFavorites(drink.idDrink);
                }}
                className="favorite-image"
                alt="img"
              />
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  this.addDrink(drink.idDrink);
                }}
              >
                Add
              </button>
            </div>
          </div>
        );
      })
    );
  }
  render() {
    const { isDisplay } = this.state;
    console.log(isDisplay);
    return (
      <div className="page">
        <div className="favorites-wrapper">
          <NavBar viewMyFavorites={this.viewMyFavorites} />
          {/* <h5
            className="favorites"
            onClick={() => {
              this.viewMyFavorites();
            }}
          >
            View my favorites
          </h5> */}
        </div>
        {isDisplay ? this.viewModal() : null}
        <div className="cocktails">{this.mappedCocktails()}</div>
      </div>
    );
  }
}

export default Home;
