import React, { useState, useEffect } from "react";
import {
  Nav,
  Col,
  Tab,
  Row,
  Button,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { useParams } from "react-router";
import axios from "axios";
export default function Dashboard() {
  const { _id } = useParams();
  const urlparams = useParams();
  const [user, setUser] = useState("");
  const [show, setShow] = useState(false);

  const [newMessage, setNewMessage] = useState({
    userId: "",
    message: "",
    date: "",
  });

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    discountedPrice: 0,
    uploadDate: null,
    lastUpdated: null,
  });

  const getUserData = () => {
    axios
      .get(`/api/dashboard/${urlparams._id}`, {
        //i use the params to validate that user is logged in.. if not - should show just the user profile (unregistered user behaviour)
        params: {
          loggedIn: localStorage.getItem("loggedIn"),
          user_id: localStorage.getItem("user_id"),
        },
      })
      .then((res) => {
        setUser(res.data);
      });
  };

  const discardProduct = () => {
    setProduct({
      name: "",
      description: "",
      price: 0,
      discountedPrice: 0,
      uploadDate: "",
      lastUpdated: "",
    });
  };

  const addproduct = () => {
    if (product.name && product.price) {
      //both values are present -> make the POST request
      axios
        .post(`/api/dashboard/${_id}`, product)
        .then((response) => {
          if (response.status === 200) {
            setUser(response.data);
            alert("Product '" + product.name + "' added successfuly!");
            discardProduct();
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
        url: `/api/dashboard/${urlparams._id}`,
        data: {
          product_id: id,
        },
      })
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const Edit = (prod) => {
    setProduct(prod);
    setShow(true);
  };

  const confirmEdit = () => {
    if (window.confirm("Are you sure you made the correct updates?")) {
      delete product.uploadDate;
      axios({
        method: "put",
        url: `/api/dashboard/${urlparams._id}`,
        data: {
          product: product,
        },
      })
        .then((response) => {
          setUser(response.data);
          alert("Product Updated Successfuly!");
          setShow(false);
          getUserData();
          discardProduct();
        })
        .catch((err) => console.log(err));
    }
  };

  const getMessages = () => {
    axios
      .get(`/api/dashboard/${urlparams._id}/messages`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  const sendMessage = () => {
    axios
      .post(`/api/dashboard/${urlparams._id}/messages`, newMessage)
      .then((response) => {
        console.log(response.data);
        setNewMessage({
          userId: "",
          message: "",
          date: "",
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    //triggered on inital load
    getUserData();
  }, []);

  return (
    <div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="edit-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="edit-modal">Edit: {product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="id">Product ID:</label>
          <p name="id" className="p-0 mb-2">
            <i>{product._id}</i>
          </p>
          <label htmlFor="name">Product Name:</label>
          <br />
          <input
            name="name"
            className="w-100 p-2"
            type="text"
            value={product.name}
            onChange={(e) =>
              setProduct({
                ...product,
                name: e.target.value,
                lastUpdated: Date(),
              })
            }
          />
          <br />
          <label htmlFor="description">Product Description:</label>
          <br />
          <textarea
            name="description"
            className="w-100 p-2"
            value={product.description}
            onChange={(e) =>
              setProduct({
                ...product,
                description: e.target.value,
                lastUpdated: Date(),
              })
            }
          />
          <br />
          <label htmlFor="price">Product Price:</label>
          <br />
          <input
            name="price"
            className="w-100 p-2"
            type="number"
            value={product.price}
            onChange={(e) =>
              setProduct({
                ...product,
                price: e.target.value,
                lastUpdated: Date(),
              })
            }
          />
          <br />
          <label htmlFor="discountedPrice">Discounted Price:</label>
          <br />
          <input
            name="discountedPrice"
            className="w-100 p-2"
            type="number"
            value={product.discountedPrice}
            onChange={(e) =>
              setProduct({
                ...product,
                discountedPrice: e.target.value,
                lastUpdated: Date(),
              })
            }
          />
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-danger"
            onClick={() => {
              setProduct("");
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
                <Nav.Link eventKey="view-all" onClick={() => getUserData()}>
                  View all your products
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="add-new">Add a new product</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="messages" onClick={() => getMessages()}>
                  View Messages
                </Nav.Link>
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

                {user.products && user.products.length > 0 ? (
                  user.products.map((prod) => {
                    return (
                      <div
                        key={prod._id}
                        className="border border-blue shadow-lg m-5 p-5"
                      >
                        <div className="d-flex flex-wrap justify-content-between">
                          <h3>{prod.name}</h3>
                          <p className="muted d-flex justify-content-center align-items-center m-0">
                            <i>Product ID: {prod._id}</i>
                          </p>
                        </div>
                        <div className="d-flex flex-wrap justify-content-between">
                          <p>
                            Date Uploaded:
                            <i> {new Date(prod.uploadDate).toLocaleString()}</i>
                          </p>
                          <p>
                            Last Modified:
                            <i>
                              {" "}
                              {new Date(prod.lastUpdated).toLocaleString()}
                            </i>
                          </p>
                        </div>

                        <p>
                          Description: <br />
                          {prod.description}
                        </p>
                        <div className="d-flex flex-wrap justify-content-around">
                          <p>Price: ${prod.price}</p>
                          {prod.discountedPrice && (
                            <p>Discounted Price: ${prod.discountedPrice}</p>
                          )}
                        </div>
                        <div className="d-flex flex-wrap justify-content-between align-items-center">
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
                      </div>
                    );
                  })
                ) : (
                  <h3 className="m-auto pt-5">No Products Added Yet</h3>
                )}
              </Tab.Pane>
              <Tab.Pane eventKey="add-new">
                <h1 className="text-center">Add a new Product</h1>
                <Form className="w-50 justify-content-center mx-auto">
                  <Form.Group controlId="product-name">
                    <Form.Label>Product Name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Product Name"
                      value={product.name}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          name: e.target.value,
                          uploadDate: Date(),
                          lastUpdated: Date(),
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="product-description">
                    <Form.Label>Product Description:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter Product Description"
                      value={product.description}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          description: e.target.value,
                          uploadDate: Date(),
                          lastUpdated: Date(),
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
                        value={product.price}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            price: e.target.value,
                            uploadDate: Date(),
                            lastUpdated: Date(),
                          })
                        }
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group controlId="product-discounted-price">
                    <Form.Label>Discounted Price:</Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="number"
                        placeholder="Enter New (Discounted) Product Price"
                        value={product.discountedPrice}
                        default="0"
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            discountedPrice: e.target.value,
                            uploadDate: Date(),
                            lastUpdated: Date(),
                          })
                        }
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="d-flex flex-wrap justify-content-around">
                    <Button
                      className="btn btn-danger"
                      onClick={() => {
                        discardProduct();
                      }}
                    >
                      Discard Input
                    </Button>
                    <Button
                      className="btn btn-success"
                      onClick={() => addproduct()}
                    >
                      Add new product
                    </Button>
                  </Form.Group>
                  {}
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey="profile-settings">
                <h1 className="text-center">Profile Settings</h1>
                <div className="d-flex flex-wrap justify-content-center">
                  <Form className="w-50">
                    <div className="d-flex flex-wrap justify-content-center">
                      <Form.Group controlId="_id" className="w-50">
                        <Form.Label>
                          <i>Profile ID</i>
                        </Form.Label>
                        <Form.Control value={user._id} readOnly />
                      </Form.Group>
                      <Form.Group className="w-50">
                        <Form.Label>
                          <i>Register Date</i>
                        </Form.Label>
                        <Form.Control
                          value={new Date(user.registrationDate).toUTCString()}
                          readOnly
                        />
                      </Form.Group>
                    </div>
                    <Form.Group controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        value={user.username}
                        readOnly
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control value={user.email} readOnly></Form.Control>
                    </Form.Group>
                  </Form>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="messages">
                <h1>Messages</h1>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
