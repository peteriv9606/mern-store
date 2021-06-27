import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
function Products(props) {
  const handleProductClick = (user, prod) => {
    console.log("CLICKED");
    props.handleProductClick(user, prod);
  };
  const [usersWithProds, setusersWithProds] = useState(null);
  const [filter, setFilter] = useState(props.filter);

  useEffect(() => {
    axios
      .get("/products")
      .then((response) => {
        setusersWithProds([...response.data]);
      })
      .catch((error) => console.log("ERROR:", error));
  }, []);

  useEffect(() => {
    setFilter(props.filter);
  }, [props.filter]);

  try {
    return usersWithProds ? (
      usersWithProds.map((user) => {
        return user.products.map((prod) => {
          if (
            (filter !== "" &&
              prod.name.toLowerCase().includes(filter.toLowerCase())) ||
            filter === ""
          ) {
            return (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <Link
                to={`/product/${prod._id}`}
                className="product"
                key={prod._id}
              >
                <h1
                  className="w-100 mb-4 p-0 text-left"
                  style={{
                    fontSize: "24px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {prod.name}
                </h1>
                <p
                  className="w-100 mb-4 p-0 text-left"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "wrap",
                  }}
                >
                  <i>{prod.description}</i>
                </p>
                <div className="row w-100 flex-wrap">
                  <div className="col-4 p-0 m-0">Price:</div>
                  {prod.discountedPrice ? (
                    <>
                      <div
                        className="col-4 p-0 m-0 text-right"
                        style={{
                          textDecoration: "line-through",
                          color: "red",
                        }}
                      >
                        ${prod.price}
                      </div>{" "}
                      <div
                        className="col-4 p-0 m-0 text-right"
                        style={{ color: "green" }}
                      >
                        ${prod.discountedPrice}
                      </div>
                    </>
                  ) : (
                    <div className="col-8 p-0 m-0 text-right">
                      ${prod.price}
                    </div>
                  )}
                </div>
                <p className="w-100 m-0 p-0 text-left">
                  <i>Listed By: {user.username}</i>
                </p>
              </Link>
            );
          }
        });
      })
    ) : (
      <Spinner animation="border" role="status" size="lg">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } catch (err) {
    return <div>No products to show</div>;
  }
}

export default Products;
