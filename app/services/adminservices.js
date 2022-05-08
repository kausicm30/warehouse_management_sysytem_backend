let mongoose = require('mongoose');
let adminModel = require('../models/admin');
let employeeModel = require('../models/employee');
let orderModel = require('../models/order');
let productModel = require('../models/product');
let containerModel = require('../models/container');
let liveTrackingModel = require('../models/livetracking');
let ipaddressModel = require('../models/kitipaddress');
const nodemailer = require('nodemailer');

class Admin{
    static async loginverification(req, res){
        adminModel.findOne({adminId:req.body.adminId,password:req.body.password},
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
    static async addemployee(req, res){
        var obj={
            "employeeId":req.body.employeeId,
            "name":req.body.name,
            "warehousename":req.body.warehousename,
            "password":req.body.password,
            "mobilenumber":req.body.mobilenumber,
            "emailId":req.body.emailId,
            "dob":req.body.dob
        };
        employeeModel.findOne({employeeId:req.body.employeeId},
            async function(err,data){
                if(err){
                    console.log(err);
                    console.log("data------>"+data);
                    return res.status(200).json({"status":false,"message":err});
                }
                else{
                    if(data != null){
                        let filter={employeeId :req.body.employeeId};
                        let data1 = await employeeModel.findOneAndUpdate(filter, obj,{
                            new: true
                        });
                        console.log("data1------>"+data1);
                        return res.status(200).json({"status":true,"containerDetails":data1, "Message":"Employee Details updated Successfully"});
                    }
                    else{
                        new employeeModel(obj).save(
                            function(err,data){
                                if(err){
                                    console.log(err);
                                    return res.status(200).json({"status":false,"message":err});
                
                                }
                                else{
                                    console.log(data);
                                    return res.status(200).json({"status":true,"ProductDetails":data, "Message":"Employee details addedd Successfully"});
                                }
                            }
                        )
                    }
                }
            }
        );
    }
    static async removeemployee(req, res){
        employeeModel.deleteOne({employeeId:req.query.employeeId},
            function(err,data){
                if(err){
                    console.log(err);
                    return res.status(200).json({"status":false,"message":err});

                }
                else{
                    console.log(data);
                    return res.status(200).json({"status":true,"adminDetails":data});
                }
            }
        )
    }
    static async addproduct(req, res){
        var obj={
            productId:req.body.productId,
            title:req.body.title,
            description:req.body.description,
            category:req.body.category,
            color:req.body.color,
            pricing:{
                unitprice:req.body.unitprice
            },
            quantity:req.body.quantity
        };
        productModel.findOne({productId:req.body.productId},
            async function(err,data){
                if(err){
                    console.log(err);
                    console.log("data------>"+data);
                    return res.status(200).json({"status":false,"message":err});
                }
                else{
                    if(data != null){
                        let filter={productId :req.body.productId};
                        let data1 = await productModel.findOneAndUpdate(filter, obj,{
                            new: true
                        });
                        console.log("data1------>"+data1);
                        return res.status(200).json({"status":true,"containerDetails":data1, "Message":"Product Details updated Successfully"});
                    }
                    else{
                        new productModel(obj).save(
                            function(err,data){
                                if(err){
                                    console.log(err);
                                    return res.status(200).json({"status":false,"message":err});
                
                                }
                                else{
                                    console.log(data);
                                    return res.status(200).json({"status":true,"ProductDetails":data, "Message":"Product details addedd Successfully"});
                                }
                            }
                        )
                    }
                }
            }
        );
    }
    static async deleteproduct(req, res){
        productModel.deleteOne({productId:req.query.productId},
            function(err,data){
                if(err){
                    console.log(err);
                    return res.status(200).json({"status":false,"message":err});

                }
                else{
                    console.log(data);
                    return res.status(200).json({"status":true,"Message":"Removed successfull"});
                }
            }
        )
    }
    static async addorder(req, res){
        var obj={
            orderId:req.body.orderId,
            purchasedate:req.body.purchasedate,
            orderamount:req.body.orderamount,
            paymentmethod:req.body.paymentmethod,
            productid:req.body.productId,
            quantity:req.body.quantity,
            rfid:req.body.rfid,
            status:req.body.status,   
            receiverdetails:{
                emailid:req.body.emailid,
                name:req.body.name,
                address:req.body.address,
                city:req.body.city,
                state:req.body.state,
                mobilenumber:req.body.mobilenumber
            }
        };
        orderModel.findOne({orderId:req.body.orderId},
            async function(err,data){
                if(err){
                    console.log(err);
                    console.log("data------>"+data);
                    return res.status(200).json({"status":false,"message":err});
                }
                else{
                    if(data != null){
                        let filter={orderId :req.body.orderId};
                        let data1 = await orderModel.findOneAndUpdate(filter, obj,{
                            new: true
                        });
                        console.log("data1------>"+data1);
                        return res.status(200).json({"status":true,"containerDetails":data1, "Message":"Order Details updated Successfully"});
                    }
                    else{
                        new orderModel(obj).save(
                            function(err,data){
                                if(err){
                                    console.log(err);
                                    return res.status(200).json({"status":false,"message":err});
                
                                }
                                else{
                                    console.log(data);
                                    return res.status(200).json({"status":true,"OrderDetails":data, "Message":"Order details addedd Successfully"});
                                }
                            }
                        )
                    }
                }
            }
        );
    }
    static async deleteorder(req, res){
        orderModel.deleteOne({orderId:req.query.orderId},
            function(err,data){
                if(err){
                    console.log(err);
                    return res.status(200).json({"status":false,"message":err});

                }
                else{
                    console.log(data);
                    return res.status(200).json({"status":true,"adminDetails":data});
                }
            }
        )
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
    static async getemployees(req, res){
        employeeModel.find(
            function(err,data){
                if(err){
                    console.log(err);
                    return res.status(200).json({"status":false,"message":err});

                }
                else{
                    console.log(data);
                    return res.status(200).json({"status":true,"employeeDetails":data});
                }
            }
        )
    }
    static async addcontainerdetails(req, res){
        var obj={
            containerNumber : req.body.containerNumber,
            orderIds : req.body.orderIds,
            rfidTags:req.body.rfidTags,
            driverName : req.body.driverName,
            warehousename : req.body.warehousename,
            mobilenumber : req.body.mobilenumber,
            startingPoint : req.body.startingPoint,
            BoardingPoints : req.body.BoardingPoints,
            status : req.body.status
        };
        containerModel.findOne({containerNumber:req.body.containerNumber},
            async function(err,data){
                if(err){
                    console.log(err);
                    console.log("data------>"+data);
                    return res.status(200).json({"status":false,"message":err});
                }
                else{
                    if(data != null){
                            let filter={containerNumber :req.body.containerNumber};
                            let data1 = await containerModel.findOneAndUpdate(filter, obj,{
                                new: true
                            });
                            console.log("data1------>"+data1);
                            return res.status(200).json({"status":true,"containerDetails":data1, "Message":"container Details updated Successfully"});
                    }
                    else{
                        new containerModel(obj).save(
                            function(err,data){
                                if(err){
                                    console.log(err);
                                    return res.status(200).json({"status":false,"message":err});
                
                                }
                                else{
                                    console.log(data);
                                    return res.status(200).json({"status":true,"TrackingDetails":data, "Message":"Tracking details addedd Successfully"});
                                }
                            }
                        )
                    }
                }
            }
        );
    }
    static async updatecontainerdetails(req, res){
        var orderId = req.body.orderId
        var clearOrders = req.body.clearOrders
        var BoardingPoint = req.body.BoardingPoint
        var clearBoardingPoints = req.body.clearBoardingPoints
        var rfidTag = req.body.rfidTag
        var clearrfidTags = req.body.clearrfidTags
        console.log(`${orderId} ${clearOrders}`)

        containerModel.findOne({containerNumber:req.body.containerNumber},
            async function(err,data){
                if(err){
                    console.log(err);
                    console.log("data------>"+data);
                    return res.status(200).json({"status":false,"message":err});

                }
                else{
                    if(data!=null){
                        console.log(data);
                        let filter={containerNumber :req.body.containerNumber};
                        if(orderId !=""){
                            await containerModel.updateOne(filter,{$push:{orderIds:orderId}});
                        }
                        if(BoardingPoint!=""){
                            await containerModel.updateOne(filter,{$push:{BoardingPoints:BoardingPoint}});
                        }
                        if(rfidTag!=""){
                            await containerModel.updateOne(filter,{$push:{rfidTags:rfidTag}});
                        }
                        if(clearOrders){
                            await containerModel.findOneAndUpdate(filter, {orderIds:[]},{
                                new: true
                            });
                        }
                        if(clearBoardingPoints){
                            await containerModel.findOneAndUpdate(filter, {BoardingPoints:[]},{
                                new: true
                            });
                        }
                        if(clearrfidTags){
                            await containerModel.findOneAndUpdate(filter, {rfidTags:[]},{
                                new: true
                            });
                        }

                        return res.status(200).json({"status":true, "Message":"Updated container details"});
                    }
                    else{
                        return res.status(200).json({"status":false,"containerDetails":data1, "Message":"container doesn't exist"});
                    }
                }
            }
        );
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
    static async deletecontainerdetails(req, res){
        containerModel.deleteOne({containerNumber:req.query.containerNumber},
            function(err,data){
                if(err){
                    console.log(err);
                    return res.status(200).json({"status":false,"message":err});

                }
                else{
                    console.log(data);
                    return res.status(200).json({"status":true,"adminDetails":data});
                }
            }
        )
    }
    static async addlivetrackingdetails(req, res){
        var obj={
            latitude:req.body.latitude,
            longiitude :req.body.longiitude
        };
        liveTrackingModel.findOne({containerNumber:req.body.containerNumber},
            async function(err,data){
                if(err){
                    console.log(err);
                    console.log("data------>"+data);
                    return res.status(200).json({"status":false,"message":err});
                }
                else{
                    if(data != null){
                        let filter={containerNumber :req.body.containerNumber};
                        let data1 = await liveTrackingModel.updateOne(filter,{$push :{locationDetails:obj}});
                        console.log("data1------>"+data1);
                        return res.status(200).json({"status":true,"containerDetails":data1, "Message":"Tracking Details updated Successfully"});
                    }
                    else{
                        var obj1={
                            containerNumber:req.body.containerNumber,
                            locationDetails:req.bod.locationDetails
                        };
                        new liveTrackingModel(obj1).save(
                            function(err,data){
                                if(err){
                                    console.log(err);
                                    return res.status(200).json({"status":false,"message":err});
                
                                }
                                else{
                                    console.log(data);
                                    return res.status(200).json({"status":true,"TrackingDetails":data, "Message":"Tracking details addedd Successfully"});
                                }
                            }
                        )
                    }
                }
            }
        );
    }
    static async getlivetrackingdetails(req, res){
        liveTrackingModel.find()
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
    static async getcontainerlivetrackingdetails(req, res){
        let containerNumber = req.query.containerNumber
        //console.log(containerNumber)
        liveTrackingModel.findOne({containerNumber:containerNumber},function(err,data){
            if(err){
                console.log(err);
                return res.status(200).json({"status":false,"message":err});

            }
            else{
                console.log(data);
                return res.status(200).json({"status":true,"Tracking_Details":data});
            }
        })
    }
    static async addipaddress(req, res){
        var obj={
            kitname : req.body.name,
            statusValue:req.body.statusValue
        }
        new ipaddressModel(obj).save(
            function(err,data){
                if(err){
                    console.log(err);
                    return res.status(200).json({"status":false,"message":err});

                }
                else{
                    console.log(data);
                    return res.status(200).json({"status":true,"Kit Details":data, "Message":"Kit details addedd Successfully"});
                }
            }
        )

    }
    static async updatecontainerstatus(req, res){
        var query = {
            containerNumber : req.body.containerNumber,
            "BoardingPoints.place" : req.body.place
        }
        var updateDocument = {
            $set: { "BoardingPoints.$.status": req.body.status}
        };
        let filter={status :"SHIPPED-UNLOADED"};

        let orderDetails = await orderModel.find(filter)
        console.log("------------------------>",orderDetails,"----------->",orderDetails.length);
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kausic.m@eunimart.com',
                pass: 'Kausic@1224'
            }
            });
        if(orderDetails.length !=0){
            updateDocument = {
                $set: { "BoardingPoints.$.status": "Failure"}
            };
            for(let i in orderDetails){
                console.log("------------------>",i)
               let mailDetails = {
                    from: 'kausic.m@eunimart.com',
                    to: `${orderDetails[i].receiverdetails.emailid}`,
                    subject: 'ALERT MAIL REGARDING ORDER FAILURE',
                    html:  `
                        <html lang=en>
                            <body>
                                <table style="padding:35px;background-color: red;">
                                    <caption style="color: red;"><b> MMK WAREHOUSE MANAGEMENT SYSTEM</b></caption>
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
                                        <td style="background-color: #f2f8f0; color: darkblue;padding:10px">${orderDetails[i].receiverdetails.name}</td>
                                        <td style="background-color: #f2f8f0; color: darkblue;padding:10px">${orderDetails[i].orderId}</td>
                                        <td style="background-color: #f2f8f0; color: darkblue;padding:10px">${orderDetails[i].productid}</td>
                                        <td style="background-color: #f2f8f0; color: darkblue;padding:10px">${orderDetails[i].purchasedate}</td>
                                        <td style="background-color: #f2f8f0; color: darkblue;padding:10px">${orderDetails[i].orderamount}</td>
                                        <td style="background-color: #f2f8f0; color: darkblue;padding:10px">${orderDetails[i].paymentmethod}</td>
                                        <td style="background-color: #f2f8f0; color: darkblue;padding:10px">${orderDetails[i].quantity}</td>
                                        <td style="background-color: #f2f8f0; color: darkblue;padding:10px"><b style="background-color:rgb(99, 42, 231);color: #f2f8f0;">${orderDetails[i].status}</b></td>
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
                })
            }
        }
        var data1 = await containerModel.updateOne(query, updateDocument);
        return res.status(200).json({"status":false,"containerDetails":data1, "Message":"updated result"});
    }
}
module.exports=Admin;