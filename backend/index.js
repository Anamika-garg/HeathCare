const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./routes/userRoutes.js");
const doctorRoutes = require('./routes/doctorRoutes.js')

const port = process.env.PORT || 3000;
const corsOptions = {
  origin: [
    'http://localhost:5173', // Frontend 1 (local development)
    'https://heath-care-5v4x.vercel.app', // Frontend 1 (deployed)
    'http://localhost:5174', // Frontend 2 (local development)
    'https://heath-care-client.vercel.app', // Frontend 2 (deployed)
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE' , 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/doctor" , doctorRoutes);

app.get('/' , (req,res)=>{
  res.send("HealthCare Backend")
})

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "HeathCare_Mangament",
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Some error occured while connecting to database:", err);
  });

app.listen(port, () => {
  console.log(`App listening on Port ${port}`);
});
