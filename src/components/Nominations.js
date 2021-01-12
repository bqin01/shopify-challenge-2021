import React from 'react';
import NoImage from '../assets/noimage.png';
import XButton from '../assets/xbutton.png';

class Nom extends React.Component
{
  render ()
  {
      if (this.props.currentNominations.length > this.props.nomID)
      {
        var imgsrc = this.props.currentNominations[this.props.nomID]["ImgSrc"]
        return (
          <div className = "col-sm-4 nom-holder">
            <img
              className = "x-button"
              src = {XButton}
              onClick = {() => this.props.removeNomination(this.props.currentNominations[this.props.nomID]["imdbID"])}
            />
            <div
              className = "nomination nomination-filled"
              style = {
                {
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundImage: `url(${(imgsrc === "N/A" ? NoImage : imgsrc) || NoImage})`
                }
              }
            ></div>
          </div>
        );
      }else{
        return (
          <div className = "col-sm-4 nom-holder">
            <div className = "nomination nomination-empty">

            </div>
          </div>
        );
      }
  }
}

class Nominations extends React.Component
{
  render ()
  {
    return (
      <div className = "col-lg-6 rounded border-shadow nominations-olympics">
        <h3 className = "my-3 text-center">Your Shoppie Nominations</h3>
        <div className = "my-3 nominations container">
          <div className = "row">
              <Nom
                currentNominations = {this.props.currentNominations}
                removeNomination = {this.props.removeNomination}
                nomID = {0}
              />
              <Nom
                currentNominations = {this.props.currentNominations}
                removeNomination = {this.props.removeNomination}
                nomID = {1}
              />
              <Nom
                currentNominations = {this.props.currentNominations}
                removeNomination = {this.props.removeNomination}
                nomID = {2}
              />
          </div>
          <div className = "row">
            <div className = "col-sm-2"></div>
              <Nom
                currentNominations = {this.props.currentNominations}
                removeNomination = {this.props.removeNomination}
                nomID = {3}
              />
              <Nom
                currentNominations = {this.props.currentNominations}
                removeNomination = {this.props.removeNomination}
                nomID = {4}
              />
            <div className = "col-sm-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Nominations;
