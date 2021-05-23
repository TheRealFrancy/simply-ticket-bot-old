const Discord = require('discord.js');

const MongoClient = require('mongodb');

module.exports= async (msg) => {
const db = await MongoClient.connect('mongodb+srv://therealfrancydev:Andefran2001@francymaincluster.opxrg.mongodb.net/simply-ticket?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  const dbo = db.db('simply-ticket');
 
  let guildbanprefix = { mark:"guildban" }
  let guildbanprefix1 = await dbo.collection("guildban").findOne(guildbanprefix)
  if(guildbanprefix1.guildbanned.includes(msg.guild.id)) return msg.channel.send("❌this server is banned")
  

  const editprefix = msg.content.trim().split(' ');
  if (!editprefix[1]) return msg.channel.send("❌missing value ")
  let prefixold = { guildid: `${msg.guild.id}` }
  let prefixnew = { $set: { prefix: `${editprefix[1]}` } };
  dbo.collection("info").updateOne(prefixold, prefixnew)

  await msg.inlineReply(`<a:check:806919891462520912> I set the new prefix to **${editprefix[1]}  **`)

}