const Discord = require('discord.js');
module.exports= async (msg,client) => {
    const pingembed= new Discord.MessageEmbed()
    .setColor("#E9870C")
    .setDescription("calcolando....")
  
    msg.channel.send(pingembed) .then(message =>{
      const pingembednew = new Discord.MessageEmbed()
      .setColor("#E9870C")
      .addField(`**🏓ping:**`,`${client.ws.ping}ms.`,true)
      .addField(`**✉latency:**`,`${message.createdTimestamp - msg.createdTimestamp}ms.`,true)
      .setTimestamp()
      message.edit(pingembednew)
  
  
    })








}