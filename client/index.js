'use strict';

$(document).ready(init);

function init() {
  generateTiles();
}

//var gitIds = ['samerbuna', 'IAmEddieDean', 'dhh', 'ojangali'];
//var eventCount = [];
var profiles = [
  {un:'samerbuna', dailyCommits:3},
  // {un:'dhh', dailyCommits:2},
  // {un:'IAmEddieDean', dailyCommits:0, eventUrl:''},
  // {un:'EdsDover', dailyCommits:0, eventUrl:''},
  // {un:'chyld', dailyCommits:0, eventUrl:''},
];
function generateTiles() {
  profiles.forEach(function(profile){
    var url = 'https://api.github.com/users/'+profile.un;
    $.getJSON(url, function(response){
      var $newRow = $("#template").clone();
      $newRow.find(".image").attr("src", response.avatar_url);
      $newRow.find(".name").text(response.name);
      $newRow.removeClass("hidden");
      $('#cards-container').append($newRow);
      countCommits(response.events_url.replace('{/privacy}', ''));
      // console.log(response.events_url.replace('{/privacy}', ''));
    });
  });
}
function countCommits(events){
  var timeStamps = []
  $.getJSON(events, function(response){
    response.forEach(function(event){
      if (event.message !== ''){
        timeStamps.push(event.created_at);
        console.log(timeStamps);
        
      }
      // event.message ? timeStamps.push(event.created_at) : null;
      console.log(timeStamps.length);
    });
  });
}
