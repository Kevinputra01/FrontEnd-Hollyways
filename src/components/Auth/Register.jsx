import React, { useState, useContext } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

import { API } from "../../config/api";

import { UserContext } from "../../context/UserContext";

export default function RegisterModal(props) {
  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { fullname, email, password } = form;
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify(form);
      const response = await API.post("/register", body, config);
      console.log(response);

      if (response.data.status === "success") {
        const alert = <Alert variant="success">Success</Alert>;
        setMessage(alert);
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data.data.user });

        setForm({
          fullname: "",
          email: "",
          password: "",
        });
        props.handleCloseRegister();
        setMessage(null);
      } else if (response.data.status === "error") {
        const alert = <Alert variant="danger">{response.data.message}</Alert>;
        setMessage(alert);
      }
    } catch (error) {
      const alert = <Alert variant="danger">Failed</Alert>;
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <>
      <Modal size="sm" show={props.showRegister} onHide={props.handleCloseRegister} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message && message}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasictext">
              <input type="text" className="form-control" placeholder="Full Name" name="fullname" value={fullname} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <input type="email" className="form-control" placeholder="Email" name="email" value={email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={handleChange} />
            </Form.Group>
            <Button type="submit" variant="danger" className="form-control col-12">
              Submit
            </Button>
            <p className="mt-3 text-center text-secondary">
              Already have an account ? Click{" "}
              <span
                onClick={() => {
                  props.handleShowLogin();
                  props.handleCloseRegister();
                }}
                role="button"
                className="fw-bold text-dark text-decoration-none"
              >
                Here
              </span>
            </p>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
RegisterModal.propTypes = {
  showRegister: PropTypes.bool.isRequired,
  handleCloseRegister: PropTypes.func,
  handleShowLogin: PropTypes.func,
};
