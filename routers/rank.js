const express=require("express");const pool=require("../config");const router=express.Router();router.post("/ranking",(req,res)=>{const{id}=req.body;if(!id){return res.status(400).json({success:false,message:"Missing id"});}
pool.getConnection((err,connection)=>{if(err){console.error("Error connecting to the database:",err);return res.status(500).json({success:false,message:"Error connecting to the database"});}
const queryTop20=`SELECT uid,uname,skull,uexp FROM users ORDER BY skull DESC LIMIT 50`;const queryUser=`SELECT u.uid, u.skull, u.uname, (SELECT COUNT(*)  FROM users WHERE skull >= u.skull) AS ranking FROM users u WHERE uid = ?`;connection.query(queryTop20,(err,results)=>{if(err){console.error("Error executing the query:",err);return res.status(500).json({success:false,message:"Error executing the query"});}
connection.query(queryUser,[id],(err,userResults)=>{if(err){console.error("Error executing the query:",err);return res.status(500).json({success:false,message:"Error executing the query"});}
res.json({top20:results,user:userResults[0]});});});pool.releaseConnection(connection);});});router.get("/getUserCount",(req,res)=>{pool.getConnection((err,connection)=>{if(err){console.error("Error connecting to the database:",err);return res.status(500).json({success:false,message:"Error connecting to the database"});}
const query=`SELECT COUNT(*) AS userCount FROM users`;connection.query(query,(err,results)=>{if(err){console.error("Error executing the query:",err);return res.status(500).json({success:false,message:"Error executing the query"});}
res.json({userCount:results[0].userCount});});pool.releaseConnection(connection);})})
module.exports=router;