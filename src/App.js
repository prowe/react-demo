import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <Link to='/='>Spinner Shop!</Link>
            <Link to='/cart'>Cart</Link>
          </header>
          <Switch>
            <Route path='/cart' component={ShoppingCart} />
            <Route path="/" component={ProductList} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
