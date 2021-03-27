var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
var ec2 = new AWS.EC2();
const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

const prefix = "!";

var ec2Check = {
  Filters: [
    {
      Name: "instance-state-name",
      Values: [
        "running"
      ]
    }
  ],
  InstanceIds: [
    config.INSTANCE_ID
  ]
}

var ec2RunID = {
  InstanceIds: [
    config.INSTANCE_ID
  ]
}

client.on("message", function(message) {
  if (message.author.bot) {
    return;
  }
  if (!message.content.startsWith(prefix)) {
    return;
  }
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  if (command === "start") {
    ec2.startInstances(ec2Check, function(err, data) {
        if (err) {
          console.log(err, err.stack);
        }
        else  {
          message.reply('Minecraft Creative Server has been started. Please allow 5 minutes to connect at minecraft.bagofchaos.com.');
        }
    });
  }
  if (command === "stop") {
    ec2.stopInstances(ec2RunID, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      }
      else  {
        message.reply('Minecraft Creative Server has been turned off if it is not already. Thanks for saving Sean money!');
      }
      });
  }
  if(command === "status") {
    ec2.describeInstanceStatus(ec2Check, function(err, data) {
      var status = data.InstanceStatuses;
      console.log(data.InstanceStatuses);
      if(status.length ===0) {
        message.reply("Server is currently not running.");
      }
      else {
        message.reply("Server is online!");
      }
    });
  }
});

client.login(config.BOT_TOKEN);