const dotenv = require("dotenv");
dotenv.config();

exports.config = {
  userDb: process.env.USER_DB,
  passDb: process.env.PASS_DB,
  tokenSecret: process.env.TOKEN_SECRET,
  textGearKey:process.env.TEXT_GEAR_KEY

}
