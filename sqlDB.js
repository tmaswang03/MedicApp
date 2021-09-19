const { Connection, Request } = require("tedious");

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "vibot2021", // update me
      password: "BCx5D2fH9rmVx@a" // update me
    },
    type: "default"
  },
  server: "vibotserver.database.windows.net", // update me
  options: {
    database: "ViBotDB", //update me
    encrypt: true
  }
};

const connection = new Connection(config);
insertDatabase()

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected');
    insertDatabase();
  }
});

connection.connect();

function queryDatabase() {
  console.log("Reading rows from the Table...");

  // Read all rows from table
  const request = new Request(
    `Select * FROM [dbo].[mathData]`,
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`${rowCount} row(s) returned`);
      }
    }
  );

  request.on("row", columns => {
    columns.forEach(column => {
      console.log("%s\t%s", column.metadata.colName, column.value);
    });
  });

  connection.execSql(request);
}

function insertDatabase() {
    console.log("Reading rows from the Table...");
  
    // Read all rows from table
    const request = new Request(
      `insert into [dbo].[test] values(1,'aaa','bbb')`,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log(`${rowCount} row(s) returned`);
        }
      }
    );
  
    request.on("row", columns => {
      columns.forEach(column => {
        console.log("%s\t%s", column.metadata.colName, column.value);
      });
    });
  
    connection.execSql(request);
  }

function upsertDatabase() {
    console.log("Updating or inserting rows to the Table...");

    var request = db.createRequest("insert into Comments values (@author, @text)", connection);
  
    request.addParameter('author', TYPES.NVarChar, req.body.author);
    request.addParameter('text', TYPES.NVarChar, req.body.text);
    
    db.executeRequest(request, connection);
}