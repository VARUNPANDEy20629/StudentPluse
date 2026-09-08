const express = require("express");
const cors = require("cors");
const { predict } = require("./services/predictor");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>res.json({message:"Student Performance Prediction API is running!"}));

app.post("/api/predict",(req,res)=>{
  try {
    const result = predict(req.body);
    res.json(result);
  } catch (err) { res.status(400).json({error:err.message}); }
});

app.listen(5000,()=>console.log("Server running on http://localhost:5000"));