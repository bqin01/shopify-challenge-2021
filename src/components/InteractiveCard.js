import React from 'react';

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

class InteractiveCard extends React.Component
{
  render()
  {
    var cardClassName = "card-header";
    var alreadyNominated = false;
    for (const elem of this.props.currentNominations)
    {
      alreadyNominated = alreadyNominated || (elem["imdbID"] === this.props.imdbID);
    }
    if (alreadyNominated)
    {
      cardClassName += " card-header-nominated";
    }
    if (this.props.imdbID === this.props.currentSelection)
    {
      cardClassName += " card-header-selected";
    }
    return (
      <div className = "card">
        <div className = {cardClassName} onClick = {() => this.props.displayDetails(this.props.imdbID)}>
          <span>
            <span className = "film-title">{this.props.title}</span>
            <span className = "film-year">({this.props.year})</span>
          </span>
        </div>
      </div>
    );
  }
}

export default InteractiveCard;
