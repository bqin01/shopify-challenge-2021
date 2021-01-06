import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import InteractiveCard from './InteractiveCard.js';
import NoImage from '../assets/noimage.png';
import Config from '../config.json';
import LogoIMBD from '../assets/imdblogo.png';
import LogoRT from '../assets/rottentomatoes.png';
import LogoMC from '../assets/metacritic.png';

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
        <div>
          <div className = "left-display">
            <img className = "film-banner" src = {(this.props.data["Poster"] === "N/A" ? NoImage : this.props.data["Poster"]) || NoImage}/>
            <div className = "ratings">
              <div className = "rating rating-vert">
                <img src = {LogoIMBD}/>
                <span>{ratings[0] === "N/A" ? this.props.data["imdbRating"] : ratings[0]}</span>
              </div>
              <div>
                <div className = "rating rating-hori">
                  <img src = {LogoRT}/>
                  <span>{ratings[1]}</span>
                </div>
                <div className = "rating rating-hori">
                  <img src = {LogoMC}/>
                  <span>{ratings[2]}</span>
                </div>
              </div>
            </div>
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
