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
        
    }

    render() {
        return <ul>
            {this.state.cart.lineItems.map(li => <CartItem lineItem={li} />)}
        </ul>;
    }
}

class CartItem extends Component {

    render() {
        let item = this.props.lineItem;
        return <li>
            <img src={item.product.imageURL} height='50px' />
            {item.product.name} ({item.quantity} @ ${item.product.price})
            /* <a href="#" onClick={this.removeFromCart}>Remove</a> */
        </li>
    }
}
