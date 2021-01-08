import logo from './logo.svg';
import React from 'react';
import InteractiveCard from "./components/InteractiveCard.js";
import SearchBox from "./components/MovieSearch.js";
import Details from "./components/Details.js";
import Nominations from './components/Nominations.js';
import Config from './config.json';
import './App.css';

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      hasDetails: false,
      data: null,
      currentID: null,
      currentNominations: []
    };
    this.updateDetails = this.updateDetails.bind(this);
    this.addNomination = this.addNomination.bind(this);
    this.clearDetails = this.clearDetails.bind(this);
  }
  clearDetails()
  {
    this.setState({hasDetails: false, currentID: null});
  }
  async updateDetails(id)
  {
    var api_key = Config["API_KEY"];
    const url = `https://www.omdbapi.com/?i=${id}&apikey=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({hasDetails: true, data: data, currentID: id});
  }
  async addNomination(id)
  {
    var cNoms = Array.from(this.state.currentNominations);
    if (cNoms.length < 5){
      var api_key = Config["API_KEY"];
      const url = `https://www.omdbapi.com/?i=${id}&apikey=${api_key}`;
      const response = await fetch(url);
      const data = await response.json();
      cNoms.push({"imdbID": data["imdbID"], "ImgSrc": data["Poster"], "Title": data["Title"]});
      this.setState({currentNominations: cNoms});
    }
    console.log(this.state.currentNominations);
  }
  render()
  {
    return (
      <div className = "container">
        <h1 className = "app-header">
          Lorem Ipsum
        </h1>
        <p>Some more lorem ipsum</p>
        <div className="container">
          <div className = "d-flex flex-row-reverse row">
            <Nominations
              updateDetails = {this.updateDetails}
              currentNominations = {this.state.currentNominations}
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
          />
        </div>
    </div>
    );
  }
}

export default App;
