import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect,Router} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './actions'
import Landing from './components/landing';
import NotFound from './components/notFound';
import Header from './components/header';
import SurveyNew from './components/surveysNew';
import DashBoard from './components/dashboard';



class App extends Component {
 
  componentDidMount(){
    this.props.fetchUser();
  }
  render() { 
    return (           
      <main className="container">
        <BrowserRouter>
        <Header/>
        <div className="jumbotron">
          <Switch>
            <Route path="/not-found" component={NotFound}/>
            <Route path="/surveys"  component={DashBoard} />
            <Route path="/survey/new"  component={SurveyNew} />
            <Route path="/" exact component={Landing} />
            <Redirect to='/not-found'/>
          </Switch>
        </div>
      </BrowserRouter>
    </main> );
  }
}
 
export default connect(null, actions)(App);



