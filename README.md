
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
    fetch(`http://localhost:8080/shopping-carts/123/line-items`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(lineItem)
    });
}
```