import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currUserName,
    }
  }

  render() {
     const messageComps = this.props.messages.map(obj => {
        if (obj.type === "incomingMessage") {
          return (
            <main key={obj.id} className="messages">
              <Message messages={obj}/>
            </main> )
        } else {
          return (
          <div key={obj.id} className="message system">
            {obj.systemMessage}
          </div> )
        }
     });
     return <div>{messageComps}</div>;
  }
}

export default MessageList;