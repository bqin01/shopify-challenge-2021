import React from 'react';
import NoImage from '../assets/noimage.png';
import XButton from '../assets/xbutton.png';
import Alert from 'react-bootstrap/Alert';

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
                  cursor: "pointer",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundImage: `url(${(imgsrc === "N/A" ? NoImage : imgsrc) || NoImage})`
                }
              }
              onClick = {() => this.props.updateDetails(this.props.currentNominations[this.props.nomID]["imdbID"])}
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

class CompletedAlert extends React.Component
{
  render ()
  {
    if (this.props.toShow)
    {
      return (
        <Alert variant = "success">
🎉 Your nominations are completed! 🎉
</Alert>
      );
    }else{
      return null;
    }
  }
}

class Nominations extends React.Component
{
  render ()
  {
    const classAdd = (this.props.currentNominations.length < 5 ? "" : " nominations-olympics-filled")
    return (
      <div className = {"col-lg-6 rounded border-shadow nominations-olympics mb-4" + classAdd}>
        <h3 className = "my-3 text-center">Your Shoppie Nominations</h3>
        <CompletedAlert toShow = {this.props.currentNominations.length === 5}></CompletedAlert>
        <div className = "my-3 nominations container">
          <div className = "row">
              <Nom
                currentNominations = {this.props.currentNominations}
                removeNomination = {this.props.removeNomination}
                updateDetails = {this.props.updateDetails}
                nomID = {0}
              />
              <Nom
                currentNominations = {this.props.currentNominations}
                removeNomination = {this.props.removeNomination}
                updateDetails = {this.props.updateDetails}
                nomID = {1}
              />
              <Nom
                currentNominations = {this.props.currentNominations}
                removeNomination = {this.props.removeNomination}
                updateDetails = {this.props.updateDetails}
                nomID = {2}
              />
          </div>
          <div className = "row">
            <div className = "col-sm-2"></div>
              <Nom
                currentNominations = {this.props.currentNominations}
                removeNomination = {this.props.removeNomination}
                updateDetails = {this.props.updateDetails}
                nomID = {3}
              />
              <Nom
                currentNominations = {this.props.currentNominations}
                removeNomination = {this.props.removeNomination}
                updateDetails = {this.props.updateDetails}
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
