import './App.css';
import axios from 'axios';
import React from 'react';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import {Route, Routes, Link} from 'react-router-dom';
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
          <header className="App-header">
            <h1>Good Things</h1>
            <ul>
              <li><Link>Home</Link></li>
              <li><Link>Register</Link></li>
              <li><Link>Login</Link></li>
            </ul>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="register" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>
          </main>

        </div>
    )
  }

}

export default App;
