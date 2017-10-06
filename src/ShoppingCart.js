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
        fetch(`http://localhost:8080/shopping-carts/123`)
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

    lineItemRemovedFromCart = (lineItem) => {
        let oldCart = this.state.cart;
        let cart = {
            ...oldCart,
            lineItems: oldCart.lineItems.filter(li => li !== lineItem)
        };
        this.setState({cart});
    }

    render() {
        let lineItemElements = this.state.cart.lineItems
            .map(li => <CartItem lineItem={li} key={li.lineItemId} lineItemRemovedFromCart={this.lineItemRemovedFromCart} />);

        return <ul className="mdc-list mdc-list--avatar-list">{lineItemElements}</ul>;
    }
}

class CartItem extends Component {

    removeFromCart = (e) => {
        e.preventDefault();
        
        let lineItem = this.props.lineItem;
        fetch(`http://localhost:8080/shopping-carts/123/line-items/${lineItem.lineItemId}`, {
            method: "DELETE"
        })
        .then(() => {
            let cb = this.props.lineItemRemovedFromCart;
            if(cb) {
                cb(lineItem);
            }
        });
    }

    render() {
        let item = this.props.lineItem;
        return <li className="mdc-list-item">
            <img src={item.product.imageURL} className="mdc-list-item__start-detail" alt="product" />
            <span className="mdc-list-item__text">
                {item.product.name} ${item.product.price} x {item.quantity}
            </span>
            <a className="mdc-list-item__end-detail material-icons"  
                onClick={this.removeFromCart}>remove_shopping_cart</a>
        </li>;
    }
}