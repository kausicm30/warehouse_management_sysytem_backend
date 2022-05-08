let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let dotenv = require('dotenv').config();
let db = require('./app/utils/database');
let admin = require('./app/controllers/routes/adminroutes');
let employee = require('./app/controllers/routes/employeeroutes');
db.dbConnection();

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/',(req,res)=>{
    res.status(200).json({"status":true,"message": "Running successful"});
})
app.use('/admin', admin);
app.use('/employee', employee);


app.get('**', function (req, res){
    return res.status(404).json({"status":true,"message":"Page not found"});
});


app.listen(process.env.PORT, function () {
    console.log(`server listening on port ${process.env.PORT}`);
});