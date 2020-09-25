const Event = require("../models/Events");
const User = require("../models/User");

module.exports = {
  async getEventById(req, res) {
    const { eventId } = req.params;
    console.log(eventId);
    try {
      const event = await Event.findById(eventId);

      if (event) {
        return res.json(event);
      }
    } catch (error) {
      return res.status(400).json({ message: "EventId does not exist!" });
    }
  },
  async getAllEvents(req, res) {
    const { eventType } = req.params;
    const query = eventType ? { eventType } : {};

    try {
      const events = await Event.find(query);

      if (events) {
        return res.json(events);
      }
    } catch (error) {
      return res.status(400).json({ message: "We do not have any events yet" });
    }
  },
  async getEventsByUserId(req, res) {
    const { user_id } = req.headers;

    try {
      const events = await Event.find({ user: user_id });

      if (events) {
        return res.json(events);
      }
    } catch (error) {
      return res
        .status(400)
        .json({ message: `We do not have any events of user_id ${user_id}` });
    }
  },
};
