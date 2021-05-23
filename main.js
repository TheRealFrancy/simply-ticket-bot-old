const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION', 'CHANNEL'] });
const MongoClient = require('mongodb');
const config = require('./config.json');
require('./inlineReply.js')
const fetch = require('node-fetch');
var fs = require('fs');





const setprefix = require('./commands/setprefix');
const currentset = require('./commands/currentset');
const block = require('./commands/block');
const unblock = require('./commands/unblock');
const { Server } = require('http');
const ping = require('./commands/ping');
const info = require('./commands/info');
const help = require('./commands/help');
const ticket = require('./commands/ticket');




client.on('guildCreate', async guild => {
  const db = await MongoClient.connect('mongodb+srv://therealfrancydev:Andefran2001@francymaincluster.opxrg.mongodb.net/simply-ticket?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

  const dbo = db.db('simply-ticket');


  var setobj = { guildid: `${guild.id}`, prefix: "t!", maincategory: "", staff: "", user: "", blocked: [], channellog: "", activeticket: [], ticketopen: "", lockstatus: "" };
  dbo.collection("info").insertOne(setobj)
  guild.systemChannel.send("📣thanks for adding me I'm configuring the database wait a moment... for more information use the 'help' command")
  if (!guild.systemChannel) return console.log(`${guild.id}non ha un systemchannel  `)





})

client.on('guildDelete', async guild => {
  const db = await MongoClient.connect('mongodb+srv://therealfrancydev:Andefran2001@francymaincluster.opxrg.mongodb.net/simply-ticket?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

  const dbo = db.db('simply-ticket');


  let deletequery = { guildid: `${guild.id}` }
  dbo.collection("info").deleteOne(deletequery)
  console.log(`ho eliminato ${guild.id} dal sistema`)






})

client.on('ready', async () => {



  const db = await MongoClient.connect('mongodb+srv://therealfrancydev:Andefran2001@francymaincluster.opxrg.mongodb.net/simply-ticket?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  const dbo = db.db('simply-ticket');
  console.log(`bot online `);





  client.on('message', async msg => {

    //mention for info
    if (msg.content == '<@!837344196922834964>') {

      let prefixnow = { guildid: `${msg.guild.id}` }
      let prefixnowget = await dbo.collection("info").findOne(prefixnow)

      const mentioninfo = new Discord.MessageEmbed()
        .setColor('#FF3CC7')
        .setTitle(`hi my prefix prefix is:${prefixnowget.prefix}`)
        .setDescription(`Write ${prefixnowget.prefix}help for more command   `)

      msg.channel.send(mentioninfo);


    }//end mention for info





   
    let prefixnowget1 = await dbo.collection("info").findOne({ guildid: `${msg.guild.id}` })
   
    if (!dbo.collection("info").findOne({ guildid: `${msg.guild.id}` }, { "prefixnowget1.prefix": { $exists: true } })) return

    var prefix = prefixnowget1.prefix;


    if (!msg.content.startsWith(prefix)) return;
    const args = msg.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase();





    //set prefix 
    if (cmd == 'setprefix' && msg.member.hasPermission('ADMINISTRATOR')) {
      setprefix(msg)
    }//end set prefix


    // currentset
    if (cmd == 'currentset' && msg.member.hasPermission('MANAGE_MESSAGES')) {
      currentset(msg)


    }//end currentset


    // setup

    if (cmd == 'setup' && msg.member.hasPermission('ADMINISTRATOR')) {
      let guildbanmaincategory = { mark: "guildban" }
      let guildbanmaincategory1 = await dbo.collection("guildban").findOne(guildbanmaincategory)
      if (guildbanmaincategory1.guildbanned.includes(msg.guild.id)) return msg.channel.send("❌this server is banned")

      var categoryset1 = { guildid: `${msg.guild.id}` };
      var categoryset2 = await dbo.collection("info").findOne(categoryset1)

      if ((categoryset2.staff === "") && (categoryset2.user === "")) return msg.channel.send("❌you need to configure the roles first ");
      if (categoryset2.staff === "") return msg.channel.send("❌you must first configure the staff role");
      if (categoryset2.user === "") return msg.channel.send("❌you must first configure the user role");

      if ((msg.guild.channels.cache.find(channel => channel.name === 'ticket-log')) && (msg.guild.channels.cache.find(channel => channel.name === 'ticket-open')) && (msg.guild.channels.cache.find(category => category.name === 'ticket-category'))) {
        msg.channel.send("❌channels already set")
        return
      }

      msg.guild.channels.create(`ticket-category`, {
        reason: 'ticket category',
        type: 'category',
        permissionOverwrites: [{
          id: categoryset2.staff,
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_CHANNELS', 'READ_MESSAGE_HISTORY']


        }, {
          id: categoryset2.user,
          deny: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']



        }]




      }).then(channel => {
        let maincategory1 = { guildid: `${msg.guild.id}` }
        let maincategory2 = { $set: { maincategory: `${channel.id}` } };
        dbo.collection("info").updateOne(maincategory1, maincategory2)


      })
      // fin set category

      setTimeout(async () => {



        var log1 = { guildid: `${msg.guild.id}` };
        var log2 = await dbo.collection("info").findOne(log1)

        await msg.guild.channels.create(`ticket-log`, {
          reason: 'log-channel',
          parent: log2.maincategory,
          permissionOverwrites: [{
            id: log2.staff,
            allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']



          }, {
            id: log2.user,
            deny: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']


          }]




        }).then(channel => {
          let log3 = { guildid: `${msg.guild.id}` }
          let log4 = { $set: { channellog: `${channel.id}` } };
          dbo.collection("info").updateOne(log3, log4)


        })
        // fine set log



        var open1 = { guildid: `${msg.guild.id}` };
        var open2 = await dbo.collection("info").findOne(open1)

        await msg.guild.channels.create(`ticket-open`, {
          reason: 'open-ticket',
          parent: open2.maincategory,
          permissionOverwrites: [{
            id: open2.staff,
            allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']



          }, {
            id: open2.user,
            allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
            deny: ['SEND_MESSAGES', 'ADD_REACTIONS']



          }]




        }).then(channel => {
          let open3 = { guildid: `${msg.guild.id}` }
          let open4 = { $set: { ticketopen: `${channel.id}` } };
          dbo.collection("info").updateOne(open3, open4)

          const ticketopen = new Discord.MessageEmbed()
            .setColor("#d946db")
            .setTitle("click on the reaction  📧 to open a ticket")
            .setFooter(" the staff will answer you as soon as possible ")

          channel.send(ticketopen).then(msg => {

            msg.react("📧")



          })
        })
        // fine set open ticket
      }, 2000);



      msg.inlineReply("<a:check:806919891462520912>setup completed")
    }// fine if setup





    //set staff role

    if (cmd == `setstaffrole` && msg.member.hasPermission('ADMINISTRATOR')) {
      let guildbansetstaffrole = { mark: "guildban" }
      let guildbansetstaffrole1 = await dbo.collection("guildban").findOne(guildbansetstaffrole)
      if (guildbansetstaffrole1.guildbanned.includes(msg.guild.id)) return msg.channel.send("❌this server is banned")

      let staffrole = msg.mentions.roles.first()
      if (!staffrole) return msg.channel.send("❌missing value ")
      let staffrole1 = { guildid: `${msg.guild.id}` }
      let staffrole2 = { $set: { staff: `${staffrole.id}` } };
      dbo.collection("info").updateOne(staffrole1, staffrole2)
      msg.inlineReply("<a:check:806919891462520912>staff role set")





    }//end set staff role 

    //set userrole

    if (cmd == `setuserrole` && msg.member.hasPermission('ADMINISTRATOR')) {
      let guildbansetuser = { mark: "guildban" }
      let guildbansetuser1 = await dbo.collection("guildban").findOne(guildbansetuser)
      if (guildbansetuser1.guildbanned.includes(msg.guild.id)) return msg.channel.send("❌this server is banned")

      let userrole = msg.content.trim().split(' ');
      if (!userrole[1]) return msg.channel.send("❌missing value ")
      if (userrole[1] == "everyone") {
        userrole = msg.guild.roles.everyone


      } else {

        userrole = msg.mentions.roles.first()
      }


      let userrole1 = { guildid: `${msg.guild.id}` }
      let userrole2 = { $set: { user: `${userrole.id}` } };

      dbo.collection("info").updateOne(userrole1, userrole2)

      msg.inlineReply("<a:check:806919891462520912>user role set")





    }// end user role






    //help

    if (cmd == 'help') {
      help(msg)



    }// fine help



    //eval

    if (cmd == 'eval' && msg.author.id === '442740557169819658') {

      const code = msg.content.split(" ").slice(1).join(" ")
      if (!code) {
        msg.channel.send("codice da evaluare mancante")
        return;

      }

      const resul = eval(code);

      const evalEmbed = new Discord.MessageEmbed()
        .setColor("#13fc03")
        .addField("📥", "```\n" + code + "\n```")
        .addField("📤", "```js\n" + resul + "\n```")
      msg.channel.send(evalEmbed)




    } else if (!msg.author.id === '442740557169819658') {
      const evaerror = new Discord.MessageEmbed()
        .setColor('#f50000')
        .setTitle("you do not have permission for use this command.")

      msg.channel.send(evaerror);

    }// end evela

    //block
    if (cmd == `block` && msg.member.hasPermission('ADMINISTRATOR')) {

      block(msg)
    }
    //end block


    // unblock
    if (cmd == `unblock` && msg.member.hasPermission('ADMINISTRATOR')) {

      unblock(msg)

    }
    //end unblock


    // trenscript

    if (cmd == `transcript` && msg.member.hasPermission('MANAGE_MESSAGES')) {
      let guildbantrans = { mark: "guildban" }
      let guildbantrans1 = await dbo.collection("guildban").findOne(guildbantrans)
      if (guildbantrans1.guildbanned.includes(msg.guild.id)) return msg.channel.send("❌this server is banned")

      var transcript1 = { guildid: `${msg.guild.id}` };
      var transcript2 = await dbo.collection("info").findOne(transcript1)


      if (!transcript2.activeticket.includes(msg.channel.id)) return msg.channel.send("❌you cannot transcribe to this channel.")

      const headers = {
        "Authorization": `Bot ${config.BOT_TOKEN}`



      }


      fetch(`https://discordapp.com/api/channels/${msg.channel.id}/messages?limit=100`, { headers: headers })
        .then(res => res.json())
        .then(json => {



          json.forEach(async function (obj) {
            await fs.appendFile('msg.txt', `${obj.author.username}-${obj.content}\n`, function (err, files) { if (err) throw err; });




          })

          msg.channel.send("<a:check:806919891462520912> Here is the chat transcript.", {
            files: [
              "msg.txt"

            ]
          });

          setTimeout(() => {
            fs.unlink('msg.txt', function (err) {
              if (err) throw err;

            });


          }, 5000);


        })// fine then json



    }//fine parentesi transcript 






    // close ticket
    if (cmd == `closeticket`) {
      let guildbancloseticket = { mark: "guildban" }
      let guildbancloseticket1 = await dbo.collection("guildban").findOne(guildbancloseticket)
      if (guildbancloseticket1.guildbanned.includes(msg.guild.id)) return msg.channel.send("❌this server is banned")


      var forceclose1 = { guildid: `${msg.guild.id}` };
      var forceclose2 = await dbo.collection("info").findOne(forceclose1)
      if (!forceclose2.activeticket.includes(msg.channel.id)) return msg.channel.send("❌this is not an active ticket so you cannot cancel it")




      const deleteembed = new Discord.MessageEmbed()
        .setColor("#FF3CC7")
        .setTitle("you really want to delete this ticket?")
        .setDescription("click on the reaction ✔️")
        .setFooter("ignore this message if you don't want to close the ticket")
      msg.channel.send(deleteembed).then(msg => {
        msg.react("✔️")
        let filtro1 = (reaction) => ["✔️"].includes(reaction.emoji.name);
        msg.awaitReactions(filtro1, { max: 2 }).then(collected => {
          let reazione1 = collected.first().emoji.name;
          if (reazione1 == "✔️") {
            dbo.collection("info").updateOne({ guildid: `${msg.guild.id}` }, { $pull: { activeticket: `${msg.channel.id}` } })

            let forcecloselog = client.channels.cache.get(forceclose2.channellog)
            const logembed = new Discord.MessageEmbed()
              .setColor("#ff8438")
              .setTitle(` log ${msg.channel.name}`)
              .setDescription("ticket closed")
              .setFooter(`${msg.channel.id}`)
              .setTimestamp()
            forcecloselog.send(logembed)





            const headers = {
              "Authorization": `Bot ${config.BOT_TOKEN}`



            }


            fetch(`https://discordapp.com/api/channels/${msg.channel.id}/messages?limit=100`, { headers: headers })
              .then(res => res.json())
              .then(json => {



                json.forEach(async function (obj) {
                  await fs.appendFile('msg.txt', `${obj.author.username}-${obj.content}\n`, function (err, files) { if (err) throw err; });




                })

                forcecloselog.send("", {
                  files: [
                    "msg.txt"

                  ]
                });

                setTimeout(() => {
                  fs.unlink('msg.txt', function (err) {
                    if (err) throw err;

                  });


                }, 3000);


              })// fine then json


            setTimeout(() => {
              msg.channel.delete()

            }, 5000);

          }

        })
      })
    }// fine if force close


    // features

    if (cmd == 'features' && msg.member.hasPermission('ADMINISTRATOR')) {
      let guildbanlockstatus = { mark: "guildban" }
      let guildbanlockstatus1 = await dbo.collection("guildban").findOne(guildbanlockstatus)
      if (guildbanlockstatus1.guildbanned.includes(msg.guild.id)) return msg.channel.send("❌this server is banned")


      const lockstatus = msg.content.trim().split(' ')




      if (!lockstatus[1]) return msg.channel.send("❌missing value specification with on / off")

      if ((lockstatus[1] == "on") || (lockstatus[1] == "off")) {
        let lockstatus1 = { guildid: `${msg.guild.id}` }
        let lockstatus2 = { $set: { lockstatus: `${lockstatus[1]}` } };
        await dbo.collection("info").updateOne(lockstatus1, lockstatus2)
        msg.inlineReply(`<a:check:806919891462520912>features set to **${lockstatus[1]}**`)
      } else {
        msg.channel.send("❌you cannot enter this value")


      }

    }
    // end features
    // status

    if (cmd == 'status' && msg.member.hasPermission('MANAGE_MESSAGES')) {
      var features = { guildid: `${msg.guild.id}` };
      var features2 = await dbo.collection("info").findOne(features)


      if (features2.lockstatus == "on") {

        statofeatures = "🟢"



      }


      if (features2.lockstatus == "off") {

        statofeatures = "🔴"
      } else {

        statofeatures = ""
      }


      const featuresembe = new Discord.MessageEmbed()
        .setColor("#2fcc66")
        .setTitle(`**functionality status.**`)
        .setDescription(`**ticket:**${statofeatures}`)


        .setTimestamp()
      msg.inlineReply(featuresembe)



    }

    // end status

    // guildban

    if (cmd == 'guildban' && msg.author.id === '442740557169819658') {
      const guildbanid = msg.content.trim().split(' ')
      if (!guildbanid[1]) return msg.channel.send("❌valore mancante ")
      let guildban1 = { mark: "guildban" }



      let guildban2 = { $push: { guildbanned: `${guildbanid[1]}` } };
      await dbo.collection("guildban").updateOne(guildban1, guildban2)
      msg.inlineReply(` ho bannato ${guildbanid[1]} dal sistema`)


    }// end guild ban

    // guild unban

    if (cmd == 'guildunban' && msg.author.id === '442740557169819658') {
      const guildunbanid = msg.content.trim().split(' ')
      if (!guildunbanid[1]) return msg.channel.send("❌valore mancante ")




      dbo.collection("guildban").updateOne({ mark: "guildban" }, { $pull: { guildbanned: `${guildunbanid[1]}` } })

      msg.inlineReply(` ho sbannato ${guildunbanid[1]} dal sistema`)


    }//end guild unbam


    //ping
    if (cmd == 'ping') {
      ping(msg, client)



    }//end ping
    // info
    if (cmd == 'info') {


      info(msg, client)


    }// fine info

    //findban

    if (cmd == 'findban' && msg.author.id === '442740557169819658') {

      var findban = { mark: "guildban" };
      var findban1 = await dbo.collection("guildban").findOne(findban)

      const findbanid = msg.content.trim().split(' ')
      if (!findbanid[1]) return msg.channel.send("❌valore mancante ")

      if (findban1.guildbanned.includes(findbanid[1])) {

        msg.channel.send("<:yes:757282047348703393> ho trovato questa guild nella lista ban")


      } else {

        msg.channel.send("❌non  ho trovato questa guild nella lista ban")



      }







    }// end find ban

    // find block
    if (cmd == 'findblock' && msg.member.hasPermission('MANAGE_MESSAGES')) {

      var findblock = { guildid: `${msg.guild.id}` };
      var findblock1 = await dbo.collection("info").findOne(findblock)

      const findblockid = msg.content.trim().split(' ')
      if (!findblockid[1]) return msg.channel.send("❌missing value ")

      if (findblock1.blocked.includes(findblockid[1])) {

        msg.channel.send("<:yes:757282047348703393> I found this user in the blocked list")


      } else {

        msg.channel.send("❌I did not find this user in the blocked list")



      }
    }//end find block
















  })//parentesi client on msg



})//parentesi client on ready

//------------
ticket(client)

//------------


client.login(config.BOT_TOKEN)
