import React, {Component} from 'react';

class ChatBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.name,
      content: ""
    }
  }

  usrEnterKeyPressed(e) {
    if (e.key === 'Enter') {
      this.props.updateUsr(this.state.username);
    }
  }

  msgEnterKeyPressed(e) {

    if (e.key === 'Enter') {
      // call the props function callback with username and content
      this.props.updateMsg(this.state.content)
      e.target.value = "";

    }
  }

  updateUsername(e) {
    this.setState({username: e.target.value});

  }

  updateContent(e) {
    this.setState({content: e.target.value});
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onChange={this.updateUsername.bind(this)} onKeyPress={this.usrEnterKeyPressed.bind(this)} placeholder="Your name" />
        <input className="chatbar-message" onChange={this.updateContent.bind(this)} onKeyPress={this.msgEnterKeyPressed.bind(this)} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;