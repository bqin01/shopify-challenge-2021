import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import InteractiveCard from './InteractiveCard.js';
import SearchIcon from "../assets/search.svg";
import NoImage from '../assets/noimage.png';
import NoSearch from '../assets/searchimgs/filmsearch.png';
import SearchError from '../assets/searchimgs/exclamation.png';

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
              addNomination = {this.props.addNomination}
              removeNomination = {this.props.removeNomination}
            />
          );
        });
        return (
          <div className = "my-3">
            <p className = "search-result-text">Click a film for more info!</p>
           {cards}
          </div>
       );
      }else{
         return (
           <div className = "search-result-holder">
             <img
               className = "search-result-img"
               src = {SearchError}
             />
           <p className = "search-result-text">{this.props.queryResults["Error"]}</p>
           </div>
          );
      }
    }else if (this.props.isSearching){
        return (
          <div className = "search-result-holder">
            <p className = "search-result-text">Searching...</p>
          </div>
        );
    }else{
      return (
        <div className = "search-result-holder">
          <img
            className = "search-result-img"
            src = {NoSearch}
          />
          <p className = "search-result-text">Your search results will appear here.</p>
        </div>
      );
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
    const query = document.getElementById("text-query").value;
    if (query.length > 0){
      this.setState({isSearching: true, hasQueried: false});
      let searchPromise = new Promise(resp => setTimeout(resp,500));
      searchPromise.then(
        async function(val){
          const query2 = document.getElementById("text-query").value;
          if(query2 === query){
              var api_key = process.env.REACT_APP_API_KEY;
              const url = `https://www.omdbapi.com/?s=${encodeURI(query)}&type=movie&apikey=${api_key}`; //API KEY LEAK BEWARE
              const response = await fetch(url);
              const data = await response.json();
              this.setState({hasQueried: true, isSearching: false, query: query, queryResults: data});
              this.props.clearDetails();
          }
        }.bind(this)
      ).catch(
        (reason) => null
      );
    }else{
      this.setState({hasQueried: false, isSearching: false, query: "", queryResults: null});
    }
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
          addNomination = {this.props.addNomination}
          removeNomination = {this.props.removeNomination}
        />
      </div>
    );
  }
}

export default SearchBox;
