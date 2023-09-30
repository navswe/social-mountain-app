//This is a middleware function that uses JSON Web Tokens (JWTs) to handle authentication.
// It can be used to ensure that the routes or endpoints are only accessible to users who have a valid JWT in the header of the HTTP requests. If the token is valid, the user can proceed to acess the endpoint. If the token is not valid, it will provide the apppropriate error code

//this section imports all the required modules (dotenv, jsonwebtoken library) and retrieve the SECRET key from the .env file
require("dotenv").config();

// calls the jwt library
const jwt = require("jsonwebtoken");

// SECRET variable is stored in .env file
const { SECRET } = process.env;

module.exports = {
  isAuthenticated: (req, res, next) => {
    // Extract the token from the 'Authorization' header of the incoming request
    const headerToken = req.get("Authorization");

    // if the token does not exist, the response will send a 401 status code
    if (!headerToken) {
      console.log("ERROR IN auth middleware");
      res.sendStatus(401);
    }

    // declare a new variable token
    let token;

    try {
      //verify the headerToken with SECRET key, and it is correct, save it as 'token' variable
      token = jwt.verify(headerToken, SECRET);
    } catch (err) {
      // catch and throw a "500 Internal Server Error"
      err.statusCode = 500;
      throw err;
    }

    //if the 'token' does not exist or is not matching the SECRET key, show an error message "Not authenticated", set a "401 Unauthorized" status code, and throw the error
    if (!token) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }
    // if the token is valid, continue to the next route handler, otherwise stops here
    next();
  },
};
