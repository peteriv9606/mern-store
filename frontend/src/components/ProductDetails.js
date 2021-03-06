import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";

import axios from "axios";
function Product() {
  const { _id } = useParams();
  const [owner, setOwner] = useState(null);
  useEffect(() => {
    axios
      .get(`/api/products/${_id}`)
      .then((response) => setOwner(response.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      {owner ? (
        owner != "Not found" ? (
          <>
            <div className="d-flex flex-wrap">
              <div className="col-sm-2 col-12 p-3 d-flex align-items-center justify-content-left">
                <Button as={Link} to="/" className="btn btn-secondary">
                  Back
                </Button>
              </div>
              {owner.products[0].name && (
                <div className="col-sm-10 col-12 ">
                  <h1 className="text-center m-3">{owner.products[0].name}</h1>
                </div>
              )}
            </div>
            <hr />
            <div className="d-flex flex-wrap justify-content-between mx-auto w-75">
              {owner.products[0].uploadDate && (
                <p>
                  <i>
                    Date Added:{" "}
                    {new Date(owner.products[0].uploadDate).toLocaleString()}
                  </i>
                </p>
              )}
              {owner.products[0].lastUpdated && (
                <p>
                  <i>
                    Last Modified:{" "}
                    {new Date(owner.products[0].lastUpdated).toLocaleString()}
                  </i>
                </p>
              )}
            </div>
            <div className="row w-75 mx-auto border p-2 ">
              <div className="col-lg-6 col-12 bg-dark text-light">
                leftSide - product image(s) (carousel)
              </div>
              <div className="col-lg-6 col-12">
                <div className="row mx-2 flex-wrap">
                  <h4 className="font-italic w-100 text-center">
                    Product Description:
                  </h4>
                  <p className="border w-100 px-3" style={{ height: "50vh" }}>
                    {owner.products[0].description}
                  </p>
                </div>

                <div className="row mx-2 flex-wrap justify-content-center">
                  {owner.products[0].price && (
                    <h4>
                      Price:{" "}
                      {owner.products[0].discountedPrice ? (
                        <>
                          <span
                            style={{
                              textDecoration: "line-through",
                              color: "red",
                            }}
                          >
                            ${owner.products[0].price}
                          </span>{" "}
                          <span style={{ color: "green" }}>
                            ${owner.products[0].discountedPrice}
                          </span>
                        </>
                      ) : (
                        <span>${owner.products[0].price}</span>
                      )}
                    </h4>
                  )}
                </div>
              </div>
              <div className="col-12 d-flex justify-content-around my-3">
                <Button className="btn btn-success">Add to Cart</Button>
                <Button className="btn btn-primary">Message Seller</Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1>
              Product Not found. <br /> Redirecting to Home page...
            </h1>
            {setTimeout(() => {
              window.location.replace("/");
            }, 3000)}
          </>
        )
      ) : (
        <div className="d-flex flex-wrap justify-content-center align-items-center h-100">
          <Spinner animation="border" role="status" size="lg">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
    </>
  );
}

export default Product;
