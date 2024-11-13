const express=require("express");const pool=require("../config");const router=express.Router();router.post("/getNextLevelExp",(req,res)=>{const{nextLevel}=req.body;if(!nextLevel){return res.status(400).json({success:false,message:"nextLevel is required"});}
pool.getConnection((err,connection)=>{if(err){console.error("Error connecting to database:",err);return res.status(500).json({success:false,message:"Error connecting to database"});}
connection.query("SELECT exp FROM levels WHERE lv = ?",[nextLevel],(err,rows)=>{if(err){console.error("Error executing query:",err);return res.status(500).json({success:false,message:"Error executing query"});}
if(rows.length===0){return res.status(404).json({success:false,message:"No experience found for the specified level"})}
return res.status(200).json({success:true,dneedexp:rows[0].exp});})
pool.releaseConnection(connection);});})
router.post("/updateExp",(req,res)=>{let{id,exp}=req.body;if(exp===null||exp===undefined){return res.status(400).json({success:false,message:"Experience cannot be null"});}
pool.getConnection((err,connection)=>{if(err){console.error("Error connecting to database:",err);return res.status(500).json({success:false,message:"Error connecting to"})}
const sql="UPDATE users SET uexp = uexp + ? WHERE uid = ?";connection.query(sql,[exp,id],(err,result)=>{if(err){console.error("Error executing query:",err);return res.status(500).json({success:false,message:"Error executing query"});}
return res.status(200).json({success:true,message:"Update experience successfully"});})
pool.releaseConnection(connection);})})
router.post("/upLevel",(req,res)=>{const{id,dlevel}=req.body;pool.getConnection((err,connection)=>{if(err){console.error("Error connecting to database:",err);return res.status(500).json({success:false,message:"Error connecting to database"});}
const sql="UPDATE users SET ulevel = ulevel + 1 , skull = skull + ? WHERE uid = ?";const query="SELECT skull FROM levels WHERE Lv = ?"
const insertsql="INSERT INTO user_rewards (uid,RewardType,RewardEvent,RewardSkull) VALUES (?,?,?,?)"
connection.query(query,[dlevel],(err,rows)=>{if(err){console.error("Error executing query:",err);return res.status(500).json({success:false,message:"Error executing query"});}
connection.query(sql,[rows[0].skull,id],(err,result)=>{if(err){console.error("Error executing query:",err);return res.status(500).json({success:false,message:"Error executing query"});}
connection.query(insertsql,[id,"3","Upgrade",rows[0].skull],(err,result)=>{if(err){console.error("Error executing query:",err);return res.status(500).json({success:false,message:"Error executing query"});}
return res.status(200).json({success:true,message:"Level up successfully",skull:rows[0].skull});})})})
pool.releaseConnection(connection);})})
router.post("/getRewards",(req,res)=>{const{id}=req.body;pool.getConnection((err,connection)=>{if(err){console.error("Error connecting to database:",err);return res.status(500).json({success:false,message:"Error connecting to database"});}
const sql="SELECT RewardType,RewardEvent,RewardSkull FROM `user_rewards` WHERE uid = ? ORDER BY time DESC LIMIT 6"
connection.query(sql,[id],(err,rows)=>{if(err){console.error("Error executing query:",err);return res.status(500).json({success:false,message:"Error executing query"});}
return res.status(200).json({success:true,rewards:rows});})
pool.releaseConnection(connection);})})
router.post("/getAttack",(req,res)=>{const{uboneid}=req.body;pool.getConnection((err,connection)=>{if(err){console.error("Error connecting to database:",err);return res.status(500).json({success:false,message:"Error connecting to database"});}
const sql="SELECT battack FROM bones WHERE bid = ?"
connection.query(sql,[uboneid],(err,rows)=>{if(err){console.error("Error executing query:",err);return res.status(500).json({success:false,message:"Error executing query"});}
return res.status(200).json({success:true,attack:rows[0].battack});})
pool.releaseConnection(connection);})})
router.post("/doubleUp",(req,res)=>{const{id,dlevel}=req.body;pool.getConnection((err,connection)=>{if(err){console.error("Error connecting to database:",err);return res.status(500).json({success:false,message:"Error connecting to database"});}
const sql="UPDATE users SET skull = skull + ? WHERE uid = ?";const query="SELECT skull FROM levels WHERE Lv = ?"
const insertsql="INSERT INTO user_rewards (uid,RewardType,RewardEvent,RewardSkull) VALUES (?,?,?,?)"
connection.query(query,[dlevel-1],(err,rows)=>{if(err){console.error("Error executing query:",err);return res.status(500).json({success:false,message:"Error executing query"});}
connection.query(sql,[rows[0].skull,id],(err,result)=>{if(err){console.error("Error executing query:",err);return res.status(500).json({success:false,message:"Error executing query"});}
connection.query(insertsql,[id,"3","Upgrade",rows[0].skull],(err,result)=>{if(err){console.error("Error executing query:",err);return res.status(500).json({success:false,message:"Error executing query"});}
return res.status(200).json({success:true,message:"Level up successfully"});})})})
pool.releaseConnection(connection);})})
module.exports=router;