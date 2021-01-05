import React from 'react';

class InteractiveCardDetails extends React.Component
{
  render()
  {
    return (
    <div className = {this.props.childClass}>
        <p>{this.props.description}</p>
    </div>
    );
  }
}

class InteractiveCard extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = ({detailShown: false});
    this.toggleDetails = this.toggleDetails.bind(this);
  }
  toggleDetails()
  {
    this.setState({detailShown: !this.state.detailShown});
  }
  render()
  {
    return (
      <div className = "card">
        <div className = "cardHeader" onClick = {this.toggleDetails}>
          <h4 className = "filmTitle">{this.props.title}</h4>
        </div>
        <div className = "dropdownManager">
          <InteractiveCardDetails
            childClass = {(this.state.detailShown ? 'hiddenPortionShown' : 'hiddenPortionHidden') + " details"}
            description = {this.props.descr}
          />
        </div>
      </div>
    );
  }
}

export default InteractiveCard;
