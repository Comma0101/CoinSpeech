import React, { Component,useEffect } from 'react';
import main from './main'
import { BrowserRouter as Router,Route,HashRouter } from 'react-router-dom'
import Checkout from './Checkout'
import Profile from './Profile'
import {Provider} from 'react-redux';
import store from '.././store';
import {loadUser} from '../actions/auth'
import setAuthToken from '../utils/setAuthToken';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App =() =>  {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
  <Provider store={store}>
       <HashRouter >
        
    
      <Route exact path="/" component={main}/>
      <div>
      <Route exact path="/Checkout" component={Checkout}/>
      <Route exact path="/Profile" component={Profile}/>
      </div>
    
      
    </HashRouter>
    
</Provider>
)};


export default App;
