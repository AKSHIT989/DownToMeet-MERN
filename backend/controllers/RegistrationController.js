const { json } = require("express");
const Registration = require("../models/Registration");
const jwt = require('jsonwebtoken');
const Events = require("../models/Events");

module.exports = {
  create(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        const user_id = authData.user._id;
        const { eventId } = req.params;
        var date = new Date();
        date = date.toDateString();

        const registration = await Registration.create({
          date: date,
          user: user_id,
          event: eventId
        });

        await registration
          .populate("event")
          .populate("user", "-password")
          .execPopulate();

        registration.owner = registration.event.user;
        registration.eventTitle = registration.event.title;
        registration.eventPrice = registration.event.price;
        registration.eventDate = registration.event.date;
        registration.userEmail = registration.user.email;
        registration.save();

        const ownerSocket = req.connectedUsers[registration.event.user];

        if (ownerSocket) {
          req.io.to(ownerSocket).emit('registration_request', registration);
        }

        return res.json(registration);
      }
    })
  },

  async getRegistration(req, res) {
    const { registrationId } = req.params;
    console.log(req.params);
    try {
      const registration = await Registration.findById(registrationId);
      await registration
        .populate("event")
        .populate("user", "-password")
        .execPopulate();
      return res.json(registration);
    } catch (error) {
      return res.send(400).send(json({ message: "Registration not found" }));
    }
  },

  getMyRegistrations(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        try {
          const registrationArr = await Registration.find({ "owner": authData.user._id });
          if (registrationArr) {
            return res.json(registrationArr);
          }
        } catch (error) {
          console.log(error);
        }
      }
    })
  },

  getEventParticipants(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        try {
          const { eventId } = req.params;
          const participantsArr = await Registration
            .find({ "owner": authData.user._id, "event": eventId, "approved": true })
            .populate("user");
          if (participantsArr) {
            return res.json(participantsArr);
          }
        } catch (error) {
          console.log(error);
        }
      }
    })
  }
};
