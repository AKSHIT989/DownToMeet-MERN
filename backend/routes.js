const express = require("express");
const multer = require("multer");

const UserController = require("./controllers/UserController");
const EventController = require("./controllers/EventController");
const DashboardController = require("./controllers/DashboardController");
// const uploadConfig = require("./config/upload");
const verifyToken = require("./config/verifyToken");
const LoginController = require("./controllers/LoginController");
const RegistrationController = require("./controllers/RegistrationController");
const ApprovalController = require("./controllers/ApprovalController");
const RejectionController = require("./controllers/RejectionController");
const uploadToS3 = require('./config/s3Upload')

const routes = express.Router();
// const upload = multer(uploadConfig);

routes.get("/status", (req, res) => {
  res.send({ status: 200 });
});
//Endpoints:

//Registration(for events)
routes.post("/registration/:eventId", verifyToken, RegistrationController.create);
routes.get(
  "/registration",
  verifyToken,
  RegistrationController.getMyRegistrations
);
routes.get(
  "/event/participants/:eventId",
  verifyToken,
  RegistrationController.getEventParticipants
);
routes.get(
  "/registration/:registrationId",
  verifyToken,
  RegistrationController.getRegistration
);
//Approve
routes.post(
  "/registration/:registrationId/approval",
  verifyToken,
  ApprovalController.approval
);
//Reject
routes.post(
  "/registration/:registrationId/rejection",
  verifyToken,
  RejectionController.rejection
);

//Login Controller
routes.post("/login", LoginController.store);

//Dashboard
routes.get("/dashboard", verifyToken, DashboardController.getAllEvents);
routes.get(
  "/dashboard/:eventType",
  verifyToken,
  DashboardController.getAllEvents
);
routes.get("/user/events", verifyToken, DashboardController.getEventsByUserId);
routes.get("/event/:eventId", verifyToken, DashboardController.getEventById);

//Event
routes.post(
  "/event",
  verifyToken,
  uploadToS3.single("thumbnail"),
  EventController.createEvent
);
routes.delete("/event/:eventId", verifyToken, EventController.delete);

//User
routes.post("/user/register", UserController.createUser);
routes.get("/user/:userId", UserController.getUserById);

//Get Event Details
routes.get(
  "/events/details/:eventId",
  verifyToken,
  EventController.getEventDetails
);
module.exports = routes;
