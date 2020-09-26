import React, { useState } from "react";
import api from "../../Services/api";
import { Button, Form, FormGroup, Input, Container, Alert } from "reactstrap";

function Register({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (
      email !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== ""
    ) {
      const response = await api.post("/user/register", {
        email,
        password,
        firstName,
        lastName,
      });
      const user = response.data.user || false;
      const user_id = response.data.user_id || false;

      if (user) {
        localStorage.setItem("user", user);
        localStorage.setItem("user_item", user_id);
        history.push("/");
      } else {
        const { message } = response.data;
        setError(true);
        setErrorMessage(message);
        setTimeout(() => {
          setError(false);
          setErrorMessage("");
        }, 2000);
      }
    } else {
      setError(true);
      setErrorMessage("You need to fill all the Inputs");
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 2000);
    }
  };

  return (
    <Container>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        <div className="input-group">
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              type="text"
              name="firstName"
              id="examplefirstName"
              placeholder="Enter your first name here"
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input
              onChange={(event) => {
                setLastName(event.target.value);
              }}
              type="text"
              name="lastName"
              id="examplelastName"
              placeholder="Enter your last name here"
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Enter your email here"
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Enter your password here"
            />
          </FormGroup>
        </div>
        <FormGroup>
          <Button className="submit-btn">Submit</Button>
        </FormGroup>
        <FormGroup>
          <Button
            className="secondary-btn"
            onClick={() => {
              history.push("/login");
            }}
          >
            Already a user?
          </Button>
        </FormGroup>{" "}
      </Form>
      {errorMessage ? (
        <Alert color="danger" className="event-validation">
          Missing required information
        </Alert>
      ) : (
        ""
      )}
    </Container>
  );
}

export default Register;
