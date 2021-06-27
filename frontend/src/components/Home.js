import { useState } from "react";
import Products from "./Products";
import { InputGroup, FormControl } from "react-bootstrap";

const Home = () => {
  const [filter, setFilter] = useState("");

  return (
    <>
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
    </>
  );
};

export default Home;
