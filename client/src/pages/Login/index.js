import React, { useState } from "react";
import api from "../../Services/api";
import { Button, Form, FormGroup, Input, Container } from "reactstrap";

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(email + password);

    const response = await api.post("/login", { email, password });
    const userId = response.data._id || false;

    if (userId) {
      localStorage.setItem("user", userId);
      history.push("/dashboard");
    } else {
      const { message } = response.data;
      console.log(message);
    }
  };

  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
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
        <Button>Submit</Button>
      </Form>
    </Container>
  );
}

export default Login;
