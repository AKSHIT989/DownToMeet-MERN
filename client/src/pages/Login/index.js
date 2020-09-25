import React, { useState } from "react";
import api from "../../Services/api";
import { Button, Form, FormGroup, Input, Container, Alert } from "reactstrap";

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await api.post("/login", { email, password });
    const userId = response.data._id || false;
    try {
      if (userId) {
        localStorage.setItem("user", userId);
        history.push("/dashboard");
      } else {
        const { message } = response.data;
        setError(true);
        setErrorMessage(message);
        setTimeout(() => {
          setError(false);
          setErrorMessage("");
        }, 2000);
      }
    } catch (error) {}
  };

  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <div className="input-group">
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
              history.push("/register");
            }}
          >
            New user?
          </Button>
        </FormGroup>
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

export default Login;
