import React, { Component } from 'react';
import '@material/card/dist/mdc.card.css';
import '@material/button/dist/mdc.button.css';

export default class ProductCard extends Component {

    addItemProductToCart(e, product) {
        e.preventDefault();

        let lineItem = {
            productId: product.id
        };
        fetch(`http://localhost:8080/shopping-carts/${window.shoppingCartId}/line-items`, {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8'
            }),
            body: JSON.stringify(lineItem)
        })
        .then(res => console.log('item added', lineItem));
    }

    render() {
        let product = this.props.product;
        return <div className="mdc-card ProductCard">
            <section className="mdc-card__media">
                <img className="mdc-card__media-item mdc-card__media-item--3x" src={product.imageURL} alt="product thumbnail" />
            </section>
            <section className="mdc-card__primary">
                <h1 className="mdc-card__title mdc-card__title--large">{product.name}</h1>
            </section>
            <section className="mdc-card__actions">

                <button className="mdc-button mdc-button--stroked mdc-button--primary mdc-card__action material-icons" 
                    onClick={e => this.addItemProductToCart(e, product)}>
                    ${product.price}
                    <span className="material-icons" style={{ verticalAlign: 'middle' }}>add_shopping_cart</span>
                </button>
            </section>
        </div>
    }
}