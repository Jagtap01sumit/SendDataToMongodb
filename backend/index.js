const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = "mongodb+srv://jagtapsumit668:k9twuiN9AjhRZlro@cluster0.tz6fwxx.mongodb.net/register_demo"

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongo connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const userSchema = mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({
      name,
      email,
    });
    await user.save();
    res.status(201).json({ message: "Successfully registered", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(9002, async () => {
  await connectToMongo(); 
  console.log("Server started at port 9002");
});