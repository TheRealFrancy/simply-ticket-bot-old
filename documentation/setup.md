---
description: how to set up the bot
---

# setup

when the bot enters the server it will automatically configure the database and send a message in the `systemachannel` of the configuration at that point you are ready to use the bot.

![](../.gitbook/assets/image%20%285%29.png)

if there is no `systemchannel` set it will simply send a log to the owner, to set up a `systemchannel` look [faq](../faq.md#how-i-set-up-a-systemchannel)

### now you can configure the roles `(administrative permission required)`

#### set staff role

the staff role identifies who must respond to user requests in tickets and also identifies who can execute bot commands.  
to configure the staff role use the `setstaffrole` command and mention the role example in image:  


![](../.gitbook/assets/image%20%2816%29.png)

### configure the user role `(administrative permission required)`

the users role identifies the users of the server.  
to configure the user role use the `setuserrole` command.  
here are two options:

#### configure the users role on everyone

![](../.gitbook/assets/image%20%2817%29.png)

#### configure the users role to a different role

![it just needs to be mentioned](../.gitbook/assets/image%20%287%29.png)

#### configure the necessary channels `(administrative permission required)`

to configure the channels use the `setup` command within a few seconds you should see this  


![](../.gitbook/assets/image%20%2814%29.png)

### configure the bot prefix `(administrative permission required)`

to configure the bot prefix use `setprefix` command see example image  


![](../.gitbook/assets/image%20%283%29.png)

