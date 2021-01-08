import React from 'react';
import NoImage from '../assets/noimage.png';

class Nom extends React.Component
{
  render ()
  {
      if (this.props.currentNominations.length > this.props.nomID)
      {
        var imgsrc = this.props.currentNominations[this.props.nomID]["ImgSrc"]
        return (
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
        );
      }else{
        return (
          <div className = "nomination nomination-empty">

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
      <div className = "col-lg-6">
        <h2>Your Shoppie Nominations</h2>
        <div className = "nominations container">
          <div className = "row">
            <div className = "col-sm-4 nom-holder"> {/* Nomination 1 */}
              <Nom
                currentNominations = {this.props.currentNominations}
                nomID = {0}
              />
            </div>
            <div className = "col-sm-4 nom-holder"> {/* Nomination 2 */}
              <Nom
                currentNominations = {this.props.currentNominations}
                nomID = {1}
              />
            </div>
            <div className = "col-sm-4 nom-holder"> {/* Nomination 3 */}
              <Nom
                currentNominations = {this.props.currentNominations}
                nomID = {2}
              />
            </div>
          </div>
          <div className = "row">
            <div className = "col-sm-2"></div>
            <div className = "col-sm-4 nom-holder">  {/* Nomination 4 */}
              <Nom
                currentNominations = {this.props.currentNominations}
                nomID = {3}
              />
            </div>
            <div className = "col-sm-4 nom-holder">  {/* Nomination 5 */}
              <Nom
                currentNominations = {this.props.currentNominations}
                nomID = {4}
              />
            </div>
            <div className = "col-sm-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Nominations;
