'use strict';

$(document).ready(init);

function init() {
  // generateTiles();
  populateProfiles();
}



function populateProfiles(){
  $.getJSON('https://api.github.com/orgs/coding-house-apr2015/members', function(loginResponse){
    loginResponse.forEach(function(login){
      (event.login).push(profiles1);
    });
  });
}

var currTime = moment.utc();
var profiles1 = [{}];
// var profiles = [
//   {un:'dhh', dailyCommits:0},
//   {un:'IAmEddieDean', dailyCommits:0},
//   {un:'EdsDover', dailyCommits:0},
//   {un:'chyld', dailyCommits:0},
//   {un:'AmahAjavon', dailyCommits:0},
//   {un:'andrewtdinh', dailyCommits:0},
//   {un:'benhalverson', dailyCommits:0},
//   {un:'cadenichols', dailyCommits:0},
//   {un:'Cmarl', dailyCommits:0},
//   {un:'greygatch', dailyCommits:0},
//   {un:'kolohelios', dailyCommits:0},
//   {un:'lifepupil', dailyCommits:0},
//   {un:'ojangali', dailyCommits:0},
//   {un:'rljarm', dailyCommits:0},
//   {un:'SarahJessica', dailyCommits:0},
//   {un:'sherylpeebee', dailyCommits:0},
//   {un:'soyzamudio', dailyCommits:0},
//   {un:'Spinaldash', dailyCommits:0},
//   {un:'tania531', dailyCommits:0},
//   {un:'TLawesomeness', dailyCommits:0},
//   {un:'Coding-House', dailyCommits:0},
//   {un:'edgecoder', dailyCommits:0},
//   {un:'samerbuna', dailyCommits:0}
// ];
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
        $newRow.find(".commits").text(commitCount);
        $newRow.find(".card.row").css('background-color',colorTiles(commitCount));
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
