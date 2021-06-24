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
  Modal,
} from "react-bootstrap";
import { useParams } from "react-router";
import axios from "axios";
export default function Dashboard() {
  const { _id } = useParams();
  const [user, setUser] = useState("");
  const [show, setShow] = useState(false);
  //define state for new product
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [editProduct, setEditProduct] = useState("");
  const urlparams = useParams();

  useEffect(() => {
    //triggered on inital load
    updateUserData();
  }, []);
  const updateUserData = () => {
    // FIX THIS  : try using useParams
    axios
      .get(`/dashboard/${urlparams._id}`, {
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
        .post(`/dashboard/${_id}`, newProduct)
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
        url: `/dashboard/${urlparams._id}`,
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

  const Edit = (prod) => {
    console.log("Should show Modal for id:", prod._id);
    setEditProduct(prod);
    setShow(true);
  };
  const confirmEdit = () => {
    if (window.confirm("Are you sure you made the correct updates?")) {
      axios({
        method: "put",
        url: `/dashboard/${urlparams._id}`,
        data: {
          product: editProduct,
        },
      })
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
          alert("Product Updated Successfuly!");
          setShow(false);
          updateUserData();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="edit-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="edit-modal">Edit: {editProduct.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="id">Product ID:</label>
          <p name="id" className="p-0 mb-2">
            <i>{editProduct._id}</i>
          </p>
          <label htmlFor="name">Product Name:</label>
          <br />
          <input
            name="name"
            className="w-100 p-2"
            type="text"
            value={editProduct.name}
            onChange={(e) =>
              setEditProduct({ ...editProduct, name: e.target.value })
            }
          />
          <br />
          <label htmlFor="description">Product Description:</label>
          <br />
          <textarea
            name="description"
            className="w-100 p-2"
            value={editProduct.description}
            onChange={(e) =>
              setEditProduct({ ...editProduct, description: e.target.value })
            }
          />
          <br />
          <label htmlFor="price">Product Price:</label>
          <br />
          <input
            name="price"
            className="w-100 p-2"
            type="number"
            value={editProduct.price}
            onChange={(e) =>
              setEditProduct({ ...editProduct, price: e.target.value })
            }
          />
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-danger"
            onClick={() => {
              setEditProduct("");
              setShow(false);
            }}
          >
            Discard Changes
          </Button>
          <Button className="btn btn-success" onClick={() => confirmEdit()}>
            Confirm Changes
          </Button>
        </Modal.Footer>
      </Modal>
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
                              <Button
                                variant="primary"
                                className="m-2"
                                onClick={() => Edit(prod)}
                              >
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
