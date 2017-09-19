import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';
import '@material/toolbar/dist/mdc.toolbar.css';
import '@material/typography/dist/mdc.typography.css';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <header className="mdc-toolbar">
            <div className="mdc-toolbar__row">
              <section className="mdc-toolbar__section">
                <span className="mdc-toolbar__title">Fidget Spinners 1 2 3</span>
              </section>
              <section className="mdc-toolbar__section">
                <Link to="/cart"  >
                  <span className="material-icons md-dark">shopping_cart</span>
                </Link>
              </section>
            </div>
          </header>
          <Switch>
            <Route path="/cart" component={ShoppingCart} />
            <Route path="/" component={ProductList} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
