const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  async store(req, res) {
    try {
      //console.log(req.body);
      const { firstName, lastName, email, password } = req.body; //create user

      const hashedPassword = await bcrypt.hash(password, 10);
      const existentUser = await User.findOne({ email }); //check if user is present

      if (!existentUser) {
        const user = await User.create({
          firstName: firstName,
          lastName: lastName,
          password: hashedPassword,
          email: email,
        });
        return res.json(user); //return response
      }
      return res.status(400).json({
        message: "email/user already exists, Please login instead",
      });
    } catch (error) {
      throw Error(`Error while registering a new user:${error}`);
    }
  },
};
