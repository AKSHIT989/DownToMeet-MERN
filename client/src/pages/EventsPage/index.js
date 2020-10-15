import React, { useEffect, useMemo, useState } from "react";
import api from "../../Services/api";
import CameraIcon from "../../assets/camera.png";

import {
  Alert,
  Container,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ButtonDropdown,
} from "reactstrap";
import "./events.css";
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
  const eventTypeHandler = (eventTyp) => {
    setEventType(eventTyp);
    // console.log(eventType);
  };
  return (
    <Container>
      <h2>Create your event</h2>
      <Form onSubmit={ handleEventSubmit }>
        <div className="input-group">
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label>Upload Image</Label>
            <Label
              id="thumbnail"
              className={ thumbnail ? "has-thumnail" : "" }
              style={ { backgroundImage: `url(${preview})` } }
            >
              <Input
                id="thumbnail"
                type="file"
                onChange={ (event) => {
                  setThumbnail(event.target.files[0]);
                } }
              />
              <img
                src={ CameraIcon }
                style={ { maxWidth: "50px" } }
                alt="Upload icon image"
              />
            </Label>
          </FormGroup>

          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label>Select Event Type</Label>
            <br />
            <ButtonDropdown isOpen={ dropdownOpen } toggle={ toggle }>
              <Button id="caret" value={ eventType } disabled>
                { eventType }
              </Button>
              <DropdownToggle caret />
              <DropdownMenu>
                <DropdownItem onClick={ () => eventTypeHandler("webinar") }>
                  webinar
                </DropdownItem>
                <DropdownItem onClick={ () => eventTypeHandler("workshop") }>
                  workshop
                </DropdownItem>
                <DropdownItem onClick={ () => eventTypeHandler("seminar") }>
                  seminar
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label>Title</Label>
            <Input
              placeholder="Enter event title"
              id="title"
              type="text"
              value={ title }
              onChange={ (event) => {
                setTitle(event.target.value);
              } }
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label>Event Description</Label>
            <Input
              placeholder="Enter event description"
              id="description"
              type="text"
              value={ description }
              onChange={ (event) => {
                setDescription(event.target.value);
              } }
            />
          </FormGroup>

          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label>Event price</Label>
            <Input
              placeholder="Enter price of event(₹)"
              id="price"
              type="number"
              min="0"
              step="any"
              value={ price }
              onChange={ (event) => {
                setPrice(event.target.value);
              } }
            />
          </FormGroup>

          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label>Event date</Label>
            <Input
              placeholder="Enter date of event"
              id="price"
              type="date"
              value={ date }
              onChange={ (event) => {
                setDate(event.target.value);
                // console.log(new Date());
              } }
            />
          </FormGroup>
        </div>
        <FormGroup>
          <Button className="submit-btn">Create Event</Button>
        </FormGroup>
        <FormGroup>
          <Button
            className="secondary-btn"
            onClick={ () => {
              history.push("/");
            } }
          >
            Cancel
          </Button>
        </FormGroup>
      </Form>

      {error ? (
        <Alert color="danger" className="event-validation">
          Missing required information
        </Alert>
      ) : (
          ""
        ) }

      {success ? (
        <Alert color="success" className="event-validation">
          Event was created successfully
        </Alert>
      ) : (
          ""
        ) }
    </Container>
  );
}

export default EventsPage;
