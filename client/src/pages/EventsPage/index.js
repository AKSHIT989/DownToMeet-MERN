import React, { useMemo, useState } from "react";
import api from "../../Services/api";
import CameraIcon from "../../assets/camera.png";
import DatePicker from "react-datepicker";
// import moment from "react-moment";

import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Container,
  Alert,
} from "reactstrap";
import "./events.css";
//EventsPage will show events

// title: String,
//     description: String,
//     price: Number,
//     eventType: String,
//     thumbnail: String,
//     date: Date,
function EventsPage({ history }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [thumbnail, setThumbnail] = useState(null);
  const [date, setDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  const handleEventSubmit = async (event) => {
    event.preventDefault();
    const user_id = localStorage.getItem("user");

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
        date !== ""
      ) {
        await api.post("/event", eventData, { headers: { user_id } });
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      }
    } catch (error) {
      Promise.reject(error);
      console.log(error.message);
    }

    return "";
  };

  return (
    <Container>
      <h2>Create your event</h2>
      <Form onSubmit={handleEventSubmit}>
        <div className="input-group">
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label>Upload Image</Label>
            <Label
              id="thumbnail"
              className={thumbnail ? "has-thumnail" : ""}
              style={{ backgroundImage: `url(${preview})` }}
            >
              <Input
                id="thumbnail"
                type="file"
                onChange={(event) => {
                  setThumbnail(event.target.files[0]);
                }}
              />
              <img
                src={CameraIcon}
                style={{ maxWidth: "50px" }}
                alt="Upload icon image"
              />
            </Label>
          </FormGroup>

          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label>Event type</Label>
            <Input
              placeholder="Enter type of event"
              id="eventType"
              type="text"
              value={eventType}
              onChange={(event) => {
                setEventType(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label>Title</Label>
            <Input
              placeholder="Enter event title"
              id="title"
              type="text"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label>Event Description</Label>
            <Input
              placeholder="Enter event description"
              id="description"
              type="text"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
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
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </FormGroup>

          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label>Event date</Label>
            <Input
              placeholder="Enter date of event"
              id="price"
              type="date"
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
                // console.log(new Date());
              }}
            />
          </FormGroup>
        </div>
        <FormGroup>
          <Button className="submit-btn">Create Event</Button>
        </FormGroup>
        <FormGroup>
          <Button
            className="secondary-btn"
            onClick={() => {
              history.push("/dashboard");
            }}
          >
            Go to Dashboard
          </Button>
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
