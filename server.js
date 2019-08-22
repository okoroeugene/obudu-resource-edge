var express = require('express');
var app = express();
var morgan = require('morgan');
var cookieparser = require('cookie-parser');
require('dotenv').config();
var compression = require('compression');
var router = express.Router();
var rootRouter = require('./app/routes/index')(router);
var employeeRouter = require('./app/routes/employee')(router);
var cors = require('cors');
var dbConfiguration = require('./app/config/DB');

//middleware
app.use(compression());
app.use(morgan('dev'));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(cors());
app.use('/api', rootRouter);
app.use('/api', employeeRouter);

app.get('/', function (req, res) {
    res.json({ message: "hello world" });
});

dbConfiguration();
app.listen(process.env.PORT || 8080, function (err) {
    if (!err) {
        console.log('Server is connected!!')
    }
})


//app.use(respondeToRequest);

module.exports = app;



