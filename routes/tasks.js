const app = require('express')
const route = app.Router()
const taskControllers = require("../controllers/tasksControllers")
const TASK_MODEL = require("../models/task")



//vitals
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const cookieParser = require("cookie-parser");

const cors = require("cors");
route.use(cors({ origin: "http://localhost:3000", credentials: true }));
route.use(cookieParser());



route.get("/tasks/:id",jsonParser,taskControllers.getTaskById)
route.patch("/tasks/addcomment/:taskid",jsonParser,taskControllers.addNewcomment)
route.patch('/tasks/:x/comment',jsonParser,taskControllers.manageTask)


const changeStream = TASK_MODEL.watch();

  // Listen for changes
  changeStream.on('change', change => {
    console.log('Change detected:', change);
    // Handle the change here
  });



module.exports  = route