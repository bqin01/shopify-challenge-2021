import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import InteractiveCard from './InteractiveCard.js'
import SearchIcon from "../assets/search.svg"
import Config from '../config.json'

class SearchQuery extends React.Component
{
  render()
  {
    return (
        <div className="input-group md-form form-sm form-2 pl-0">
          <input className="form-control my-0 py-1" type="text" placeholder="Search" aria-label="Search" id = "text-query"></input>
          <div className="input-group-append" onClick = {this.props.handler}>
            <span className ="input-group-text amber lighten-3 height-cap"><img alt = "Search" src = {SearchIcon}
                aria-hidden="true" id = "search-icon"></img></span>
          </div>
        </div>
    );
  }
}

class SearchResults extends React.Component
{
  render()
  {
    if (this.props.hasQueried){
      if (this.props.queryResults["Response"] === "True")
      {
        var cards = [];
        this.props.queryResults["Search"].forEach((item) => {
          cards.push(
            <InteractiveCard
              title = {item["Title"]}
              key = {item["imdbID"]}
              imdbID = {item["imdbID"]}
              year = {item["Year"]}
              displayDetails = {this.props.updateDetails}
            />
          );
        });
        return (<div> {cards} </div>);
      }else{
         return (
            <div>
              <p>Your query returned no results for the following reason: {this.props.queryResults["Error"]} </p>
            </div>
          );
      }
    }else{
        return null;
    }
  }
}

class SearchBox extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = ({hasQueried: false, query: "", queryResults: ""});
    this.beginSearch = this.beginSearch.bind(this);
  }
  async beginSearch()
  {
    const query = document.getElementById("text-query").value;
    if(query.length > 0){
      var api_key = Config["API_KEY"];
      const url = `https://www.omdbapi.com/?s=${encodeURI(query)}&type=movie&apikey=${api_key}`; //API KEY LEAK BEWARE
      const response = await fetch(url);
      const data = await response.json();
      this.setState({hasQueried: true, query: query, queryResults: data});
    }
  }
  render()
  {
    return (
      <div>
        <SearchQuery handler = {this.beginSearch}/>
        <SearchResults
          hasQueried = {this.state.hasQueried}
          query = {this.state.query}
          queryResults = {this.state.queryResults}
          updateDetails = {this.props.updateDetails}
        />
      </div>
    );
  }
}

export default SearchBox;
