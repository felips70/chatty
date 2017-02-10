import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
          messages: [
            {
              type: "incomingMessage",
              id:1,
              username: "Bob",
              content: "Has anyone seen my marbles?",
            },
            {
              type: "incomingMessage",
              id:2,
              username: "Anonymous",
              content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
            }
          ]
            };
  }

componentDidMount() {
  console.log("componentDidMount <App />");
  this.socket = new WebSocket("ws://localhost:4000");
  this.socket.onmessage = (event) => {
    const receivedBroadcast = JSON.parse(event.data);

    if (receivedBroadcast.type === "incomingMessage") {
      this.setState({messages: this.state.messages.concat(receivedBroadcast)});

    } else if (receivedBroadcast.type === "incomingNotification") {
      const notification = receivedBroadcast.content;
      this.setState({currentUser: {name: receivedBroadcast.username}});
      this.setState({messages: this.state.messages.concat(receivedBroadcast)});

    } else if (receivedBroadcast.type === "clientCount") {
      this.setState({clientCount: receivedBroadcast.clientcount});
    }
  };
}

    updateUsername (username) {
      const newUserName ={
        type: "postNotification",
        systemMessage: this.state.currentUser.name +" changed their name to " + username,
        username: username
      }
      this.socket.send(JSON.stringify(newUserName));
    }

    updateMessages(content) {
        const newMessage = {
          type: "postMessage",
          username: this.state.currentUser.name,
          content: content
        }
        this.socket.send(JSON.stringify(newMessage));

    }

  render() {
    return (
      <div className="container">
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        <div className="userCount">
          {this.state.clientCount} users online
        </div>
        </nav>
        <div id="content">
          <MessageList messages={this.state.messages} currUserName={this.state.currentUser.name}/>
          <ChatBar name={this.state.currentUser.name} updateUsr={this.updateUsername.bind(this)} updateMsg={this.updateMessages.bind(this)}/>
        </div>
      </div>
    );
  }
}
export default App;
