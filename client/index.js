'use strict';

$(document).ready(init);

function init() {
  generateTiles();
}
var currTime = moment.utc();
var profiles = [
  {un:'samerbuna', dailyCommits:0},
  //{un:'dhh', dailyCommits:0},
  {un:'IAmEddieDean', dailyCommits:0}
  //{un:'EdsDover', dailyCommits:0},
  //{un:'chyld', dailyCommits:0}
];
function generateTiles() {
  profiles.forEach(function(profile){
    var profileUrl = 'https://api.github.com/users/' + profile.un;
    var eventsUrl = profileUrl + '/events';
    $.getJSON(profileUrl, function(profileresponse){
      $.getJSON(eventsUrl, function(eventsresponse){
        var commitCount = countCommits(eventsresponse);
        var $newRow = $("#template").clone();
        $newRow.find(".image").attr("src", profileresponse.avatar_url);
        $newRow.find(".name").text(profileresponse.name);
        $newRow.find(".handle").text('@'+profile.un);
        $newRow.find(".commits").text(commitCount + ' commits');
        $newRow.find(".card.row").addClass(colorTiles(commitCount));
        //$newRow.find(".card.row").css('background-color',colorTiles(commitCount));
        $newRow.removeClass("hidden");
        $('#cards-container').append($newRow);
      });
    });
  });
}

function colorTiles(dc){
  return dc > 4 ? 'green' : 'red';
}

function countCommits(eventsresponse){
  var commitCount = 0;
  eventsresponse.forEach(function(event){
    if(event.payload.comment !== '' && moment.utc(event.created_at).diff(currTime, 'hours') > -24){
     commitCount++;
    }
  });
  return commitCount;
  }
