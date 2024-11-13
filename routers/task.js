const express=require("express");const pool=require("../config");const router=express.Router();router.get("/",(req,res)=>{pool.getConnection((err,connection)=>{if(err){console.error("Error connecting to database:",err);return res.status(500).json({success:false,message:"Error connecting to database"});}
connection.query("SELECT * FROM tasks",(err,result)=>{if(err){console.error("Error executing query:",err);}
res.json({success:true,tasks:result});pool.releaseConnection(connection);})})})
router.post("/finish",(req,res)=>{const{id}=req.body;if(!id){return res.status(400).json({success:false,message:"Missing id"});}
pool.getConnection((err,connection)=>{if(err){console.error("Error connecting to database:",err);return res.status(500).json({success:false,message:"Error connecting to database"});}
connection.query("SELECT tid FROM `user_have_tasks` WHERE uid = ?",[id],(err,result)=>{if(err){console.error("Error executing query:",err);return res.status(500).json({success:false,message:"Error executing query"});}
res.json({success:true,tasks:result});})
pool.releaseConnection(connection);});});router.post("/complete",(req,res)=>{const{id,tid,skull}=req.body;if(!id||!tid){return res.status(400).json({success:false,message:"Missing id or tid"});}
pool.getConnection((err,connection)=>{if(err){console.error("Error connecting to database:",err);}
const sql="INSERT INTO `user_have_tasks` (uid, tid, timestamp) VALUES (?, ?, NOW())";const updateSkull="UPDATE users SET skull = skull + ? WHERE uid = ?";const insertsql="INSERT INTO `user_rewards` (uid, RewardType, RewardEvent, RewardSkull) VALUES (?, ?, ?, ?)";connection.query(sql,[id,tid],(err,result)=>{if(err){console.error("Error inserting data:",err);return res.status(500).json({success:false,message:"Error inserting data"});}
connection.query(updateSkull,[skull,id],(err,result)=>{if(err){console.error("Error updating skull:",err);return res.status(500).json({success:false,message:"Error updating skull"});}
connection.query(insertsql,[id,4,"Task",skull],(err,result)=>{if(err){console.error("Error inserting data:",err);return res.status(500).json({success:false,message:"Error inserting data"});}
res.json({success:true,message:"Task completed successfully"});pool.releaseConnection(connection);});});});});});module.exports=router;