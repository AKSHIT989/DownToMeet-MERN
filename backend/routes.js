const express = require("express");
const multer = require("multer");

const UserController = require("./controllers/UserController");
const EventController = require("./controllers/EventController");
const DashboardController = require("./controllers/DashboardController");
const uploadConfig = require("./config/upload");
const LoginController = require("./controllers/LoginController");
const RegistrationController = require("./controllers/RegistrationController");
const ApprovalController = require("./controllers/ApprovalController");
const RejectionController = require("./controllers/RejectionController");

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get("/status", (req, res) => {
  res.send({ status: 200 });
});
//Endpoints:

//Registration(for events)
routes.post("/registration/:eventId", RegistrationController.create);

routes.get(
  "/registration/:registrationId",
  RegistrationController.getRegistration
);
//Approve
routes.post(
  "/registration/:registrationId/approval",
  ApprovalController.approval
);
//Reject
routes.post(
  "/registration/:registrationId/rejection",
  RejectionController.rejection
);

//Login Controller
routes.post("/login", LoginController.store);

//Dashboard
routes.get("/dashboard", DashboardController.getAllEvents);
routes.get("/dashboard/:eventType", DashboardController.getAllEvents);
routes.get("/event/:eventId", DashboardController.getEventById);

//Event
routes.post("/event", upload.single("thumbnail"), EventController.createEvent);
routes.delete("/event/:eventId", EventController.delete);

//User
routes.post("/user/register", UserController.createUser);
routes.get("/user/:userId", UserController.getUserById);

module.exports = routes;
