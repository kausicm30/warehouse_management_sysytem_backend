let mongoose = require('mongoose');
const nodemailer = require('nodemailer');
let employeeModel = require('../models/employee');
let orderModel = require('../models/order');
let productModel = require('../models/product');
let containerModel = require('../models/container');
let liveTrackingModel = require('../models/livetracking');
let ipaddressModel = require('../models/kitipaddress');


let rfid="";

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

class Employee{
    
    static async loginverification(req, res){
        employeeModel.findOne({employeeId:req.body.employeeId,password:req.body.password},
            function(err,data){
                if(err){
                    console.log(err);
                    return res.status(200).json({"status":false,"message":err});

                }
                else{
                    if(data!=null){true
                        console.log(data);
                        return res.status(200).json({"status":true,"adminDetails":data});
                    }else{
                        return res.status(200).json({"status":false,"message":err});
                    }
                }
            }
        );
    }
    static async getrfid(req, res){
        while(rfid.length==0){
            console.log("getting rfid....");
            await sleep(5000);
        }
        return res.status(200).json({"status":true,"rfid":rfid});
    }
    static async putrfid(req,res){
        rfid=req.body.rfid;
        let kitname = req.body.name;
        // console.log(rfid);

        let update = {
            rfid: req.body.rfid,
            
            status : "new"
        };
        let filter={rfid :rfid};

        let orderDetails = await orderModel.findOne(filter)
        if(orderDetails!=null){
            console.log(orderDetails.status)
            let mailDetails
            if(orderDetails.status == "PACKED" && kitname == "container"){
                update.status = "SHIPPED-LOADED"
            }
            else if(orderDetails.status == "SHIPPED-LOADED" && kitname == "container"){
                update.status = "SHIPPED-UNLOADED"
            }
            else if(orderDetails.status == "SHIPPED-UNLOADED" && kitname == "container"){
                update.status = "SHIPPED-LOADED"
            }
            else if(orderDetails.status == "SHIPPED-UNLOADED" && kitname == "destination"){
                update.status = "DELIVERED"
            }
            else{
                console.log("nope!!!!!!!!!!")
            }
            console.log("------------->",update.status)
            //res.status(200).json({"status":true,"message": orderDetails});

            let order = await orderModel.findOneAndUpdate(filter, update,{
                new: true
            });
            let mailTransporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'kausic.m@eunimart.com',
                    pass: 'Kausic@1224'
                }
            });
            
            mailDetails = {
                from: 'kausic.m@eunimart.com',
                to: `${order.receiverdetails.emailid}`,
                subject: 'ORDER STATUS UPDATE',
                html:  `
                    <html lang=en>
                        <body>
                            <table style="padding:35px;background-color: #0faf32;">
                                <caption style="color: rgb(92, 80, 255);"><b> MMK WAREHOUSE MANAGEMENT SYSTEM</b></caption>
                                <tr>
                                    <th style="background-color: #f2f8f0;color: #af0f37;padding:10px">Name</th>
                                    <th style="background-color: #f2f8f0;color: #af0f37;padding:10px">Order Id</th>
                                    <th style="background-color: #f2f8f0;color: #af0f37;padding:10px">Product Id</th>
                                    <th style="background-color: #f2f8f0;color: #af0f37;padding:10px">Purchase Date</th>
                                    <th style="background-color: #f2f8f0;color: #af0f37;padding:10px">Order Amount</th>
                                    <th style="background-color: #f2f8f0;color: #af0f37;padding:10px">Payment Method</th>
                                    <th style="background-color: #f2f8f0;color: #af0f37;padding:10px">Quantity</th>
                                    <th style="background-color: #f2f8f0;color: #af0f37;padding:10px">Status</th>
                                </tr>
                                <tr>
                                    <td style="background-color: #f2f8f0; color: darkblue;padding:10px">${order.receiverdetails.name}</td>
                                    <td style="background-color: #f2f8f0; color: darkblue;padding:10px">${order.orderId}</td>
                                    <td style="background-color: #f2f8f0; color: darkblue;padding:10px">${order.productid}</td>
                                    <td style="background-color: #f2f8f0; color: darkblue;padding:10px">${order.purchasedate}</td>
                                    <td style="background-color: #f2f8f0; color: darkblue;padding:10px">${order.orderamount}</td>
                                    <td style="background-color: #f2f8f0; color: darkblue;padding:10px">${order.paymentmethod}</td>
                                    <td style="background-color: #f2f8f0; color: darkblue;padding:10px">${order.quantity}</td>
                                    <td style="background-color: #f2f8f0; color: darkblue;padding:10px"><b style="background-color:rgb(99, 42, 231);color: #f2f8f0;">${order.status}</b></td>
                                </tr>
                            </table>
                        </body>
                    </html>`
            };
            if (update.status != "new")
            await mailTransporter.sendMail(mailDetails, function(err, data) {
                if(err) {
                    console.log('Error Occurs');
                } else {
                    console.log('Email sent successfully');
                }
            });
        }
        res.status(200).json({"status":true,"message": "assigned..."});
    }
    static async addrfid(req, res){
        let update = {
            rfid: req.body.rfid,
            status : req.body.statusvalue
        };
        console.log("--------->", update)
        let filter={orderId :req.body.orderId};

        let order = await orderModel.findOneAndUpdate(filter, update,{
            new: true
        });
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kausic.m@eunimart.com',
                pass: 'Kausic@1224'
            }
        });
        
        let mailDetails = {
            from: 'kausic.m@eunimart.com',
            to: `${order.receiverdetails.emailid}`,
            subject: 'ORDER STATUS UPDATE',
            html:  `
                <html lang=en>
                    <body>
                        <table style="padding:35px;background-color: #0faf32;">
                            <caption style="color: rgb(92, 80, 255);"><b> MMK WAREHOUSE MANAGEMENT SYSTEM</b></caption>
                            <tr>
                                <th style="background-color: #f2f8f0;color: #af0f37;padding:10px">Name</th>
                                <th style="background-color: #f2f8f0;color: #af0f37;padding:10px">Order Id</th>
                                <th style="background-color: #f2f8f0;color: #af0f37;padding:10px">Product Id</th>
                                <th style="background-color: #f2f8f0;color: #af0f37;padding:10px">Purchase Date</th>
                                <th style="background-color: #f2f8f0;color: #af0f37;padding:10px">Order Amount</th>
                                <th style="background-color: #f2f8f0;color: #af0f37;padding:10px">Payment Method</th>
                                <th style="background-color: #f2f8f0;color: #af0f37;padding:10px">Quantity</th>
                                <th style="background-color: #f2f8f0;color: #af0f37;padding:10px">Status</th>
                            </tr>
                            <tr>
                                <td style="background-color: #f2f8f0; color: darkblue;padding:10px">${order.receiverdetails.name}</td>
                                <td style="background-color: #f2f8f0; color: darkblue;padding:10px">${order.orderId}</td>
                                <td style="background-color: #f2f8f0; color: darkblue;padding:10px">${order.productid}</td>
                                <td style="background-color: #f2f8f0; color: darkblue;padding:10px">${order.purchasedate}</td>
                                <td style="background-color: #f2f8f0; color: darkblue;padding:10px">${order.orderamount}</td>
                                <td style="background-color: #f2f8f0; color: darkblue;padding:10px">${order.paymentmethod}</td>
                                <td style="background-color: #f2f8f0; color: darkblue;padding:10px">${order.quantity}</td>
                                <td style="background-color: #f2f8f0; color: darkblue;padding:10px"><b style="background-color:rgb(99, 42, 231);color: #f2f8f0;">${order.status}</b></td>
                            </tr>
                        </table>
                    </body>
                </html>`
        };
        
        await mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
        rfid=""
         res.status(200).json({"status":true,"message": order});
    }
    static async getorders(req, res){
        orderModel.find(
            function(err,data){
                if(err){
                    console.log(err);
                    return res.status(200).json({"status":false,"message":err});

                }
                else{
                    console.log(data);
                    return res.status(200).json({"status":true,"orderDetails":data});
                }
            }
        )
    }
    static async getproducts(req, res){
        productModel.find(
            function(err,data){
                if(err){
                    console.log(err);
                    return res.status(200).json({"status":false,"message":err});

                }
                else{
                    console.log(data);
                    return res.status(200).json({"status":true,"productDetails":data});
                }
            }
        )
    }
    static async getcontainerdetails(req, res){
        containerModel.find(
            function(err,data){
                if(err){
                    console.log(err);
                    return res.status(200).json({"status":false,"message":err});

                }
                else{
                    console.log(data);
                    return res.status(200).json({"status":true,"containerDetails":data});
                }
            }
        )
    }
    static async getlivetrackingdetails(req, res){
        liveTrackingModel.find().sort({"createdAt": -1})
        .then(
            function(err,data){
            if(err){
                console.log(err);
                return res.status(200).json({"status":false,"message":err});

            }
            else{
                console.log(data);
                return res.status(200).json({"status":true,"Tracking Details":data});
            }
        })
    }
}
module.exports=Employee;