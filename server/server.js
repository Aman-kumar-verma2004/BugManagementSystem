const express = require('express');
const cors = require('cors');
const app = express();
const authRoute = require("./routes/auth")
const dotenv = require('dotenv');
const Projectroute = require("./routes/project");
const mongoose = require("mongoose")

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/projects", Projectroute)


app.listen(PORT, ()=> {
    console.log(`Server is running at ${PORT}`);
})