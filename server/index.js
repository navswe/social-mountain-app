require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const { SERVER_PORT } = process.env;


app.use(express.json());
app.use(cors());

app.listen(SERVER_PORT, () => console.log(`Running on port ${SERVER_PORT}`));

const {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
} = require("./controllers/posts");

const { register, login } = require("./controllers/auth");
const {isAuthenticated} = require('./middleware/isAuthenticated')

//endpoints for user authentication using register & login functions
app.post("/register", register);
app.post("/login", login);

// RESTFUL endpoints
app.get("/posts", getAllPosts);
app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id', isAuthenticated, editPost)
app.delete('/posts/:id', isAuthenticated, deletePost)
