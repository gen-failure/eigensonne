import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {Switch, Route, Redirect} from 'react-router';

import Stories from './components/Stories';
import Questions from './components/Questions';
import Jobs from './components/Jobs';
import Navbar from './components/Navbar';
import Paginator from './components/Paginator';
import Loader from './components/Loader'
import Item from './components/Item';

@inject('routing')
@inject('content')
@observer
class App extends Component {
  render() {
    
    window.app = this;
    const { location, push, goBack } = this.props.routing; //eslint-disable-line no-unused-vars

    return (
      <div className="App">
        {this.props.content.showLoader && <Loader />}
        <Navbar />
        <div className="container bg-black text-light">
          <Switch>
            <Route exact path='/' render={() => { return <Redirect to="/stories/new/1" /> }} />
            <Route path='/stories/:pool/:page?' component={Stories} />
            <Route path='/ask/:page?' component={Questions} />
            <Route path='/jobs/:page?' component={Jobs} />
            <Route path='/item/:id' component={Item} />
          </Switch>
          {this.props.content.paginable && <Paginator /> }
        </div>
      </div>
    );
  }
}

export default App;
