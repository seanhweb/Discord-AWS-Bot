# Discord AWS Bot  
Discord bot that starts/stops an EC2 instance. For my uses, the EC2 instance has already been preconfigured to run minecraft on launch, via [https://www.seanhweb.com/blog/minecraft-windows-automation](https://www.seanhweb.com/blog/minecraft-windows-automation).

## Configuration
Add a file called config.json with the following: 

```
{
    "BOT_TOKEN": "YOUR_BOT_TOKEN",
    "INSTANCE_ID": "YOUR_INSTANCE_ID"
}
```

Make sure this is hosted on an instance that has permissions to start/stop an EC2 instance. If on AWS, attach a role. Here's an example policy JSON. Lock it to the desired EC2 instance you want to start and stop for security reasons - this is only an example. Currently, this policy will allow the role to start/stop any instance on your account. 

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "ec2:StartInstances",
                "ec2:StopInstances",
                "ec2:DescribeInstanceStatus"
            ],
            "Resource": "*"
        }
    ]
}
```

## Usage - Commands

There are two commands. !start starts the EC2 instance via the AWS SDK. !stop stops the EC2 instance. 

## More to come

* Check if the EC2 instance is running before running command. 
* !status to let the user know if the EC2 instance is live. 
