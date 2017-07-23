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
      // generateProfile();
    })
   });

function getDate() {
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date + ' ' + time;
}

function postTweets(end) {
  var index = streams.home.length - 1;
  var newEnd = index + 1;
  while(index >= end){
    let tweet = streams.home[index];
    let $tweet = $('<div class="tweet"></div>');
    let $date = $('<div class="timestamp"></div>')
    let date = getDate();
    let $user = $('<span class="user"></span>')
    $user.text('@' + tweet.user);
    $date.text(date);
    $tweet.text(': ' + tweet.message);
    // $user.append($tweet).appendTo($('.tweet-container'));
    $tweet.appendTo($('.tweet-container'));
    $('.user').text('@' + tweet.user);
    $tweet.append($date);
    $tweet.prepend($user);
    index -= 1;
  }
  return newEnd;
}
