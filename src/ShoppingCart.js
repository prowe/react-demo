import React, { Component } from 'react';
import '@material/list/dist/mdc.list.css';

export default class ShoppingCart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cart: {
                lineItems: []
            }
        };
    }
    
    componentDidMount() {
        fetch('http://localhost:8080/shopping-cart')
            .then(res => res.json())
            .then(cart => Promise.all(cart.lineItems.map(this.loadAndPopulateProduct))
                .then(() => this.setState({cart: cart}))
            );
    }

    loadAndPopulateProduct(lineItem) {
        return fetch(`http://localhost:8080/products/${lineItem.productId}`)
            .then(res => res.json())
            .then(product => lineItem.product = product);
    }

    render() {
        let cart = this.state.cart;
        return <ul className="mdc-list mdc-list--avatar-list">
            {cart.lineItems.map(this.createListItem)}
        </ul>;
    }

    createListItem(item) {
        return <li className="mdc-list-item" key={item.lineItemId} >
            <img src={item.product.imageURL} className="mdc-list-item__start-detail" />
            <span className="mdc-list-item__text">
                {item.product.name}
            </span>
            <a className="mdc-list-item__end-detail material-icons" href="#" >remove_shopping_cart</a>
        </li>;
    }
}