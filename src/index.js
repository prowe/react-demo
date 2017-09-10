import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './ProductCard.css';

class ProductList extends Component {

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
        return <div className="ProductList">{productElements}</div>;
    }
}

class ProductCard extends Component {

    render() {
        let product = this.props.product;
        return <div className="card">
            <img className="card-img-top" src={product.imageURL}  />
            <div className="card-body">
                <h4 className="card-title">{product.name}</h4>
                <p>${product.price}</p>
                <a href="#" className="btn btn-primary">Add to Cart</a>
            </div>
        </div>;
    }
}

ReactDOM.render(<ProductList />, document.getElementById('root'));