import React, { Component } from 'react';
import ProductCard from './ProductCard';

export default class ProductList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [
                {
                    "id": 1,
                    "name": "Blue spinner",
                    "imageURL": "https://images-na.ssl-images-amazon.com/images/I/41mIdZdsC+L._AC_US218_.jpg",
                    "price": 4.50
                }
            ]
        };
    }

    render() {
        let productElements = this.state.products
            .map(p => <ProductCard product={p} />);
        return <div className="ProductList">{productElements}</div>;
    }
}