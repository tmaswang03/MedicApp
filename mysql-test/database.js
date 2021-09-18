var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "vibot2021",
  password: "BCx5D2fH9rmVx@a"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});