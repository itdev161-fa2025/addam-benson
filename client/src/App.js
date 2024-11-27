// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React from 'react';
class App extends React.Component {

  state = {
    data: null
  }

  componentDidMount(){
    axios.get('http://localhost:3000')
    .then((response) => {
      this.setState({
        data: response.data
      })
    })
    .catch((error) => {
      console.error(error);
    })
  }
  render(){
    return (
        <div className="App">
          <header className="App-Header">Good Things</header>

        </div>
    )
  }

}

export default App;
