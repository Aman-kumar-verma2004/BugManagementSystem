const express = require('express');
const cors = require('cors');
const app = express();
const authRoute = require("./routes/auth")
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);


app.listen(PORT, ()=> {
    console.log(`Server is running at ${PORT}`);
})