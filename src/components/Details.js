import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import InteractiveCard from './InteractiveCard.js';
import NoImage from '../assets/noimage.png';
import Config from '../config.json';
import LogoIMBD from '../assets/imdblogo.png';
import LogoRT from '../assets/rottentomatoes.png';
import LogoMC from '../assets/metacritic.png';

/**
Sample details, this.props.data
{"Title":"Harry Potter and the Deathly Hallows: Part 2","Year":"2011","Rated":"PG-13","Released":"15 Jul 2011","Runtime":"130 min",
"Genre":"Adventure, Drama, Fantasy, Mystery","Director":"David Yates","Writer":"Steve Kloves (screenplay), J.K. Rowling (novel)",
"Actors":"Ralph Fiennes, Michael Gambon, Alan Rickman, Daniel Radcliffe",
"Plot":"Harry, Ron, and Hermione search for Voldemort's remaining Horcruxes in their effort to destroy the Dark Lord as the final battle rages on at Hogwarts.",
"Language":"English","Country":"UK, USA","Awards":"Nominated for 3 Oscars. Another 46 wins & 91 nominations.",
"Poster":"https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
"Ratings":[{"Source":"Internet Movie Database","Value":"8.1/10"},{"Source":"Rotten Tomatoes","Value":"96%"},{"Source":"Metacritic","Value":"85/100"}],
"Metascore":"85","imdbRating":"8.1","imdbVotes":"755,663","imdbID":"tt1201607","Type":"movie","DVD":"N/A",
"BoxOffice":"$381,409,310","Production":"Heyday Films, Moving Picture Company, Warner Bros.","Website":"N/A","Response":"True"}
**/

class Director extends React.Component
{
  render ()
  {
    if(this.props.director === "N/A"){
      return <p className = "director faded">No/Unknown Director</p>
    }else{
      return <p className = "director"><b>Directed by {this.props.director}</b></p>
    }
  }
}

class Plot extends React.Component
{
  render ()
  {
    if(this.props.plot === "N/A"){
      return <p className = "plot faded">Plot Not Available</p>
    }else{
      return <p className = "plot">{this.props.plot}</p>
    }
  }
}

class Awards extends React.Component
{
  render ()
  {
    if(this.props.awards === "N/A")
    {
      return null;
    }else{
      return <p className = "awards">{this.props.awards}</p>
    }
  }
}

class NominationButton extends React.Component
{
  render ()
  {
    var alreadyNominated = false;
    for (const elem of this.props.currentNominations)
    {
      alreadyNominated = alreadyNominated || (elem["imdbID"] === this.props.imdbID);
    }
    if (alreadyNominated)
    {
      return (
        <button
          className = "nominate-button remove-nominate-button"
          onClick = {() => this.props.removeNomination(this.props.imdbID)}
        >
          Remove Nomination
        </button>
      );
    }else if (this.props.currentNominations.length >= 5){
      return (
        <button
          className = "nominate-button inactive-nominate-button"
          disabled = {true}
        >
          Nominations Full
        </button>
      );
    }else{
      return (
        <button
          className = "nominate-button add-nominate-button"
          onClick = {() => this.props.addNomination(this.props.imdbID)}
        >
          Nominate me for Shoppies!
        </button>
      );
    }
  }
}

class Details extends React.Component
{
  render()
  {
    if (this.props.toDisplay){
      var ratings = ["N/A", "N/A", "N/A"];
      for (var i in this.props.data["Ratings"])
      {
        var src = this.props.data["Ratings"][i]["Source"];
        var id = null;

        if (src === "Internet Movie Database") id = 0;
        else if (src === "Rotten Tomatoes") id = 1;
        else if (src === "Metacritic") id = 2;

        if(id){
          ratings[id] = this.props.data["Ratings"][i]["Value"];
        }
      }
      return (
        <div className = "row display">
          <div className = "left-display col-lg-3 container">
            <img
              className = "film-banner"
              alt = {"Poster for " + this.props.data["Title"]}
              src = {(this.props.data["Poster"] === "N/A" ? NoImage : this.props.data["Poster"]) || NoImage}
            />
            <div className = "ratings row">
              <div className = "rating rating-vert col-sm-6">
                <img alt = "IMBD" src = {LogoIMBD}/>
                <span>{ratings[0] === "N/A" ? this.props.data["imdbRating"] : ratings[0]}</span>
              </div>
              <div className = "col-sm-6">
                <div className = "rating rating-hori">
                  <img alt = "Rotten Tomatoes" src = {LogoRT}/>
                  <span>{ratings[1]}</span>
                </div>
                <div className = "rating rating-hori">
                  <img alt = "Metacritic" src = {LogoMC}/>
                  <span>{ratings[2]}</span>
                </div>
              </div>
            </div>
          </div>
          <div className = "right-display col-lg-9">
            <span>
              <span className = "film-title">{this.props.data["Title"]}</span>
              <span className = "film-year">({this.props.data["Year"]})</span>
            </span>
            <Director director = {this.props.data["Director"]}/>
            <Plot plot = {this.props.data["Plot"]}/>
            <Awards awards = {this.props.data["Awards"]}/>
            <button className = "imdb-link" onClick = {() => window.open("https://www.imdb.com/title/" + this.props.data["imdbID"], "_blank")}>Learn More on IMDb</button>
            <NominationButton
              addNomination = {this.props.addNomination}
              removeNomination = {this.props.removeNomination}
              imdbID = {this.props.data["imdbID"]}
              currentNominations = {this.props.currentNominations}
            />
          </div>
        </div>
      );
    }else{
      return null;
      //TO DO: Default screen for no results
    }
  }
}

export default Details;
