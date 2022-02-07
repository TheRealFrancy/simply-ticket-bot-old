const Discord = require('discord.js');

const MongoClient = require('mongodb');

module.exports= async (msg) => {
const db = await MongoClient.connect('', { useNewUrlParser: true, useUnifiedTopology: true })
  const dbo = db.db('simply-ticket');
 
  var currentset1= { guildid: `${msg.guild.id}` };
      var currentset2 = await dbo.collection("info").findOne(currentset1)

    
//---
if(currentset2.channellog){

 channeloghelp=msg.guild.channels.cache.get(currentset2.channellog).toString()
}else{

  channeloghelp="no'log channel' set"
}
//---
if(currentset2.maincategory){

 maincategoryhelp=msg.guild.channels.cache.get(currentset2.maincategory).toString()
 }else{
 
   maincategoryhelp="no 'category' set "
 }

 if(currentset2.ticketopen){

 ticketopenhelp=msg.guild.channels.cache.get(currentset2.ticketopen).toString()
  }else{
  
   ticketopenhelp="no' open tickets' set"
  }



  if(currentset2.staff){

    staffhelp=msg.guild.roles.cache.get(currentset2.staff).toString()
     }else{
     
      staffhelp="no staff roles set"
     }

     if(currentset2.user){

    userhelp=msg.guild.roles.cache.get(currentset2.user).toString()
       }else{
       
       userhelp="no user roles set"
       }
       let guildbaninfostatus = { mark:"guildban" }
       let guildbaninfostatus1 = await dbo.collection("guildban").findOne(guildbaninfostatus)

       if(guildbaninfostatus1.guildbanned.includes(msg.guild.id)){

        banstatus="❌this server is banned"
       }else{
         banstatus="✅ this server is not banned"
        
       }


   let currentsetembe= new Discord.MessageEmbed()
   .setColor("#AF37F0")
   .setTitle("current settings")
   .addField(`Guild Id`,`${currentset2.guildid}`)
   .addField(`Log Channel ID`,`${channeloghelp}`)
   .addField(`Main Category Id`,`${maincategoryhelp}`)
   .addField(`Ticket Open Channel`,`${ticketopenhelp}`)
   .addField(`Staff Roles `,`${staffhelp}`)
   .addField(`User Roles `,`${userhelp}`)
   .addField(`Prefix`,` ${currentset2.prefix}`)
   .addField(`${currentset2.blocked.length}`,` Blocked Users`)
   .addField(`Ban Status`,`${banstatus} `)
   


      
      
      
      
      
      
     msg.channel.send(currentsetembe)

}
