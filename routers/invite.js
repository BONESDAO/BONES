const express=require("express");const pool=require("../config");const router=express.Router();router.post("/checkInviteCode",(req,res)=>{const{id}=req.body;if(!id){return res.status(400).json({success:false,message:"ID is required"});}
pool.getConnection((err,connection)=>{if(err){console.error("Error connecting to database:",err);return res.status(500).json({success:false,message:"Error connecting to the database"});}
const selectQuery="SELECT uinvitecode FROM users WHERE uid = ?";connection.query(selectQuery,[id],(selectError,selectResults)=>{if(selectError){console.error("Error querying database:",selectError);return res.status(500).json({success:false,message:"Error querying the database"});}
console.log("selectResults:",selectResults);const inviteCode=selectResults[0].uinvitecode;if(!inviteCode){res.json({success:false,message:"No invite code found"});}else{res.json({success:true,inviteCode});}});pool.releaseConnection(connection);});});router.post("/generateInviteCode",(req,res)=>{const{id}=req.body;if(!id){return res.status(400).json({success:false,message:"ID is required"});}
const inviteCode=Math.random().toString(36).substring(2,8).toUpperCase();pool.getConnection((err,connection)=>{if(err){console.error("Error connecting to database:",err);return res.status(500).json({success:false,message:"Error connecting to the database"});}
const upsertQuery=`
        INSERT INTO users (uid, uinviteCode)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE uinviteCode = VALUES(uinviteCode)
      `;connection.query(upsertQuery,[id,inviteCode],(upsertError)=>{if(upsertError){console.error("Error upserting database:",upsertError);return res.status(500).json({success:false,message:"Error updating the database"});}
res.json({success:true,inviteCode});});pool.releaseConnection(connection);});});router.post("/getInvitedUsers",(req,res)=>{const{inviteCode}=req.body;if(!inviteCode){return res.status(400).json({success:false,message:"Invite code is required"});}
pool.getConnection((err,connection)=>{if(err){console.error("Error connecting to database:",err);return res.status(500).json({success:false,message:"Error connecting to the database"});}
const selectQuery="SELECT uid, uname FROM users WHERE uacceptcode = ?";connection.query(selectQuery,[inviteCode],(selectError,selectResults)=>{if(selectError){console.error("Error querying database:",selectError);return res.status(500).json({success:false,message:"Error querying the database"});}
res.json({success:true,invitedUsers:selectResults});});pool.releaseConnection(connection);});});module.exports=router;