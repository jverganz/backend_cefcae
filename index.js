const express = require("express");
const cors = require('cors');
const path = require("path");
require("dotenv").config();

// DB Config
require("./database/config").dbConnection();

// App de Express
const app = express();

// Read and parse json 
app.use( express.json() );
app.use( cors() );

// Server socket
const server = require("http").createServer(app);

// Routes
app.use( "/api/auth", require("./routes/auth") );
app.use( "/api/type_document", require("./routes/type_document") );
app.use( "/api/institute", require("./routes/institute") );
app.use( "/api/student", require("./routes/student") );
app.use( "/api/headquarter", require("./routes/headquarter") );
app.use( "/api/courses", require("./routes/courses") );
app.use( "/api/employee", require("./routes/employee") );
app.use( "/api/enrollment", require("./routes/enrollment") );

server.listen( process.env.PORT || 3000, ( err ) => {
    if ( err ) throw new Error(err);

    console.log("Servidor corriendo en puerto", process.env.PORT);
});
