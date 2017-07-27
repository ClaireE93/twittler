let end = 0;
let visitorName; //Change name in data_generator.js if desired

//Object of commonly used HTML strings
let objVar={}
objVar.tweet = '<div class="tweet"></div>';
objVar.dateRel = '<div class="timestamp"></div>';
objVar.dateAbs = '<div class="absolute"></div>';
objVar.user = '<span class="user"></span>';

$(document).ready(function(){
  genVisitorText(visitorName);
  end = postTweets(end);

  $('.title').on('click', function() {
    $('.tweet-container').css('display', 'flex');
    $('.profile-container').css('display', 'none');
    $('.form-container').css('display', 'inline');
  })

  $('.tweet-container').on('click', '.user', function() {
    generateProfile($(this).html(), 0);
  });

  $('form').on('keydown', function(e) {
    if(e.keyCode == 13) {
      postUserTweet(this);
      generatePlaceholderText()
    }
  });

  $('form').on('click', '#tweet-button', function() {
    postUserTweet(this.closest('form'));
    generatePlaceholderText()
  });

});

function getVisitor (name) {
  visitorName = name;
}
function genVisitorText(name) {
  $('.visitor-name').html('<strong>@' + name + '</strong> says...');
}

function postUserTweet(form) {
  let val = form.tweetInput.value;
  form.tweetInput.value = '';
  writeTweet(val);
  end = postTweets(end);
}
//Update relative dates/times.
function updateDates() {
  let absTime, relTime;
  let divs = document.getElementsByClassName('timestamp');
  for (let i = 0; i < divs.length; i++) {
    let cur = divs[i];
    absTime = cur.getElementsByClassName('absolute')[0].innerText;
    relTime = moment(Date.parse(absTime)).fromNow();
    cur.childNodes[0].nodeValue = relTime;
  }
}

function postTweets(end) {
  let index = streams.home.length - 1;
  let newEnd = index + 1;
  while(index >= end){
    let tweet = streams.home[index];
    let $tweet = $(objVar.tweet);
    let $dateRel = $(objVar.dateRel);
    let $date = $(objVar.dateAbs);
    let date = tweet.created_at.toString();
    let dateRelative = moment(tweet.created_at).fromNow();
    let $user = $(objVar.user);
    $user.text('@' + tweet.user);
    $date.text(date);
    $dateRel.text(dateRelative);
    $date.appendTo($dateRel); //Store absolute date so relative date can be updated
    $tweet.text(': ' + tweet.message);
    $tweet.appendTo($('.tweet-container'));
    $tweet.append($dateRel);
    $tweet.prepend($user);
    index -= 1;
  }
  updateDates();

  return newEnd;
}

//Use to call postTweets from data_generator.js
function callPostTweets() {
  end = postTweets(end);
}

function generateProfile(user, start) {
  console.log('in the function');
  $('.profile-container').css('display', 'flex');
  $('.tweet-container').css('display', 'none');
  $('.form-container').css('display', 'none');
  $('.profile-container').html('');
  let username = user.match(/[^@]/gi).join('');
  let tweets = streams.users[username];
  for(let i = start; i < tweets.length; i++) {
    let tweetObj = tweets[i];
    let $tweet = $(objVar.tweet);
    let $dateRel = $(objVar.dateRel);
    let $date = $(objVar.dateAbs);
    let date = tweetObj.created_at.toString();
    let dateRelative = moment(tweetObj.created_at).fromNow();
    let $user = $(objVar.user);
    $user.text(user);
    $date.text(date);
    $dateRel.text(dateRelative);
    $date.appendTo($dateRel);  //Store absolute date so relative date can be updated
    $tweet.text(': ' + tweetObj.message);
    $tweet.appendTo($('.profile-container'));
    $tweet.append($dateRel);
    $tweet.prepend($user);
  }
}

function generatePlaceholderText() {
  let ind = Math.floor(Math.random() * quotesArr.length);
  $('input').attr('placeholder', quotesArr[ind]);
}

//Ron Swanson quotes to cycle through :)
let quotesArr = ['Never half-ass two things. Whole-ass one thing.',
'Clear alcohols are for rich women on diets',
'When I eat, it is the food that is scared',
'Crying: acceptable at funerals and the Grand Canyon',
'Any dog under 50 pounds is a cat and cats are useless',
'There is only one bad word: taxes',
'Child labor laws are ruining this country',
'Breakfast food can serve many purposes',
'You had me at meat tornado'];
