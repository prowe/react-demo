import React, { Component } from 'react';
import '@material/list/dist/mdc.list.css';

export default class ShoppingCart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cart: {
                products: []
            }
        };
    }
    
    componentDidMount() {
        fetch('http://localhost:8080/shopping-cart')
            .then(res => res.json())
            .then(cart => Promise.all(cart.products.map(this.loadAndPopulateProduct))
                .then(() => this.setState({cart: cart}))
            );
    }

    loadAndPopulateProduct(cartProduct) {
        return fetch(`http://localhost:8080/products/${cartProduct.productId}`)
            .then(res => res.json())
            .then(product => cartProduct.product = product);
    }

    render() {
        let cart = this.state.cart;
        return <ul className="mdc-list mdc-list--avatar-list">
            {cart.products.map(this.createListItem)}
        </ul>;
    }

    createListItem(item) {
        return <li className="mdc-list-item" key={item.productId} >
            <img src={item.product.imageURL} className="mdc-list-item__start-detail" />
            <span className="mdc-list-item__text">
                {item.product.name}
            </span>
            <a className="mdc-list-item__end-detail material-icons" href="#" >remove_shopping_cart</a>
        </li>;
    }
}