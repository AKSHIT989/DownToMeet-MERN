const Event = require("../models/Events");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// const { delete } = require("../routes");

module.exports = {
  createEvent(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.statusCode(401);
      } else {
        const { title, description, price, eventType, date } = req.body;
        // console.log("Event type is " + price);
        const { location } = req.file;

        const user = await User.findById(authData.user._id);

        if (!user) {
          return res.status(400).json({ message: "User does not exist!" });
        }

        try {
          const event = await Event.create({
            title,
            description,
            eventType,
            price: parseFloat(price),
            user: authData.user._id,
            thumbnail: location,
            date,
          });

          return res.json(event);
        } catch (error) {
          return res.status(400).json({ message: error });
        }
      }
    });
  },

  delete(req, res) {
    jwt.verify(req.token, "secret", async (err) => {
      if (err) {
        res.statusCode(401);
      } else {
        const { eventId } = req.params;
        try {
          await Event.findByIdAndDelete(eventId);
          return res.status(204).send();
        } catch (error) {
          return res
            .status(400)
            .json({ message: "We do have any event with the ID" });
        }
      }
    });
  },
  getEventDetails(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        try {
          const { eventId } = req.params;
          const eventObj = await Event.findById(eventId)
          if (eventObj) {
            // console.log(eventObj)
            return res.json(eventObj);
          } else {
            console.log("Event not found")
          }
        } catch (error) {
          console.log(error);
        }
      }
    })
  }
};
