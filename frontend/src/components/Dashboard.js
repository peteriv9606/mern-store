import React, { useState, useEffect } from "react";
import {
  Nav,
  Col,
  Tab,
  Row,
  Button,
  Form,
  InputGroup,
  Card,
} from "react-bootstrap";
import axios from "axios";
export default function Dashboard(props) {
  const [user, setUser] = useState("");
  //define state for new product
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
  });

  //define state for edit product
  const [toEdit, setToEdit] = useState(null);
  useEffect(() => {
    //triggered on server response changes - delete product,
    updateUserData();
  }, []);
  const updateUserData = () => {
    axios
      .get(window.location.pathname, {
        params: {
          loggedIn: localStorage.getItem("loggedIn"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      });
  };
  const discardInput = () => {
    setNewProduct({ name: "", description: "", price: "" });
  };
  const addNewProduct = () => {
    if (newProduct.name && newProduct.price) {
      //both values are present -> make the POST request
      axios
        .post(window.location.pathname, newProduct)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setUser(response.data);
            alert("Product " + newProduct.name + " added successfuly!");
            setNewProduct({ name: "", description: "", price: "" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else console.log("missing values");
  };

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios({
        method: "delete",
        url: window.location.pathname,
        data: {
          product_id: id,
        },
      })
        .then((response) => {
          console.log(response);
          setUser(response.data);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <Tab.Container defaultActiveKey="view-all">
        <Row className="m-0">
          <Col sm={3} className="p-0 text-center border-right border-light">
            <Nav className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="view-all" onClick={() => updateUserData()}>
                  View all your products
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="add-new">Add a new product</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="profile-settings">
                  Profile Settings
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9} className="p-0">
            <Tab.Content>
              <Tab.Pane eventKey="view-all">
                <h1 className="text-center">Your products</h1>
                <div className="d-flex flex-wrap justify-content-center">
                  {user.products && user.products.length > 0 ? (
                    user.products.map((prod) => {
                      return (
                        <Card
                          className="w-25 m-3"
                          key={prod._id}
                          style={{ minWidth: "250px" }}
                        >
                          <Card.Body>
                            <Card.Title>
                              {prod.name} (${prod.price})
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                              {prod._id}
                            </Card.Subtitle>
                            <Card.Text>{prod.description}</Card.Text>
                            <div className="w-100 p-3 m-0 d-l-flex d-block justify-content-between text-center">
                              <Button variant="primary" className="m-2">
                                Edit
                              </Button>
                              <Button
                                variant="danger"
                                className="mx-2"
                                onClick={() => deleteProduct(prod._id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      );
                    })
                  ) : (
                    <h3 className="m-auto pt-5">No Products Added Yet</h3>
                  )}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="add-new">
                <h1 className="text-center">Add a new Product</h1>
                <Form className="w-50 justify-content-center mx-auto">
                  <Form.Group controlId="product-name">
                    <Form.Label>Product Name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Product Name"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="product-description">
                    <Form.Label>Product Description:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter Product Description"
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="product-price">
                    <Form.Label>Product Price:</Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="number"
                        placeholder="Enter Product Price"
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            price: e.target.value,
                          })
                        }
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="d-flex flex-wrap justify-content-around">
                    <Button
                      className="btn btn-danger"
                      onClick={() => {
                        discardInput();
                      }}
                    >
                      Discard Input
                    </Button>
                    <Button
                      className="btn btn-success"
                      onClick={() => {
                        addNewProduct();
                      }}
                    >
                      Add new product
                    </Button>
                  </Form.Group>
                  {}
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey="edit-product">
                <p>asdasd</p>
              </Tab.Pane>
              <Tab.Pane eventKey="profile-settings">
                <p>asdasd</p>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
