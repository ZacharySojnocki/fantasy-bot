const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('message', (message) => {
    if(message.content == '!league') {
        message.channel.send("Please wait, shit takes a bit to load").then(msg => {
            msg.delete(5000)
        })
        .catch();
        var phantom = require("phantom");
        var cheerio = require("cheerio");
        var _ph, _page, _outObj;
        var teams = [];
        var records = [];
        var points = [];

        phantom.create().then(function(ph){
            _ph = ph;
            return _ph.createPage();
        }).then(function(page){
            _page = page;
            return _page.open('http://fantasy.na.lolesports.com/en-US/league/1240129');
        }).then(function(status){
            console.log(status);
            return _page.property('content')
        }).then(function(content){
            var $ = cheerio.load(content);
            $('.list-item').each(function(){
                teams.push($(this).find('.team-name').text() + " - " + $(this).find('.summoner-name').text());
                records.push($(this).find('.wins > .value').text() + " " + $(this).find('.ties > .value').text() + " " + $(this).find('.losses > .value').text());
                points.push($(this).find('.total-points > .formatted-points > .whole-part').text() + $(this).find('.total-points > .formatted-points > .fraction-part').text());
            });

            message.channel.send({embed: { 
                color: 3447003,
                author: {
                    name: "The Fags | Fantasy LCS",
                    icon_url: bot.user.avatarURL
                },
                title: "Link to our league",
                url: "http://fantasy.na.lolesports.com/en-US/league/1240129",
                fields: [{ 
                    name: teams[0], 
                    value: records[0] + "      Total Points: " + points[0]
                },
                {
                    name: teams[1], 
                    value: records[1] + "      Total Points: " + points[1]
                },
                {
                    name: teams[2], 
                    value: records[2] + "      Total Points: " + points[2]
                },
                {
                    name: teams[3], 
                    value: records[3] + "      Total Points: " + points[3]
                },
                {
                    name: teams[4], 
                    value: records[4] + "      Total Points: " + points[4] 
                },
                {
                    name: teams[5], 
                    value: records[5] + "      Total Points: " + points[5] 
                }],
                footer: {
                text: "W T L"
                }}});
            _page.close();
            _ph.exit();
        }).catch(function(e){
        console.log(e); 
        });
    }
});

bot.login('NDA4MDAxODEzMTI4OTM3NDkz.DVJs1Q.r2QcPxVzT2eZ5zWkBj9ZPGM0s2Y');