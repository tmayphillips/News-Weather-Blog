import React, { Component } from "react";
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import Background from '../background.jpg'
import {Card, Jumbotron, Col, Container, Input, Row} from 'reactstrap'

var sectionStyle = {
  backgroundImage: `url(${ Background })`,
  backgroundRepeat  : 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'stretch',
  width: 'auto',
  height: 'auto'
};

var textAlignCenter = { textAlign: 'center' }

class ChannelForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: "",
    }
  }

  selectChannel = channel => {
    this.setState({ channel });
  };

  onSubmit = e => {
  e.preventDefault()
  console.log("Submiting an assistance call")
  this.props.selectChannel('assistance')
  this.setState({ channel: "" })
}

  render() {
    return (
      <div style={sectionStyle}>
      <Container fluid >
      <Jumbotron fluid>
      <Row>
        <Col sm="12" md={{ size: '10', offset: 1 }}>
          <div style={textAlignCenter}>
            <h1>Welcome to the DigitalCrafts Demo Day!</h1>
            <h5>Please click the call button and someone will be with you shortly.</h5>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm='12' md={{size: 6, offset: 3}}>
          <Link to={{pathname: '/call/assistance',}}>
            <Input type="submit" value="Call for Assistance" />
          </Link>
        </Col>
      </Row>
      </Jumbotron>
      </Container>
      </div>
    );
  }
}

export default withRouter(ChannelForm)
