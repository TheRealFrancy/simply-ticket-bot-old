const Discord = require('discord.js');

const MongoClient = require('mongodb');

module.exports= async (msg) => {
const db = await MongoClient.connect('', { useNewUrlParser: true, useUnifiedTopology: true })
  const dbo = db.db('simply-ticket');
  const unblockmember = msg.mentions.members.first();
  if (!unblockmember) return msg.channel.send("❌missing value ")
  let guildbanunblock = { mark:"guildban" }
  let guildbanunblock1 = await dbo.collection("guildban").findOne(guildbanunblock)
  if(guildbanunblock1.guildbanned.includes(msg.guild.id)) return msg.channel.send("❌this server is banned")
  if(!unblockmember) return msg.channel.send("❌missing value")
 


  dbo.collection("info").updateOne({guildid:`${msg.guild.id}`},{$pull:{ blocked:`${unblockmember.id}`}})
 
 
   msg.inlineReply(` <a:check:806919891462520912>  ${unblockmember}has been unlocked from tickets`)
 

}
