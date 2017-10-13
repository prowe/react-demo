import React, { Component } from 'react';
import '@material/card/dist/mdc.card.css';
import '@material/button/dist/mdc.button.css';
import './ProductList.css';

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
            .then(products => this.setState({
                products: products
            }));
    }

    render() {
        let productElements = this.state.products
            .map(p => <ProductCard key={p.id} product={p} />);
        return <div className="ProductList">{productElements}</div>;
    }
}

class ProductCard extends Component {

    addItemProductToCart = (e) => {
        e.preventDefault();

        let lineItem = {
            productId: this.props.product.id
        };
        fetch(`http://localhost:5000/shopping-carts/1/line-items`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(lineItem)
        })
        .then(res => console.log('item added', lineItem));
    }

    render() {
        let product = this.props.product;
        return <div className="mdc-card ProductCard">
            <section className="mdc-card__media">
                <img className="mdc-card__media-item mdc-card__media-item--3x" src={product.imageURL} alt="product thumbnail" />
            </section>
            <section className="mdc-card__primary">
                <h1 className="mdc-card__title mdc-card__title--large">{product.name}</h1>
            </section>
            <section className="mdc-card__actions">

                <button className="mdc-button mdc-button--stroked mdc-button--primary mdc-card__action material-icons" 
                    onClick={this.addItemProductToCart}>
                    ${product.price}
                    <span className="material-icons" style={{ verticalAlign: 'middle' }}>add_shopping_cart</span>
                </button>
            </section>
        </div>;
    }
}