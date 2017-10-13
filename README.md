
## Create an app

```bash
npm install -g create-react-app
create-react-app spinner-shop
cd spinner-shop

npm start
```

### index.js
```javascript
let content = React.createElement("div", {
    style: {
        color: "red"
    }
}, "Hello World");

ReactDOM.render(content, document.getElementById('root'));
```

### index.js
```javascript
let content = <div>Hello World</div>;

ReactDOM.render(content, document.getElementById('root'));
```

### index.js
```javascript
function Greeting(props) {
    return <div>{props.message}</div>;
}

ReactDOM.render(<Greeting message="hello" />, document.getElementById('root'));
```

Talk about the differece between props and state

### App.js
```javascript
export default class App extends Component {
  products = [
    { name: "A", price: 33.33 },
    { name: "B", price: 10.99 }
  ];

  render() {
    let p = this.products.map(p => <div>{p.name} ${p.price}</div>);
    return <div>{p}</div>;
  }
}
```

### App.js
```javascript
export default class App extends Component {
  render() {
    return <div>
      <header>
        Spinner Shop!
      </header>
      <ProductList />
    </div>;
  }
}
```

Lifecycle methods

### ProductList.js
```javascript
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
    
    render() {
        let product = this.props.product;
        return <div>
            <img src={product.imageURL} alt="product thumbnail" />
            <h2>{product.name}</h2>
            <button>${product.price} Add to Cart</button>
        </div>;
    }
}
```

Add Item to cart,
```javascript
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
    });
}
```

## Routing

### App.js
```javascript
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

<BrowserRouter>
    ...
    <Link to="/cart">
        <span className="material-icons md-dark">shopping_cart</span>
    </Link>

    ...

    <Switch>
        <Route path="/cart" component={ShoppingCart} />
        <Route path="/" component={ProductList} />
    </Switch>
</BrowserRouter>

```

ShoppingCart.js
```bash
git checkout <> -- src/ShoppingCart.js
```
```javascript
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
        fetch(`http://localhost:5000/shopping-carts/1`)
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

    lineItemRemovedFromCart = (lineItem) => {
        let oldCart = this.state.cart;
        let cart = {
            ...oldCart,
            lineItems: oldCart.lineItems.filter(li => li !== lineItem)
        };
        this.setState({cart});
    }

    render() {
        let lineItemElements = this.state.cart.lineItems
            .map(li => <CartItem lineItem={li} key={li.id} lineItemRemovedFromCart={this.lineItemRemovedFromCart} />);

        return <ul className="mdc-list mdc-list--avatar-list">{lineItemElements}</ul>;
    }
}

class CartItem extends Component {

    removeFromCart = (e) => {
        e.preventDefault();
        
        let lineItem = this.props.lineItem;
        fetch(`http://localhost:5000/shopping-carts/1/line-items/${lineItem.id}`, {
            method: "DELETE"
        })
        .then(() => {
            let cb = this.props.lineItemRemovedFromCart;
            if(cb) {
                cb(lineItem);
            }
        });
    }

    render() {
        let item = this.props.lineItem;
        return <li className="mdc-list-item">
            <img src={item.product.imageURL} className="mdc-list-item__start-detail" alt="product" />
            <span className="mdc-list-item__text">
                {item.product.name} ${item.product.price} x {item.quantity}
            </span>
            <a className="mdc-list-item__end-detail material-icons"  
                onClick={this.removeFromCart}>remove_shopping_cart</a>
        </li>;
    }
}
```