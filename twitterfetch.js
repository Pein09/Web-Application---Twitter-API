//Monitorizare prin API Twitter

//Ne conectam la API Twitter din care vom putea sa executam comenzi
//npm install twit

import Twit from 'twit'  
//biblioteca js care ne lasa sa comunicam cu twitter
//npm install twit/node/open/franc/twitter
import node from 'node-notifier'
import open from 'open'
//import franc from 'franc';

//am solicitat acces la cont developer de la Twitter si mi-au dat aceste elemente pentru a ma putea conecta la api
const apikey = 'ONo6NnV9P53y0kb6rxi9P0Zn1'
const apiSecretKey = 'SThYqRvvj9BTdbAcASF16e2f14l1LaOnxAUbIAIC47ZASvBkLC'
const accessToken = '1472150608744529920-KnjyTk7tVn0Ri8gwHpPE24DEn6Kc1r'
const accessTokenSecret = '3yROs5aTb0G9ETfnPO2ZkuOX3M4rICUAuA2VRvz6coRha'

//construim un obiect Twit - realizeaza o conexiune la Twitter API
var T = new Twit({
    consumer_key: apikey,
    consumer_secret: apiSecretKey,
    access_token: accessToken,
    access_token_secret: accessTokenSecret,
});
 


(async () => {
    
    try{
      
    T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
        console.log(data)
      })
    }
    catch(err){
        console.error(`There was an error connecting to the db using seq: ${err}`);
      }
    var params =  {
      q: 'elrond since:2020-12-01',
      count: 5 }

    //tweeturi recente despre elrond
    T.get('search/tweets', params, gotData);
    
     function gotData(err, data, response) {
      // const tweets = data.statuses
        //.map(tweet => `LANG: ${franc(tweet.text)} : ${tweet.text}`) //CHECK LANGUAGE
        //.map(tweet => tweet.text)
        //.filter(tweet => tweet.toLowerCase().includes('beniamin'));
        console.log(data)
        
    };
 //2. REAL TIME MONITORING USING STREAM (HASHTAG)
    var stream = T.stream('statuses/filter', { track: '#elrond' })
    stream.on('tweet', function (tweet) {
    console.log(tweet.text);
    console.log('Language: ' + franc(tweet.text));
    console.log('------');
     })

    // 3. REAL TIME MONITORING USING STREAM (LOCATION)
    var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ]
    var stream = T.stream('statuses/filter', { locations: sanFrancisco })
    
    //SHOW NOTIFICATION FOR EACH RECEIVED TWEET
    stream.on('tweet', function (tweet) {
      console.log(tweet.text);
      let url = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`

      notifier.notify({
        title: tweet.user.name,
        message: tweet.text
      });

      notifier.on('click', async function(notifierObject, options, event) {
        console.log('clicked');
        await open(url);
      });
    })
})();