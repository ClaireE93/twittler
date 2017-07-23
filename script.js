$(document).ready(function(){
    //  var $body = $('body');
     // $body.html('');
     $('button').on('click', function() {
       $('.tweet-container').html('');
       postTweets();
     });
     postTweets();


   });

function getDate() {
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date + ' ' + time;
}

function postTweets() {
  var index = streams.home.length - 1;

  while(index >= 0){
    let tweet = streams.home[index];
    let $tweet = $('<div class="tweet"></div>');
    let $date = $('<div class="timestamp"></div>')
    let date = getDate();
    $date.text(date);
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($('.tweet-container'));
    $date.appendTo($tweet);
    index -= 1;
  }
}
