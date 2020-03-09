import React, { Component } from "react";
import NavBar from "./../NavBar/navBar";
import { connect, connectAdvanced } from "react-redux";
import axios from "axios";
import { Link } from 'react-router-dom';
import { updateFavorites } from '../../redux/reducers/favorites';
import "./home.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: [],
      favorites: [],
      favoriteDrinks: [],
      isFavoriteDisplay: false
    };
  }
  componentDidMount() {
    this.getData();
  }

  getData() {
    axios
      .get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
      .then(resp => {
        // console.log('get request, ', resp.data);
        this.setState({ drinks: resp.data.drinks }, () => {
          this.mappedCocktails(this.state.drinks)
        });
      });
      // console.log("getData");
      // axios
      // .post("/api/favorites",{
      //   body: {
      //     cocktail_id: 1
      //   }
      // })
      // .then(resp => {
      //   console.log(resp.data);
      //   this.setState({ drinks: resp.data.drinks }, () => {
      //     console.log(this.state.drinks);
      //   });
      // });
  }

  addToFavorites(drink) {
    console.log(drink)
    // let {favorites} = this.state;
    axios.post(`/api/favorites/`,{drink_id: drink.idDrink})
    .then((res)=>{
      console.log("Added");
    })
}
  removeFromFavorites(id) {
    const {favorites} = this.state;
    axios.delete(`/api/favorites/${id}`)
    .then((res)=>{
      this.setState({
        favorites : res
      })
    })
  this.setState({favorites});
  }

  viewMyFavorites = () => {
    const {drinks} = this.state;

    axios.get(`/api/favorites/`)
    .then((res)=>{
      console.log(res)

      const drinkIds = res.data.filter(drink => drink.drink_id).map(drink => drink.drink_id)

      // console.log(drinkIds)

      const favDrinksDetails = [];

      // drinkIds.forEach(drinkId => {
      //   axios
      //     .get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
      //     .then(res => favDrinksDetails.push(res.data.drinks[0]))
      // })
      Promise.all(drinkIds.map(val => axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${val}`))).then(response => {
        console.log(response);
        this.props.updateFavorites(response.map(val => val.data.drinks[0]));
      })
      // console.log(favDrinksDetails);

      // if(res.data.cocktail_id === drinks.idDrink)
      // this.setState({
      //   favorites : res.data,
      //   isFavoriteDisplay: true
      // })
    })
    // .then(() => {
    //   for (var i = 0; i < drinks.length; i++) {
    //     for (var j = 0; j < favorites.length; j++) {
    //         if (drinks[i].idDrink === favorites[j].drink_id) {
    //           console.log(drinks[i])
    //           const newFav = [...this.state.favoriteDrinks, drinks[i]]
    //           this.setState({favoriteDrinks: newFav})
    //         }
    //     }
    // }
    // })
    // return(
      // this.mappedCocktails(favorites)
    // );
  };

  backToHome(){
    this.setState({isFavoriteDisplay:false})
  }

  mappedCocktails(array) {
    console.log(array)
    const {drinks} = this.state;
  

    for (let i = 0; i < drinks.length; i++) {
      for (let j = 0; j < array.length; j++) {
          if ( array[j].drink_id === drinks[i].idDrink) {
            const newFav = [...this.state.favoriteDrinks, drinks[i]]
            this.setState({favoriteDrinks: newFav})
          }
      }
    }
  }
    

    // return (
  //     array &&
  //     array.map((drink) => {
  //       // console.log(drink)
  //       return (
  //         <div class="card border-secondary mb-3">
  //           <div class="card-header">{drink.strDrink}</div>
  //           <div class="card-body">
  //             <img
  //               src={drink.strDrinkThumb}
  //               className="cocktail-image"
  //               alt="img"
  //             />
  //           </div>
  //           {
  //             !isFavoriteDisplay ?
  //           <div class="card-footer">
  //             <button
  //               type="button"
  //               class="btn btn-danger"
  //               onClick={() => {
  //                 this.removeFromFavorites(drink.idDrink);
  //               }}
  //             >
  //               Delete
  //             </button>
  //             <button
  //               type="button"
  //               class="btn btn-primary"
  //               onClick={() => {
  //                 this.addToFavorites(drink);
  //               }}
  //             >
  //               Add
  //             </button>
  //           </div>
  //           :
  //           null
  //           }
  //         </div>
  //       );
  //     })
  //   );
  // }
  render() {
    // console.log(this.state)
    const { isFavoriteDisplay, drinks, favoriteDrinks } = this.state;
    // console.log(favoriteDrinks)
    // const mappedFavoriteDrinks = favoriteDrinks && favoriteDrinks.map((val, i) => {
    //   return (
        
    //   )
    // })

    const drinksMapped = drinks && drinks.map((drink, i) => {
      // console.log(drink)
      return (
        <div key={i} class="card border-secondary mb-3">
          <div class="card-header">{drink.strDrink}</div>
          <div class="card-body">
            <img
              src={drink.strDrinkThumb}
              className="cocktail-image"
              alt="img"
            />
          </div>
          {
            !isFavoriteDisplay ?
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
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => {
                this.addToFavorites(drink);
              }}
            >
              Add
            </button>
          </div>
          :
          null
          }
        </div>
      );
    });

    return (
      <div className="page">
        {
          isFavoriteDisplay ?
          <div>
                <button
                type="button"
                class="btn btn-primary"
                onClick={() => this.backToHome()}
              >
                Back To Home
              </button>
            {/* <div className="cocktails">{this.mappedCocktails(favorites)}</div> */}
            {/* <div className="cocktails">{this.mappedCocktails(favorites)}</div> */}
          </div>
          :
          <div>
          <div className="favorites-wrapper">
            {/* <NavBar viewMyFavorites={this.viewMyFavorites} /> */}
            <Link to='/favorites'>
              <h5
                className="favorites"
                onClick={this.viewMyFavorites}
              >
                View my favorites
              </h5>
            </Link>
          </div>
        {/* <div className="cocktails">{this.mappedCocktails(drinks)}</div> */}
        <div className="cocktails">{drinksMapped}</div>
        </div>
        }
      </div>
    );
  }
}

export default connect(null, { updateFavorites })(Home);
