var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
var ec2 = new AWS.EC2();
const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

const prefix = "!";

var ec2params = {
  InstanceIds: [
    config.INSTANCE_ID
  ]
}

var serverStatus = function() {
  ec2.describeInstanceStatus(ec2params, function(err, data) {
    if(data.InstanceStatuses[0] == undefined) {
      return false; 
    }
    if(data.InstanceStatuses[0].InstanceState.Name === "running") {
      console.log("serverStatus true");
      return true; 
    }
  });
}

client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  if (command === "start") {
    ec2.startInstances(ec2params, function(err, data) {
        if (err) {
          console.log(err, err.stack); 
        }// an error occurred
        else  {
          message.reply('Minecraft Creative Server has been started. Please allow 5 minutes to connect at minecraft.bagofchaos.com.');
        }
    });
  }
  if (command === "stop") {
    ec2.stopInstances(ec2params, function(err, data) {
      if (err) {
        console.log(err, err.stack); 
      }// an error occurred
      else  {
        message.reply('Minecraft Creative Server has been turned off. Thanks for saving Sean money!');
      }
  });    
  }
});

client.login(config.BOT_TOKEN);