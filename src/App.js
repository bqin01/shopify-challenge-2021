import logo from './logo.svg';
import React from 'react';
import InteractiveCard from "./components/InteractiveCard.js";
import SearchBox from "./components/MovieSearch.js";
import Details from "./components/Details.js";
import Config from './config.json';
import './App.css';

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      hasDetails: false,
      data: null
    };
    this.updateDetails = this.updateDetails.bind(this);
  }
  async updateDetails(id)
  {
    var api_key = Config["API_KEY"];
    console.log(id);
    console.log(api_key);
    const url = `https://www.omdbapi.com/?i=${id}&apikey=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.setState({hasDetails: true, data: data});
  }
  render()
  {
    return (
      <div className = "container">
        <h1 className="app-header">
          Lorem Ipsum
        </h1>
        <p>Some more lorem ipsum</p>
        <div className="container">
          <div className = "row">
              <SearchBox
                updateDetails = {this.updateDetails}
              />
          </div>
          <Details
            toDisplay = {this.state.hasDetails}
            data = {this.state.data}
          />
        </div>
    </div>
    );
  }
}

export default App;
