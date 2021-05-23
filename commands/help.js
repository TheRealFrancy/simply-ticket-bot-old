const Discord = require('discord.js');



module.exports= async (msg) => {

 
    const helpembed = new Discord.MessageEmbed()

    .setColor("#FF3CC7")
    .setDescription("help menu:")
    .addField(`1️⃣`, "``` info ```")
    .addField(`2️⃣`, "``` setup ```")
    .addField(`3️⃣`, "``` admin ```")
    .addField(`4️⃣`, "``` other ```")



  msg.channel.send(helpembed).then(msg => {

    msg.react("1️⃣")
    msg.react("2️⃣")
    msg.react("3️⃣")
    msg.react("4️⃣")

   
    let number1 = (reaction) => ["1️⃣"].includes(reaction.emoji.name);
    msg.awaitReactions(number1, { max: 2 }).then(collected => {
      let reazione1 = collected.first().emoji.name;
      if (reazione1 == "1️⃣") {
      const infoembed = new Discord.MessageEmbed()
      .setColor("#FF3CC7")
      .setDescription("**info command**")
      .addField("help ", `shows all commands of the bot `)
      .addField(" currentset", `shows all server related settings`)
      .addField("status", `shows the status of the features `)
      .addField("ping", `shows the ping of the bot `)
      .addField(" info", `shows some info about the bot `)
    msg.edit(infoembed)
      }})


  
    
        



   


    let number2 = (reaction) => ["2️⃣"].includes(reaction.emoji.name);
    msg.awaitReactions(number2, { max: 2 }).then(collected => {
      let reazione2 = collected.first().emoji.name;
      if (reazione2 == "2️⃣") {

        const setupembed = new Discord.MessageEmbed()
          .setColor("#FF3CC7")
          .setDescription("**setup command**")
          .addField("setprefix ", `change the bot prefix `)
          .addField(" setup", `set necessary channels / category  `)
          .addField("setstaffrole", `set staff role`)
          .addField("setuserrole", `set user role `)

        msg.edit(setupembed)



      }
    })


    let number3 = (reaction) => ["3️⃣"].includes(reaction.emoji.name);
    msg.awaitReactions(number3, { max: 2 }).then(collected => {
      let reazione3 = collected.first().emoji.name;
      if (reazione3 == "3️⃣") {

        const adminembed = new Discord.MessageEmbed()
          .setColor("#FF3CC7")
          .setDescription("**admin command**")
          .addField("eval ", `executes code **ONLY OWNER**`)
          .addField(" block", `block user from tickets  `)
          .addField("unblock", `unblock user from tickets`)
          .addField("features", `disable bot functionality `)
          .addField("guildban ", `ban a server from the system **ONLY OWNER**`)
          .addField("guildunban", `unban a server from the system **ONLY OWNER** `)
          .addField("findban", `search banned server **ONLY OWNER** `)
          .addField("findblock", `search blocked user `)

        msg.edit(adminembed)


      }
    })


    let number4 = (reaction) => ["4️⃣"].includes(reaction.emoji.name);
    msg.awaitReactions(number4, { max: 2 }).then(collected => {
      let reazione4 = collected.first().emoji.name;
      if (reazione4 == "4️⃣") {
        const otherembed = new Discord.MessageEmbed()
          .setColor("#FF3CC7")
          .setDescription("**other command**")
          .addField("closeticket ", `close a tickets `)
          .addField(" transcript", `saves the last 100 messages of a ticket in a .txt file  `)


        msg.edit(otherembed)







      }
    })


  })
    


}