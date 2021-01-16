import React, { useState, useContext } from "react";
import api from "../../Services/api";
import { Button, Form, FormGroup, Alert } from "reactstrap";
import { UserContext } from '../../user-context';

import SignIn from '../../assets/LoginRegister/images/signin-image.jpg'

import { MdLock, MdEmail } from "react-icons/md";

function  Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsLoggedIn } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await api.post("/login", { email, password });
    const user_id = response.data.user_id || false;
    const user = response.data.user || false;

    try {
      if (user && user_id) {
        localStorage.setItem("user", user);
        localStorage.setItem("user_id", user_id);

        setIsLoggedIn(true);
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
    } catch (err) {
      setError(true);
      setErrorMessage("Error is " + err);
    }
  };

  return (

    <div className="main">
      <section className="sign-in">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <figure><img src={SignIn} alt="sing up image" /></figure>
              <a className="signup-image-link"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push("/register");
                }}>Create an account</a>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Log In</h2>
              <Form onSubmit={handleSubmit}>
                <div className="form-group" style={{ justifyContent: "center" }}>
                  <label for="your_name"><MdEmail fontSize="large" /></label>
                  <input
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Enter your email here"
                  />
                </div>
                <div className="form-group" style={{ justifyContent: "center" }}>
                  <label for="your_pass"><MdLock fontSize="large" /></label>
                  <input
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="Enter your password here"
                  />
                </div>
                <FormGroup>
                  <Button color="success" className="submit-btn" size="lg">Submit</Button>
                </FormGroup>

              </Form>
              {errorMessage ? (
                <Alert color="danger" className="event-validation">
                  {errorMessage}
                </Alert>
              ) : (
                  ""
                )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Login;
