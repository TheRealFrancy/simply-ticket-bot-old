const Discord = require('discord.js');
var fs = require('fs');
module.exports= async (msg,client) => {




    
  const botinfo =new Discord.MessageEmbed()
  
  .setColor("#FF3CC7")
  .setThumbnail(client.user.displayAvatarURL())
  .setTitle(`${client.user.username} Info`)
  .setDescription("Symply-Ticket-Bot offers a user-friendly experience based on **simple** and **automatic** commands.\nThe bot also offers different **customization** settings wich can be really useful.\nUse this __**link**__ to invite me! [Invite Link](https://discord.com/api/oauth2/authorize?client_id=837344196922834964&permissions=8&scope=bot)")
  .addField('<:botdev:809520928613859328>Developer','TheRealFrancy#4249')
  .addField('Library','Discord.js')
  .addField('Database','MongoDB')
  .addField(`Lines`,`1000+`)
  .addField(`Servers`,`${client.guilds.cache.size}`)
  .addField(`Created On`,`${client.user.createdAt}`)



  

  msg.channel.send(botinfo)










}