const { CONNECTION_STRING } = process.env; //CONNECTION_STRING is stored in .env file
const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
});
module.exports = {
  sequelize,
};
