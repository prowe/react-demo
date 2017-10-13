import React, { Component} from 'react';

export default class ShoppingCart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cart: {
                lineItems: []
            }
        }
    }

    componentDidMount(){
        fetch('http://localhost:5000/shopping-carts/1')
            .then(res => res.json())
            .then(cart => Promise.all(cart.lineItems.map(li => 
                fetch(`http://localhost:8080/products/${li.productId}`)
                    .then(res => res.json())
                    .then(product => li.product = product)))
                .then(() => this.setState({cart}))
            );
    }

    lineItemRemoved = lineItem => {
        let cart = this.state.cart;
        this.setState({
            cart: {
                ...cart,
                lineItems: cart.lineItems.filter(li => li != lineItem)
            }
        })
    }

    render() {
        return <ul>
            {this.state.cart.lineItems.map(li => <CartItem 
                lineItem={li} 
                lineItemRemoved={this.lineItemRemoved} />)}
        </ul>;
    }
}

class CartItem extends Component {
    removeFromCart = (e) => {
        e.preventDefault();

        let lineItem = this.props.lineItem;
        fetch(`http://localhost:5000/shopping-carts/1/line-items/${lineItem.id}`, {
            method: 'DELETE'
        })
        .then(() => {
            if(this.props.lineItemRemoved) {
                this.props.lineItemRemoved(lineItem);
            }
        })
    }

    render() {
        let item = this.props.lineItem;
        return <li>
            <img src={item.product.imageURL} height='50px' />
            {item.product.name} ({item.quantity} @ ${item.product.price})
            <a href="#" onClick={this.removeFromCart}>Remove</a>
        </li>
    }
}