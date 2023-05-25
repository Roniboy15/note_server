const {config} = require("../config/secret.js")
const { default: mongoose } = require("mongoose");

main().catch(err => console.log(err));

async function main() {
  
  await mongoose.connect(`mongodb+srv://${config.userDb}:${config.passDb}@cluster0.qi5tkfy.mongodb.net/note_taking_app`);
  console.log("mongo connected to note_taking_app");
}
