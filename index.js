require("dotenv").config();
const express = require("express");
const users_route = require("./routes/users");
const teams_route = require("./routes/team");
const tasks_route = require("./routes/tasks");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const app = express();
const port = 3030;
const cors = require("cors");
const TASK_MODEL = require("./models/task");






app.listen(port);

app.use(users_route);
app.use(teams_route);
app.use(tasks_route);

//set db connection


mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", () => {
  console.log("Connected to the database");

  
})

//FIX THE WEB SOCKET CONNECTION
/*const io = new Server(server,{ cors: { origin: "*" } });


io.on("connection", (socket) => {
  const changeStream = TASK_MODEL.watch();

  changeStream.on("change",  (change) => {
    
      socket.emit("new-comment");
   
  });
}); */