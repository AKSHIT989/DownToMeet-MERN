const Event = require("../models/Events");
const User = require("../models/User");
// const { delete } = require("../routes");

module.exports = {
  async createEvent(req, res) {
    const { title, description, price, eventType, date } = req.body;
    const { user_id } = req.headers;
    const { filename } = req.file;
    // const currDate = new Date();
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ message: "User does not exist!" });
    }

    const event = await Event.create({
      title,
      description,
      price: parseFloat(price),
      user: user_id,
      eventType: eventType,
      date: date,
      thumbnail: filename,
    });

    return res.json(event);
  },

  async delete(req, res) {
    const { eventId } = req.params;
    try {
      await Event.findByIdAndDelete(eventId);
      return res.status(204).send();
    } catch (error) {
      return res
        .status(400)
        .json({ message: "We do have any event with the ID" });
    }
  },
};
