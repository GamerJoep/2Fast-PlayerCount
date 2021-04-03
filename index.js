const Discord = require('discord.js')
const client = new Discord.Client();
const axios = require('axios');
const { token, startupMessage, serverIp, loopTime, statusHeader, statusFooter } = require('./config.json');

var playerCount = 0;
var maxPlayer = 0;

//when the bot starts
client.once('ready', () => {

    //say ready in console
    console.log(startupMessage);

    //start time loop (20 seconds)
    var interval = setInterval(function () {

        //getting the data from url
        axios.get('https://backend.beammp.com/servers-info').then((response) => {

            //looping the data
            for (i = 0; i < response.data.length; i++) {

                //check if the server have the ip
                if (response.data[i].ip == serverIp) {

                    //set the playercount
                    playerCount = playerCount + parseInt(response.data[i].players);
                    maxPlayer = maxPlayer + parseInt(response.data[i].maxplayers);
                }
            }
            //show the status 
            client.user.setActivity(statusHeader + " " + playerCount + "/" + maxPlayer + " " + statusFooter);
            
            //reset the playercount
            playerCount = 0;
            maxPlayer = 0;
        });
    }, loopTime); //20000 = 20 seconds
})

//logging in with a token
client.login(token);