import React, { Component } from 'react';

class App extends Component {
  state = {  }

  handleLogin = () =>{
    console.log("We have to log you in");
    fetch('http://localhost:5000/auth/google')
    .then(success=>{
        console.log("Success");
        console.log(success);
    })
    .catch(err=>{
      console.log("We have an error loggin in");
      console.log(err);
    })
  }
  render() { 
    return (<div className="container">
        <a className="btn btbn-primary" href="/auth/google">Login</a>
    </div>);
  }
}
 
export default App;
