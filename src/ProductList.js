import React, { Component } from 'react';
import ProductCard from './ProductCard';

export default class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/products')
            .then(res => res.json())
            .then(products => this.setState({products: products}));
    }

    render() {
        let productElements = this.state.products
            .map(p => <ProductCard key={p.id} product={p} />);
        return <div className="ProductList" style={{display: 'flex'}}>{productElements}</div>;
    }
}