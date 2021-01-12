import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class NomPopup extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {checkRender: this.props.checkRender}
    this.shouldShow = this.shouldShow.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }
  shouldShow()
  {
    console.log(this.state.checkRender);
    return (!this.state.checkRender && (this.props.cookies.get("noms_index_0") !== undefined) && (this.props.cookies.get("num_noms") > 0));
  }
  async handleShow (reload)
  {
    this.props.unPopup();
    this.setState({checkRender: true});
    if (reload)
    {
      var loadArr = [];
      for (var i = 0; i < this.props.cookies.get("num_noms"); i++)
      {
        loadArr.push(this.props.cookies.get("noms_index_"+i));
      }
      this.props.setNominations(loadArr);
    }else{
      for (var i = 0; i < 5; i++) this.props.cookies.remove("noms_index_"+i);
      this.props.cookies.set("num_noms",0);
    }
  }
  render ()
  {
    return (
      <Modal show = {this.shouldShow()}>
        <Modal.Header closeButton>Shoppies in Progress</Modal.Header>
        <Modal.Body>We noticed that you had nominations before you navigated out of this page. Would you like to continue where you left off?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.handleShow(false)}>
            No, discard it.
          </Button>
          <Button variant="primary" onClick={() => this.handleShow(true)}>
            Yes, please!
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default NomPopup;
