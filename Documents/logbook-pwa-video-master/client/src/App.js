import React, { Component } from "react";
import ChannelForm from "./components/ChannelForm";
import Call from "./components/Call";
import Background from './digitalcrafts-background.png'

var sectionStyle = {
  width: "100%",
  height: "400px",
  backgroundImage: "url(" + { Background } + ")"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: ""
    };
  }

  selectChannel = channel => {
    this.setState({ channel });
  };

  render() {
    return (
      <div className="App" style={sectionStyle}>
        <ChannelForm selectChannel={this.selectChannel} />
      </div>
    );
  }
}

export default App;
