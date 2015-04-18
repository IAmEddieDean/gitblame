'use strict';

$(document).ready(init);

function init() {
  // generateTiles();
  populateProfiles();
}

var currTime = moment.utc();

var profiles = [];

function populateProfiles(){
  $.getJSON('https://api.github.com/orgs/coding-house-apr2015/members', function(loginResponse){
    loginResponse.forEach(function(profile){
      profiles.push({'un': profile.login});
    });
    generateTiles();
  });
}


function generateTiles() {
  profiles.forEach(function(profile){
    var profileUrl = 'https://api.github.com/users/' + profiles.un;
    var eventsUrl = profileUrl + '/events';
    $.getJSON(profileUrl, function(profileresponse){
      $.getJSON(eventsUrl, function(eventsresponse){
        countCommits(eventsresponse);
        // profiles['commitCount'] = countCommits(eventsresponse)
        // profiles.push({'commitCount': countCommits(eventsresponse)}, {'pullCount': countCommits(eventsresponse)});
       var $newRow = $("#template").clone();
       $newRow.find(".image").attr("src", profileresponse.avatar_url);
       $newRow.find(".name").text(profileresponse.name);
       $newRow.find(".commits").text(profiles.commitCount);
       $newRow.find(".pulls").text(profiles.pullCount);
       $newRow.find(".card.row").css('background-color',colorTiles(profiles.commitCount));
       $newRow.removeClass('hidden');
       $('#cards-container').append($newRow);
      });
    });
  });
}

function colorTiles(dc){
  return dc > 4 ? 'green' : 'red';
}

function countCommits(eventsresponse){
  //var counts = {commitCount: 0, pullCount: 0};

  eventsresponse.forEach(function(event){
    if(event.payload.comment !== '' && moment.utc(event.created_at).diff(currTime, 'hours') > -24){
      profiles[commitCount] = (profiles[commitCount] || 0)+1;
    }
    if(event.type === 'PullRequestEvent'){
      profiles[pullCount] = (profiles[pullCount] || 0)+1;
    }
  });

  //return commitCount;
  }

  //return counts;
