import React from 'react';
import Plus from '../assets/plus.png'
import Minus from '../assets/minus.png'
import Overlay from 'react-bootstrap/Overlay'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

// class InteractiveCardDetails extends React.Component
// {
//   render()
//   {
//     return (
//     <div className = {this.props.childClass}>
//         <p>{this.props.description}</p>
//         <p></p>
//     </div>
//     );
//   }
// }

class AddOrRemove extends React.Component
{
  render ()
  {
    if (this.props.isMinus)
    {
      return (
        <OverlayTrigger
          placement = "top"
          overlay = {
            (props) => (
              <Tooltip {...props}>Remove from Nominations</Tooltip>
            )
          }
        >
          <div
            className = "quick-change-button"
            onClick = {() => this.props.removeNomination(this.props.imdbID)}
          >
            <img
              className = "quick-change-img"
              src = {Minus}
            />
          </div>
        </OverlayTrigger>
      );
    }else if (this.props.isFull){
      return (
        <OverlayTrigger
          placement = "top"
          overlay = {
            (props) => (
              <Tooltip {...props}>Nominations Full</Tooltip>
            )
          }
        >
          <div
            className = "quick-change-button-disabled"
          >
            <img
              className = "quick-change-img"
              src = {Plus}
            />
          </div>
        </OverlayTrigger>
      );
    }else{
      return (
        <OverlayTrigger
          placement = "top"
          overlay = {
            (props) => (
              <Tooltip {...props}>Add to Nominations</Tooltip>
            )
          }
        >
          <div
            className = "quick-change-button"
            onClick = {() => this.props.addNomination(this.props.imdbID)}
          >
            <img
              className = "quick-change-img"
              src = {Plus}
            />
          </div>
        </OverlayTrigger>
      );
    }
  }
}

class InteractiveCard extends React.Component
{
  render()
  {
    var cardClassName = "card bg-white border border-shadow";
    var alreadyNominated = false;
    for (const elem of this.props.currentNominations)
    {
      alreadyNominated = alreadyNominated || (elem["imdbID"] === this.props.imdbID);
    }
    if (alreadyNominated)
    {
      cardClassName += " card-header-nominated";
    }
    return (
      <div className = {cardClassName}>
        <OverlayTrigger
          placement = "right"
          overlay = {
            (props) => (
              <Tooltip {...props}>Click me for more info!</Tooltip>
            )
          }
        >
          <div onClick = {() => this.props.displayDetails(this.props.imdbID)} className = "card-get-details">
            <span>
              <span className = "film-title">{this.props.title}</span>
              <span className = "film-year">({this.props.year})</span>
            </span>
          </div>
        </OverlayTrigger>
        <AddOrRemove
          isMinus = {alreadyNominated}
          isFull = {this.props.currentNominations.length === 5}
          addNomination = {this.props.addNomination}
          removeNomination = {this.props.removeNomination}
          imdbID = {this.props.imdbID}
        />
      </div>
    );
  }
}

export default InteractiveCard;
