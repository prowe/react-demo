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

        this.createListItem = this.createListItem.bind(this);
    }
    
    componentDidMount() {
        fetch(`http://localhost:8080/shopping-carts/${window.shoppingCartId}`)
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
            <a className="mdc-list-item__end-detail material-icons" 
                href="#" 
                onClick={e => this.removeLineItemFromCart(e, item)}>remove_shopping_cart</a>
        </li>;
    }

    removeLineItemFromCart(e, lineItem) {
        e.preventDefault();

        fetch(`http://localhost:8080/shopping-carts/${window.shoppingCartId}/line-items/${lineItem.lineItemId}`, {
                method: "DELETE"
        })
        .then(() => {
            let cart = this.state.cart;
            cart.lineItems = cart.lineItems.filter(li => li != lineItem);
            this.setState({cart: cart});
        });
    }
}