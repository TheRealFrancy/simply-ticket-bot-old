const Discord = require('discord.js');

const MongoClient = require('mongodb');

module.exports= async (msg) => {
const db = await MongoClient.connect('', { useNewUrlParser: true, useUnifiedTopology: true })
const dbo = db.db('simply-ticket');
let guildbanblock = { mark:"guildban" }
let guildbanblock1 = await dbo.collection("guildban").findOne(guildbanblock)
if(guildbanblock1.guildbanned.includes(msg.guild.id)) return msg.channel.send("❌this server is banned")


   const blockmember = msg.mentions.members.first();
   if (!blockmember) return msg.channel.send("❌missing value ")
  let blockuser1 = { guildid: `${msg.guild.id}` }
  let blockuser2 = {  $push: { blocked: `${blockmember.id}` } };
 dbo.collection("info").updateOne(blockuser1, blockuser2)
 


  


  msg.inlineReply(` <a:check:806919891462520912> ${blockmember}has been blocked by tickets`)
 

}
