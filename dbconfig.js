
const mysql = require('mysql');

const config = mysql.createConnection({
  host: "127.0.0.1",
  database:"support_agent",
  user: "root",
  password: ""
});

config.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = config;