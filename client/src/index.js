import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import {Onboarding1, Onboarding2} from './components/Onboarding'
import {Map} from './components/Map';
import Home from './Home';
import Park from './components/Park';
import {Shop} from './components/Shop';
import {Inventory} from './components/Inventory';
import { reducers } from './reducers';
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route exact path="/" component={Home}/>
      <Route path="/onboarding1" component={Onboarding1}/>
      <Route path="/onboarding2" component={Onboarding2}/>
      <Route path="/map" component={Map}/>
      <Route path="/shop" component={Shop}/>
      <Route path="/inventory" component={Inventory}/>
      <Route exact path="/park/:id" component={Park}/>
    </Router>
    </Provider>,
  document.getElementById('root'),
);
