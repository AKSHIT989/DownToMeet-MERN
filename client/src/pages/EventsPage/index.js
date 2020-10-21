import React, { useEffect, useMemo, useState } from "react";
import api from "../../Services/api";

import {
  Alert,
  Button,
  Container,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label
} from "reactstrap";
import "./events.css";

import '../../components/NavigationBar/assets/css/main.css'
function EventsPage({ history }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [thumbnail, setThumbnail] = useState(null);
  const [date, setDate] = useState("");
  const [eventType, setEventType] = useState("Event Type");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dropdownOpen, setOpen] = useState(false);
  const user = localStorage.getItem("user");

  useEffect(() => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("datefield").setAttribute("min", today);

    if (!user) {
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => setOpen(!dropdownOpen);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  const handleEventSubmit = async (event) => {
    event.preventDefault();
    const eventData = new FormData();

    eventData.append("thumbnail", thumbnail);
    eventData.append("eventType", eventType);
    eventData.append("title", title);
    eventData.append("price", price);
    eventData.append("description", description);
    eventData.append("date", date);

    try {
      if (
        title !== "" &&
        description !== "" &&
        price !== null &&
        eventType !== "" &&
        date !== "" &&
        thumbnail !== null
      ) {
        await api.post("/event", eventData, { headers: { user } });
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          history.push("/");
        }, 2000);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      }
    } catch (er) {
      Promise.reject(er);
      console.log(er.message);
    }

    return "";
  };
  return (
    <Container style={{ marginTop: "5%" }}>

      <center className="logo"><h2>Create your event</h2></center>

      <Form onSubmit={handleEventSubmit}>

        <FormGroup row>
          <Label for="exampleTitle" sm={2}>Event Title</Label>
          <Col sm={10}>
            <Input placeholder="Enter event title"
              bsSize="lg"
              id="title"
              type="text"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleText" sm={2}>Event Description</Label>
          <Col sm={10}>
            <Input
              bsSize="lg"
              placeholder="Enter event description"
              id="description"
              type="textarea"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleSelect" sm={2}>Event Type</Label>
          <Col sm={10}>
            <Input type="select" name="select" id="exampleSelect"
              onChange={(event) => {
                setEventType(event.target.value);
              }}
            >
              <option disabled selected>Select event-type</option>
              <option value="webinar">Webinar</option>
              <option value="seminar" >Seminar</option>
              <option value="workshop" >Workshop</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleText" sm={2}>Event Price</Label>
          <Col sm={10}>
            <InputGroup>
              <InputGroupAddon addonType="prepend">₹</InputGroupAddon>
              <Input
                placeholder="Enter price of event"
                id="price"
                type="number"
                min="0"
                step="any"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="datefield" sm={2}>Select Date</Label>
          <Col sm={10}>
            <Input
              placeholder="Enter date of event"
              id="datefield"
              type="date"
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleFile" sm={2}>Thumbnail</Label>
          <Col sm={10}>
            <Input id="thumbnail"
              type="file"
              onChange={(event) => {
                setThumbnail(event.target.files[0]);
              }} />
          </Col>
        </FormGroup>

        <br />
        <FormGroup>
          <Button className="submit-btn" color="success" size="lg">Create Event</Button>
          <Button
            className="secondary-btn"
            onClick={() => {
              history.push("/");
            }}
            color="danger"
            size="lg"
          >
            Cancel
          </Button>
        </FormGroup>
        <FormGroup>
        </FormGroup>
      </Form>

      {error ? (
        <Alert color="danger" className="event-validation">
          Missing required information
        </Alert>
      ) : (
          ""
        )}

      {success ? (
        <Alert color="success" className="event-validation">
          Event was created successfully
        </Alert>
      ) : (
          ""
        )}
    </Container>
  );
}

export default EventsPage;
