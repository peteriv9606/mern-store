import { useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import "./App.css";
import Products from "./components/Products";
function App() {
  const [filter, setFilter] = useState("");

  return (
    <div className="App">
      <InputGroup className="m-auto py-3 w-75 d-flex">
        <InputGroup.Prepend>
          <InputGroup.Text id="prepend-desc">Filter by Name:</InputGroup.Text>
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
        <Products filter={filter} />
      </div>
    </div>
  );
}

export default App;
