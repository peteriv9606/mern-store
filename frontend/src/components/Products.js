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
        console.log("RESPONSE", response);
        console.log("res.data type", typeof response.data);
        if (typeof response.data == "object") {
          console.log("res.data is an object");
          setusersWithProds([...response.data]);
        }
      })
      .catch((error) => console.log("ERROR:", error));
  }, []);
  useEffect(() => {
    if (filter !== props.filter) {
      setFilter(props.filter);
      console.log("set filter", props.filter);
    }
  });
  try {
    {
      console.log("USERS WITH PRODS: ", usersWithProds);
    }
    return usersWithProds
      ? usersWithProds.map((user) => {
          return (
            <>
              {user.products.map((prod, index) => {
                return filter !== "" ? (
                  prod.name.toLowerCase().includes(filter.toLowerCase()) ? (
                    <>
                      <a className="product" key={index}>
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
                    <a className="product" key={index}>
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
  } catch (error) {
    return (
      <div>
        {console.log("Should return the Catch statement error", error)}
        <p>An error occured while trying to fetch the data</p>
        <br />
        <p>Error: {error}</p>
      </div>
    );
  }
}

export default Products;
