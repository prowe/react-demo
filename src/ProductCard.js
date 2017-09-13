import React, { Component } from 'react';
import '@material/card/dist/mdc.card.css';
import '@material/button/dist/mdc.button.css';
import './ProductCard.css';

export default class ProductCard extends Component {

    render() {
        let product = this.props.product;
        return <div className="mdc-card ProductCard">
            <section className="mdc-card__media">
                <img className="mdc-card__media-item mdc-card__media-item--2x" src={product.imageURL} alt="product thumbnail" />
            </section>
            <section className="mdc-card__primary">
                <h1 className="mdc-card__title mdc-card__title--large">{product.name} ${product.price}</h1>
            </section>
            <section className="mdc-card__actions">
                <button className="mdc-button mdc-button--stroked mdc-button--primary mdc-card__action">Add to Cart</button>
            </section>
        </div>
    }
}