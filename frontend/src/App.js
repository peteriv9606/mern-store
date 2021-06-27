import { useState, useEffect } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import "./App.css";
import Products from "./components/Products";
import Product from "./components/Product";
import { Modal, Button } from "react-bootstrap";
function App() {
  const [filter, setFilter] = useState("");
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState(null);

  const handleProductClick = (user, prod) => {
    console.log("Clicked on product ", user, prod);
    setUser(user);
    setProduct(prod);
  };

  return (
    <div className="App">
      {product ? (
        <Product />
      ) : (
        <>
          <InputGroup className="m-auto py-3 w-75 d-flex">
            <InputGroup.Prepend>
              <InputGroup.Text id="prepend-desc">
                Filter by Name:
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Name"
              aria-label="Name"
              aria-describedby="prepend-desc"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </InputGroup>
          <div className="products-list">
            <Products
              filter={filter}
              handleProductClick={(user, prod) =>
                handleProductClick(user, prod)
              }
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
