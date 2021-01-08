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
    if (this.props.imdbID === this.props.currentSelection)
    {
        cardClassName += " card-header-selected";
    }
    return (
      <div className = "card">
        <div className = {cardClassName} onClick = {() => this.props.displayDetails(this.props.imdbID)}>
          <div className = "force-hori">
            <h4 className = "film-title">{this.props.title}</h4>
            <p className = "film-year">({this.props.year})</p>
          </div>
        </div>
      </div>
    );
  }
}

export default InteractiveCard;
