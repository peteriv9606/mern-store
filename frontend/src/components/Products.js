import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
function Products(props) {
  const [usersWithProds, setusersWithProds] = useState(null);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    console.log("useEffect run");
    axios
      .get("/products")
      .then((response) => {
        console.log(response);
        setusersWithProds([...response.data]);
      })
      .catch((error) => console.log("ERROR:", error));
  }, []);
  useEffect(() => {
    if (filter !== props.filter) {
      setFilter(props.filter);
      console.log("set filter", props.filter);
    }
  });
  return usersWithProds
    ? usersWithProds.map((user) => {
        return (
          <>
            {user.products.map((prod) => {
              return filter !== "" ? (
                prod.name.toLowerCase().includes(filter.toLowerCase()) ? (
                  <>
                    <a className="product">
                      <h1 key={prod._id} className="w-100 mb-4 p-0">
                        {prod.name}
                      </h1>
                      <p className="w-100 mb-4 p-0 text-left">
                        {prod.description}
                      </p>
                      <p className="w-100 mb-4 p-0 text-right">
                        Price: ${prod.price}
                      </p>
                      <p className="w-100 mb-4 p-0 text-left">
                        <i>Listed By: {user.username}</i>
                      </p>
                    </a>
                  </>
                ) : (
                  ""
                )
              ) : (
                <>
                  <a className="product">
                    <h1 key={prod._id} className="w-100 mb-4 p-0">
                      {prod.name}
                    </h1>
                    <p className="w-100 mb-4 p-0 text-left">
                      {prod.description}
                    </p>
                    <p className="w-100 mb-4 p-0 text-right">
                      Price: ${prod.price}
                    </p>
                    <p className="w-100 mb-4 p-0 text-left">
                      <i>Listed By: {user.username}</i>
                    </p>
                  </a>
                </>
              );
            })}
          </>
        );
      })
    : "Loading...";
}

export default Products;
