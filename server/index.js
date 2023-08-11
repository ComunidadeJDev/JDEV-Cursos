const express = require("express");
const app = express();
const port = 3001;
const connection = require("./db/connection");
const Category = require("./models/Category");
const Course = require("./models/Course");
const User = require("./models/User");
const CategoryController = require("./controllers/CategoryController");
const CourseController = require("./controllers/CourseController");
const UserController = require("./controllers/UserController");

connection.authenticate()
    .then(() => {
        console.log('the connection is sucessfull');
    })
    .catch((error) => {
        console.log(error);
    });

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/", CategoryController);
app.use("/", CourseController);
app.use("/", UserController);

app.listen(port, () => {
    console.log(`the server is runing: http://localhost:${port}`);
});