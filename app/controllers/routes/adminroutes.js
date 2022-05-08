let express = require('express');
let router = express.Router();
let Admin = require('../../services/adminservices');


router.post('/loginverification', async (req, res)=>{
    try{
        Admin.loginverification(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed"});
    }
});


//================ Employee Routes ===================
router.post('/addemployee', async (req, res)=>{
    try{
        Admin.addemployee(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed"});
    }
});

router.get('/removeemployee', async (req, res)=>{
    try{
        Admin.removeemployee(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed"});
    }
});

router.get('/getemployees', async (req, res)=>{
    try{
        Admin.getemployees(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed"});
    }
});


//================= Products Routes ==========================
router.post('/addproduct', async (req, res)=>{
    try{
        Admin.addproduct(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed"});
    }
});

router.get('/getproducts', async (req, res)=>{
    try{
        Admin.getproducts(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed"});
    }
});
router.get('/deleteproduct', async (req, res)=>{
    try{
        Admin.deleteproduct(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed"});
    }
});

//=============== Order Routes ==============================
router.post('/addorder', async (req, res)=>{
    try{
        Admin.addorder(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed"});
    }
});

router.get('/getorders', async (req, res)=>{
    try{
        Admin.getorders(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed"});
    }
});

router.get('/cancelorder', async (req, res)=>{
    try{
        Admin.deleteorder(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed"});
    }
});


// ========== Container Routes ==========================
router.post('/addcontainerdetails', async (req, res)=>{
    try{
        Admin.addcontainerdetails(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed"});
    }
});

router.post('/updatecontainerdetails', async (req, res)=>{
    try{
        Admin.updatecontainerdetails(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed"});
    }
});

router.get('/getcontainerdetails', async (req, res)=>{
    try{
        Admin.getcontainerdetails(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed"});
    }
});
router.get('/deletecontainerdetails', async (req, res)=>{
    try{
        Admin.deletecontainerdetails(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed"});
    }
});

//================ GPS Routes ==============================
router.post('/addlivetrackingdetails', async (req, res)=>{
    try{
        Admin.addlivetrackingdetails(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed"});
    }
});

router.get('/getlivetrackingdetails', async (req, res)=>{
    try{
        Admin.getlivetrackingdetails(req, res);
    }
    catch(err){
        res.status(500).json({"status":"False", "message":"Api event execution failed"});
    }
});
router.get('/getcontainerlivetrackingdetails', async (req, res)=>{
    try{
        Admin.getcontainerlivetrackingdetails(req, res);
    }
    catch(err){
        res.status(500).json({"status":"False", "message":"Api event execution failed"});
    }
});
router.post('/addipaddress', async (req, res)=>{
    try{
        Admin.addipaddress(req, res);
    }
    catch(err){
        res.status(500).json({"status":"False", "message":"Api event execution failed"});
    }
});

router.post('/updatecontainerstatus', async (req, res)=>{
    try{
        Admin.updatecontainerstatus(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed"});
    }
});

module.exports = router;