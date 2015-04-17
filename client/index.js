'use strict';

$(document).ready(init);

function init() {
  generateTiles();
}

//var gitIds = ['samerbuna', 'IAmEddieDean', 'dhh', 'ojangali'];
//var eventCount = [];
var currTime = moment.utc()
var profiles = [
  {un:'samerbuna', dailyCommits:0},
  {un:'dhh', dailyCommits:0},
  {un:'IAmEddieDean', dailyCommits:0},
  {un:'EdsDover', dailyCommits:0},
  {un:'chyld', dailyCommits:0},
];
function generateTiles() {
  profiles.forEach(function(profile){
    var url = 'https://api.github.com/users/'+profile.un;
    $.getJSON(url, function(response){
      var $newRow = $("#template").clone();
      $newRow.find(".image").attr("src", response.avatar_url);
      $newRow.find(".name").text(response.name);
      $newRow.removeClass("hidden");
      var theFuckingCountIs = countCommits(response.events_url.replace('{/privacy}', ''), profile, $newRow);
      // console.log(response.events_url.replace('{/privacy}', ''));
      $newRow.find(".commits").text(theFuckingCountIs);
      $('#cards-container').append($newRow);
      console.log('commits:',theFuckingCountIs);
      
      
      
      
    });
  });
}
function countCommits(events, profile, $newRow){
  var timeStamps = []
  var commitNum;
  $.getJSON(events, function(response){
    response.forEach(function(event){
      if(event.message !== '' && moment.utc(event.created_at).diff(currTime, 'hours') > -24){
        // commitNum++;
       profile.dailyCommits++;
    }
      console.log(commitNum);
      // compareTimes(timeStamps);
      // console.log(profile.dailyCommits);
    });
    var $div = $('<div>');
    $div.text(profile.dailyCommits);
    $newRow.append($div);
  });
  // debugger;
}

function compareTimes(timeStamps){
  // console.log(moment.utc(timeStamps).diff(currTime, 'years'));
  // timeStamps.forEach(function(stamp){
  //
  // })
}
