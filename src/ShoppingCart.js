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

    render() {
        let lineItemElements = this.state.cart.lineItems
            .map(li => <CartItem lineItem={li} key={li.lineItemId}/>);

        return <ul className="mdc-list mdc-list--avatar-list">{lineItemElements}</ul>;
    }
}

class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lineItem: props.lineItem
        };
    }

    removeFromCart = (e) => {
        e.preventDefault();
        
        let lineItem = this.state.lineItem;
        fetch(`http://localhost:8080/shopping-carts/123/line-items/${lineItem.lineItemId}`, {
            method: "DELETE"
        })
        .then(() => this.setState({lineItem: null}));
    }

    render() {
        let item = this.state.lineItem;
        return !item ? null : 
            <li className="mdc-list-item">
                <img src={item.product.imageURL} className="mdc-list-item__start-detail" />
                <span className="mdc-list-item__text">
                    {item.product.name}
                </span>
                <a className="mdc-list-item__end-detail material-icons"  
                    onClick={this.removeFromCart}>remove_shopping_cart</a>
            </li>;
    }
}