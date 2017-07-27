let end;

$(document).ready(function(){
     end = 0;
     end = postTweets(end);
    setInterval(function() {
      end = postTweets(end);
      $('.user').on('click', function() {
        generateProfile($(this).html(), 0);
      });

    }, 20000);

    $('.title').on('click', function() {
      $('.tweet-container').css('display', 'flex');
      $('.profile-container').css('display', 'none');
      $('.form-container').css('display', 'inline');
    })
    $('.user').on('click', function() {
      generateProfile($(this).html(), 0);

      // $('#tweet-button').on('click', function() {
      //   console.log('hi');
      //   postTweet();
      // });
    });

    // if($("to-tweet").is(":focus")) {
    //
    // }
    $('form').on('keydown', function(e) {
      if(e.keyCode == 13) {
        postSingleTweet(this);
      }
    })

    $('form').on('click', '#tweet-button', function() {
      postSingleTweet(this.closest('form'));
    });
   });

function postSingleTweet(form) {
  let val = form.tweetInput.value;
  form.tweetInput.value = '';
  writeTweet(val);
  end = postTweets(end);
}

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
    let $tweet = $('<div class="tweet"></div>');
    let $dateRel = $('<div class="timestamp"></div>');
    let $date = $('<div class="absolute"></div>');
    let date = tweet.created_at.toString();
    let dateRelative = moment(tweet.created_at).fromNow();
    let $user = $('<span class="user"></span>');
    $user.text('@' + tweet.user);
    $date.text(date);
    $dateRel.text(dateRelative);
    $date.appendTo($dateRel);
    $tweet.text(': ' + tweet.message);
    $tweet.appendTo($('.tweet-container'));
    $tweet.append($dateRel);
    $tweet.prepend($user);
    index -= 1;
  }
  updateDates();

  return newEnd;
}

function generateProfile(user, start) {
  $('.profile-container').css('display', 'flex');
  $('.tweet-container').css('display', 'none');
  $('.form-container').css('display', 'none');
  $('.profile-container').html('');
  let username = user.match(/[^@]/gi).join('');
  let tweets = streams.users[username];
  for(let i = start; i < tweets.length; i++) {
    let tweetObj = tweets[i];
    let $tweet = $('<div class="tweet"></div>');
    let $dateRel = $('<div class="timestamp"></div>');
    let $date = $('<div class="absolute"></div>');
    let date = tweetObj.created_at.toString();
    let dateRelative = moment(tweetObj.created_at).fromNow();
    let $user = $('<span class="user"></span>')
    $user.text(user);
    $date.text(date);
    $dateRel.text(dateRelative);
    $date.appendTo($dateRel);
    $tweet.text(': ' + tweetObj.message);
    $tweet.appendTo($('.profile-container'));
    $tweet.append($dateRel);
    $tweet.prepend($user);
  }
}
