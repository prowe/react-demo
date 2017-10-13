
import React, { Component } from 'react';

export default class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [
                {
                    name: 'Product A',
                    price: 33.33
                }
            ]
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/products')
            .then(res => res.json())
            .then(products => this.setState({products}));
    }

    render() {
        let productElements = this.state.products
            .map(p => <ProductCard product={p} />);
        return <div>{productElements}</div>;
    }
}

class ProductCard extends Component {
    addItemToCart = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/shopping-carts/1/line-items', {
            method: 'POST',
            headers: new Headers({
                'Content-type': 'application/json'
            }),
            body: JSON.stringify({
                productId: this.props.product.id
            })
        });
    }

    render() {
        let product = this.props.product;
        return <div style={{float: 'left'}}>
            <img src={product.imageURL} />
            <h2>{product.name}</h2>
            <button onClick={this.addItemToCart} >${product.price} Add to cart</button>
        </div>;
    }
}

