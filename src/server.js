
const express = require("express");
const cors = require("cors");
const { initDB } = require("./db");
const insightRoutes = require("./routes/insights");
const syncService = require("./services/syncService");

const app = express();
app.use(cors());
app.use(express.json());

initDB();

app.get("/", (req,res)=>{
    res.send("PaySaathi Integration Service Running");
});

app.get("/sync", async (req,res)=>{
    await syncService.syncData();
    res.json({message:"Data synced"});
});

app.use("/insights", insightRoutes);

app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});
