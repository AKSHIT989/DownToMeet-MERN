const { json } = require("express");
const Registration = require("../models/Registration");
module.exports = {
  async create(req, res) {
    const { user_id } = req.headers;
    const { eventId } = req.params;
    const { date } = req.body;
    console.log(user_id);

    const registration = await Registration.create({
      user: user_id,
      event: eventId,
      date: date,
    });

    await registration
      .populate("event")
      .populate("user", "-password")
      .execPopulate();

    return res.json(registration);
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
};
