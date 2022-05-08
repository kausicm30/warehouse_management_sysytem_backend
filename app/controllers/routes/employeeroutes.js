let express = require('express');
let router = express.Router();
let Admin = require('../../services/adminservices');
let Employee = require('../../services/employeeservice')


router.post('/loginverification', async (req, res)=>{
    try{
        Employee.loginverification(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed"});
    }
});

router.get('/assign_rfid', async (req, res)=>{
    try{
        Employee.getrfid(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed"});
    }
});

router.post('/putrfid', async (req, res)=>{
    try{
        Employee.putrfid(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed"});
    }
});

router.post('/addrfid', async (req, res)=>{
    try{
        Employee.addrfid(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed"});
    }
});

router.get('/getproducts', async (req, res)=>{
    try{
        Employee.getproducts(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed"});
    }
});

router.get('/getorders', async (req, res)=>{
    try{
        Employee.getorders(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed"});
    }
});

router.get('/getcontainerdetails', async (req, res)=>{
    try{
        Employee.getcontainerdetails(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed"});
    }
});

router.get('/getlivetrackingdetails', async (req, res)=>{
    try{
        Employee.getlivetrackingdetails(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed"});
    }
});




module.exports = router;