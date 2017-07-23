let end;

$(document).ready(function(){
    //  var $body = $('body');
     // $body.html('');
     end = 0;
     end = postTweets(end);
    //  $('button').on('click', function() {
    //   //  $('.tweet-container').html('');
    //    end = postTweets(end);
    //  });
    setInterval(function() {
      end = postTweets(end);
    }, 20000);
    $('h1').on('click', function() {
      $('.tweet-container').css('display', 'flex');
      $('.profile-container').css('display', 'none');
    })
    $('.user').on('click', function() {
      console.log('Generate prof with: ' + $(this).html());
      generateProfile($(this).html(), 0);
    })
   });

// function getDate() {
//   let today = new Date();
//   let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//   let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//   return date + ' ' + time;
// }

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
