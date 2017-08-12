var request = require('request');
var Twit = require('twit');
var T = new Twit(require('./config.js'));
var createIsCool = require('iscool');
var wordnikKey = require('./permissions.js').key;

var getNounUrl = 'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&excludePartOfSpeech=noun-plural,noun-posessive,proper-noun,proper-noun-plural,proper-noun-posessive&minCorpusCount=100&minDictionaryCount=13&minLength=3&maxLength=8&api_key=' + wordnikKey;

isCool = createIsCool();

function tweetWord(word) {
  T.post('statuses/update', {status: word}, function (err, reply) {
    if (err) {
      console.log('error:', err);
    } else {
      console.log('tweet:', reply);
    }
  });
}

function tweetStuff() {
  var noun = '',
      tweet = 'The ',
      fruitstring;

  //Adding adjectives!
  request(getNounUrl, function (error, response, data) {
    // using JSON
    var nounData = JSON.parse(data);
    console.log(nounData);

    //checking if we actually got back data from the API
    if (!error) {
      noun = nounData.word;

      if (isCool(noun) && !(noun[0] === noun[0].toUpperCase())) {
        console.log(noun);
        fruitstring = noun + 'berries';
        tweet += fruitstring + ' taste like ' + fruitstring + '! #nodetweets #javascript #bot';
        console.log(tweet);
        tweetWord(tweet)
        return;
      } else {
        tweetStuff();
      }
    }
  });
}

tweetStuff();
