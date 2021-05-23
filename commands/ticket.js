const Discord = require('discord.js');

const MongoClient = require('mongodb');

module.exports= async (client) => {

    client.on("messageReactionAdd", async function (messageReaction, user) {
        const db = await MongoClient.connect('mongodb+srv://therealfrancydev:Andefran2001@francymaincluster.opxrg.mongodb.net/simply-ticket?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
      
        const dbo = db.db('simply-ticket');
        let reaction1 = { guildid: `${messageReaction.message.guild.id}` };
        let reaction2 = await dbo.collection("info").findOne(reaction1)
        let guildbanopenticket = { mark: "guildban" }
        let guildbanopenticket1 = await dbo.collection("guildban").findOne(guildbanopenticket)
        if (guildbanopenticket1.guildbanned.includes(messageReaction.message.guild.id)) return  
      
      
        if (reaction2.lockstatus === "off") return
      
      
      
      
      
      
      
      
        if (reaction2.blocked.includes(user.id)) return 
      
        if (user.bot) return;
        if (messageReaction.message.partial) await messageReaction.message.fetch();
      
      
        if (messageReaction._emoji.name == "📧") {
          if (messageReaction.message.channel.id == `${reaction2.ticketopen}`) {
            messageReaction.users.remove(user);
            var server = messageReaction.message.channel.guild;
            if (server.channels.cache.find(canale => canale.topic == `${user.id}`)) return messageReaction.users.remove(user);
      
      
            server.channels.create(`ticket-${user.username}`, {
              type: "text",
              reason: 'ticket',
      
      
            }).then(canale => {
      
              let reaction3 = { $push: { activeticket: `${canale.id}` } };
              dbo.collection("info").updateOne(reaction1, reaction3)
              canale.setParent(reaction2.maincategory);
              canale.setTopic(user.id)
              canale.overwritePermissions([
                {
                  id: reaction2.user,
                  deny: ["VIEW_CHANNEL"]
      
      
                }, {
                  id: user.id,
                  allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
      
      
                }, {
                  id: reaction2.staff,
                  allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
      
      
                }
      
      
              ])
              const ticketembed1 = new Discord.MessageEmbed()
                .setColor("#FF3CC7")
                .setTitle(` hi ${user.username} here is your ticket`)
      
                .setFooter(` write${reaction2.prefix}closeticket for close this ticket. `)
                .setTimestamp()
              canale.send(ticketembed1)
            })
      
          }
        }
      
      })





}