import React, {Component} from 'react';

class Message extends React.Component {

  render() {
      return (
       <div className="message">
          <span className="message-username" style={{color: this.props.messages.color}}> {this.props.messages.username}</span>
          <span className="message-content">{this.props.messages.content}</span>
       </div>
      );
  }
}

export default Message;