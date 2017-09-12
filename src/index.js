import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '@material/card/dist/mdc.card.css';
import '@material/button/dist/mdc.button.css';
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
        return <div className="ProductList" style={{display: 'flex'}}>{productElements}</div>;
    }
}

class ProductCard extends Component {

    render() {
        let product = this.props.product;
        return <div className="mdc-card ProductCard">
            <section className="mdc-card__media">
                <img className="mdc-card__media-item mdc-card__media-item--2x" src={product.imageURL}  />
            </section>
            <section className="mdc-card__primary">
                <h1 className="mdc-card__title mdc-card__title--large">{product.name} ${product.price}</h1>
            </section>
            <section className="mdc-card__actions">
                <button className="mdc-button mdc-button--stroked mdc-button--primary mdc-card__action">Add to Cart</button>
            </section>
        </div>
    }
}

ReactDOM.render(<ProductList />, document.getElementById('root'));