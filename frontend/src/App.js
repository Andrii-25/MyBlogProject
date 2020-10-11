import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostList from './components/PostList';
import PostEdit from './components/PostEdit';
import PostPage from './components/PostPage';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={PostList}/>
          <Route path='/posts/:id' component={PostEdit}/>
          <Route path='/more/:id' component={PostPage}/>
        </Switch>
      </Router>
    )
  }
}

export default App;