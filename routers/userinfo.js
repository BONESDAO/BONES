const express=require("express");const pool=require("../config");const router=express.Router();router.post("/nameAndLevel",(req,res)=>{console.log("获取用户昵称和等级req.query:",req.body);const{id}=req.body;if(!id){return res.status(400).json({success:false,message:"Missing id"});}
pool.getConnection((err,connection)=>{if(err){console.error("Error connecting to database:",err);return res.status(500).json({success:false,message:"Error connecting to database"});}
connection.query("SELECT uname, ulevel FROM users WHERE uid = ?",[id],(err,result)=>{if(err){console.error("Error executing query:",err);return res.status(500).json({success:false,message:"Error executing query"});}
res.json({success:true,data:result[0]});});pool.releaseConnection(connection);});});router.post("/points",(req,res)=>{console.log("获取用户积分req.query:",req.body);const{id}=req.body;if(!id){return res.status(400).json({success:false,message:"Missing id"});}
pool.getConnection((err,connection)=>{if(err){console.error("Error connecting to database:",err);return res.status(500).json({success:false,message:"Error connecting to database"});}
connection.query("SELECT utop FROM users WHERE uid = ?",[id],(err,result)=>{if(err){console.error("Error executing query:",err);return res.status(500).json({success:false,message:""})}
res.json({success:true,data:result[0]});})
pool.releaseConnection(connection);});});module.exports=router;