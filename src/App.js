import React, { Component } from 'react';
import ProductList from './ProductList'
import '@material/toolbar/dist/mdc.toolbar.css';
import '@material/typography/dist/mdc.typography.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <header className="mdc-toolbar">
          <div className="mdc-toolbar__row">
            <section className="mdc-toolbar__section">
              <span className="mdc-toolbar__title">Fidget Spinners 1 2 3</span>
            </section>
            <section className="mdc-toolbar__section">
              <span>My Cart</span>
            </section>
          </div>
        </header>
        <ProductList />
      </div>
    );
  }
}
