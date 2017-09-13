import React, { Component } from 'react';

export default class ShoppingCart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cart: {
                products: []
            }
        };
    }

    render() {
        return <h1>My Cart</h1>
    }
}