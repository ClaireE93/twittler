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
    })
    $('.user').on('click', function() {
      generateProfile($(this).html(), 0);
    });
   });

function postTweets(end) {
  let index = streams.home.length - 1;
  let newEnd = index + 1;
  while(index >= end){
    let tweet = streams.home[index];
    let $tweet = $('<div class="tweet"></div>');
    let $date = $('<div class="timestamp"></div>')
    let date = tweet.created_at;
    let $user = $('<span class="user"></span>')
    $user.text('@' + tweet.user);
    $date.text(date);
    $tweet.text(': ' + tweet.message);
    $tweet.appendTo($('.tweet-container'));
    $tweet.append($date);
    $tweet.prepend($user);
    index -= 1;
  }
  return newEnd;
}

function generateProfile(user, start) {
  $('.profile-container').css('display', 'flex');
  $('.tweet-container').css('display', 'none');
  $('.profile-container').html('');
  let username = user.match(/[^@]/gi).join('');
  let tweets = streams.users[username];
  for(let i = start; i < tweets.length; i++) {
    let tweetObj = tweets[i];
    let $tweet = $('<div class="tweet"></div>');
    let $date = $('<div class="timestamp"></div>')
    let date = tweetObj.created_at;
    let $user = $('<span class="user"></span>')
    $user.text(user);
    $date.text(date);
    $tweet.text(': ' + tweetObj.message);
    $tweet.appendTo($('.profile-container'));
    $tweet.append($date);
    $tweet.prepend($user);
  }

}
