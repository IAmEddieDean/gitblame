'use strict';

$(document).ready(init);

function init() {
  generateTiles();
}

//var gitIds = ['samerbuna', 'IAmEddieDean', 'dhh', 'ojangali'];
//var eventCount = [];
var profiles = [
  {un:'samerbuna', dailyCommits:3, eventUrl:''},
  {un:'dhh', dailyCommits:2, eventUrl:'' },
  {un:'IAmEddieDean', dailyCommits:0, eventUrl:''},
  {un:'EdsDover', dailyCommits:0, eventUrl:''},
  {un:'chyld', dailyCommits:0, eventUrl:''},
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
      console.log(response);
    });
  });
}
