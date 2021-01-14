import React from 'react';
import Cookies from 'universal-cookie';
import logo from './logo.svg';
import InteractiveCard from "./components/InteractiveCard.js";
import SearchBox from "./components/MovieSearch.js";
import Details from "./components/Details.js";
import Nominations from './components/Nominations.js';
import NomPopup from './components/NomPopup.js';
import './App.css';
import './NominationResp.css';


class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.cookies = new Cookies();
    this.state = {
      checkPopup: false,
      hasDetails: false,
      data: null,
      currentID: null,
      currentNominations: []
    };
    this.endOfDoc = React.createRef();
    this.updateDetails = this.updateDetails.bind(this);
    this.addNomination = this.addNomination.bind(this);
    this.clearDetails = this.clearDetails.bind(this);
    this.removeNomination = this.removeNomination.bind(this);
    this.setNominations = this.setNominations.bind(this);
    this.unPopup = this.unPopup.bind(this);
  }
  unPopup()
  {
    this.setState({checkPopup: true});
  }
  clearDetails()
  {
    this.setState({hasDetails: false, currentID: null});
  }
  async updateDetails(id)
  {
    this.unPopup();
    if (id){
      var api_key = process.env.REACT_APP_API_KEY;
      const url = `https://www.omdbapi.com/?i=${id}&apikey=${api_key}`;
      const response = await fetch(url);
      const data = await response.json();
      this.setState({hasDetails: true, data: data, currentID: id});
    }else{
      this.setState({hasDetails: false, data: null, currentID: null});
    }
  }
  async addNomination(id)
  {
    this.unPopup();
    var cNoms = Array.from(this.state.currentNominations);
    if (cNoms.length < 5){
      var api_key = process.env.REACT_APP_API_KEY;
      const url = `https://www.omdbapi.com/?i=${id}&apikey=${api_key}`;
      const response = await fetch(url);
      const data = await response.json();
      cNoms.push({"imdbID": data["imdbID"], "ImgSrc": data["Poster"], "Title": data["Title"]});
      this.setState({currentNominations: cNoms});
      this.cookies.set("noms_index_" + (cNoms.length - 1), id);
      this.cookies.set("num_noms", cNoms.length);
    }
  }
  removeNomination(id)
  {
    this.unPopup();
    var cNoms = Array.from(this.state.currentNominations);
    var newNoms = [];
    var newCookies = [];
    for (const movie of cNoms)
    {
      if(movie["imdbID"] !== id)
      {
        newNoms.push(movie);
        this.cookies.set("noms_index_" + (newNoms.length - 1), movie["imdbID"]);
      }
    }
    this.cookies.set("num_noms",newNoms.length);
    this.cookies.remove("noms_index_" + (newNoms.length));
    this.setState({currentNominations: newNoms});
  }
  async setNominations(arr)
  {
    this.unPopup();
    var cNoms = [];
    for (var i = 0; i < 5; i++) this.cookies.remove("noms_index_"+i);
    this.cookies.set("num_noms",0);
    for (const cookie_id in arr){
      var api_key = process.env.REACT_APP_API_KEY;
      const url = `https://www.omdbapi.com/?i=${arr[cookie_id]}&apikey=${api_key}`;
      const response = await fetch(url);
      const data = await response.json();
      cNoms.push({"imdbID": data["imdbID"], "ImgSrc": data["Poster"], "Title": data["Title"]});
      this.cookies.set("noms_index_" + (cNoms.length - 1), arr[cookie_id]);
      this.cookies.set("num_noms", cNoms.length);
    }
    this.setState({currentNominations: cNoms});
  }

  render()
  {
    return (
      <div className = "container">
        <NomPopup
            checkRender = {this.state.checkPopup}
            cookies = {this.cookies}
            setNominations = {this.setNominations}
            unPopup = {this.unPopup}
        />
      <div className = "nomination-intro-text">
        <h1 className = "app-header">
        👑 The 2021 Shoppies 🎥
        </h1>
        <h5 className = "app-desc">The Shoppies are back and the competition is as fierce as ever! Get your nominations in!</h5>
        <div class = "div-line"></div>
      </div>
        <div className="container">
          <div className = "d-flex flex-row-reverse row">
            <Nominations
              updateDetails = {this.updateDetails}
              currentNominations = {this.state.currentNominations}
              removeNomination = {this.removeNomination}
            />
            <SearchBox
              updateDetails = {this.updateDetails}
              addNomination = {this.addNomination}
              clearDetails = {this.clearDetails}
              currentSelection = {this.state.currentID}
              currentNominations = {this.state.currentNominations}
            />
          </div>
          <Details
            addNomination = {this.addNomination}
            currentNominations = {this.state.currentNominations}
            toDisplay = {this.state.hasDetails}
            data = {this.state.data}
            removeNomination = {this.removeNomination}
            updateDetails = {this.updateDetails}
          />
        </div>
    </div>
    );
  }
}

export default App;
