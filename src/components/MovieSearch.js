import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import InteractiveCard from './InteractiveCard.js';
import SearchIcon from "../assets/search.svg";
import NoImage from '../assets/noimage.png';

class SearchQuery extends React.Component
{
  constructor(props)
  {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event)
  {
    this.props.handler();
  }
  render()
  {
    return (
        <div className="input-group md-form form-sm form-2 pl-0">
          <input
            className="form-control my-0 py-1"
            type="text" placeholder="Search"
            aria-label="Search"
            id = "text-query"
            onChange = {this.handleChange}
          >
          </input>
          <div className="input-group-append" onClick = {this.props.handler}>
            <span className ="input-group-text height-cap"><img alt = "Search" src = {SearchIcon}
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
              currentSelection = {this.props.currentSelection}
              currentNominations = {this.props.currentNominations}
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
    }else if (this.props.isSearching){
        return <div><p>Searching...</p></div>
    }else{
      return <div><p>Your search results will appear here.</p></div>
    }
  }
}

class SearchBox extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = ({hasQueried: false, isSearching: false, query: "", queryResults: ""});
    this.beginSearch = this.beginSearch.bind(this);
  }
  async beginSearch()
  {
    this.setState({isSearching: true, hasQueried: false});
    const query = document.getElementById("text-query").value;
    let searchPromise = new Promise(resp => setTimeout(resp,500));
    searchPromise.then(
      async function(val){
        const query2 = document.getElementById("text-query").value;
        if(query2 === query){
          if(query.length > 0){
            var api_key = process.env.REACT_APP_API_KEY;
            const url = `https://www.omdbapi.com/?s=${encodeURI(query)}&type=movie&apikey=${api_key}`; //API KEY LEAK BEWARE
            const response = await fetch(url);
            const data = await response.json();
            this.setState({hasQueried: true, isSearching: false, query: query, queryResults: data});
            this.props.clearDetails();
          }else{
            this.setState({hasQueried: false, isSearching: false, query: "", queryResults: null});
          }
        }
      }.bind(this)
    ).catch(
      (reason) => console.log("Failed promise fulfillment: " + query + " for reason " + reason)
    );
  }
  render()
  {
    return (
      <div className = "col-lg-6 pl-0">
        <SearchQuery handler = {this.beginSearch}/>
        <SearchResults
          isSearching = {this.state.isSearching}
          hasQueried = {this.state.hasQueried}
          query = {this.state.query}
          queryResults = {this.state.queryResults}
          updateDetails = {this.props.updateDetails}
          currentSelection = {this.props.currentSelection}
          currentNominations = {this.props.currentNominations}
        />
      </div>
    );
  }
}

export default SearchBox;
