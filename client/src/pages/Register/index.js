import React, { useState, useContext } from "react";
import api from "../../Services/api";
import { Button, Form, FormGroup, Alert } from "reactstrap";
import { UserContext } from '../../user-context';
import '../../assets/LoginRegister/css/style.css'
import SignUp from '../../assets/LoginRegister/images/signup-image.jpg'

import { MdLock, MdEmail, MdPerson } from "react-icons/md";


function Register({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { setIsLoggedIn } = useContext(UserContext);
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

      if (user && user_id) {
        localStorage.setItem("user", user);
        localStorage.setItem("user_id", user_id);//user_item
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
    <div className="main">
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <Form onSubmit={handleSubmit} className="register-form" id="register-form">
                <div className="form-group">
                  <label for="name">
                    <MdPerson fontSize="large" />
                  </label>
                  <input onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                    type="text"
                    name="firstName"
                    id="examplefirstName"
                    placeholder="Your first name" />
                </div>
                <div className="form-group">
                  <label for="name"><MdPerson fontSize="large" /></label>
                  <input onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                    type="text"
                    name="lastName"
                    id="examplelastName"
                    placeholder="Your last name" />
                </div>
                <div className="form-group">
                  <label for="email"><MdEmail fontSize="large" /></label>
                  <input onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Your email" />
                </div>
                <div className="form-group">
                  <label for="pass"><MdLock fontSize="large" /></label>
                  <input onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="Password" />
                </div>
                <FormGroup>
                  <Button color="success" className="submit-btn" size="lg">Register</Button>
                </FormGroup>

              </Form>
              {errorMessage ? (
                <Alert color="danger" className="event-validation">
                  Missing required information
                </Alert>
              ) : (
                  ""
                )}
            </div>
            <div className="signup-image">
              <figure><img src={SignUp} alt="sign up image" /></figure>
              <a onClick={() => {
                history.push("/login");
              }} className="signup-image-link" style={{ cursor: "pointer" }}>I am already member</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
