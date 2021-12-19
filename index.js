const needle = require('needle')//
const config = require('dotenv').config()
const TOKEN = process.env.TWITTER_BEARER_TOKEN

const rulesURL = 'https://api.twitter.com/2/tweets/search/stream/rules'
const streamURL = 'https://api.twitter.com/2/tweets/search/stream?tweet.fields=public_metrics&expansions=author_id'
//ne da doar idul si textul unui tweet, dar putem face un query "?" tweet.field si alegem alt 
//in cazul nostru sa ne arate autorul tweetului

const rules = [{ value: '#elrond' }] //aray care tine flagul pe care il caut eu
//imi da tweeturile care contin elrond si face un stream cu ele

//facem 3 functii, get, set si delete

//Prima functie. Get stream rules// request pt retrieve


async function getRules(){
    const response = await needle('get', rulesURL, {
        headers: {
            Authorization: `Bearer ${TOKEN}`
        },
    })
    console.log(response.body)
    return response.body
}

//A doua functie. Set stream rules// request pt post

async function setRules(){

    const data = {
        add: rules
    }
    const response = await needle('post', rulesURL, data, {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${TOKEN}`
        }
    })
    
    return response.body
};
    //A treia functie. Delete stream rules
    async function deleteRules(rules){

        if(!Array.isArray(rules.data)){
            return null
        }

        const ids = rules.data.map((rule) => rule.id)

        const data = {
            delete: {
                ids: ids
            }
        }
        const response = await needle('post', rulesURL, data, {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${TOKEN}`
            }
        })
        
        return response.body
    };

    function streamTweets(){
        const stream = needle.get(streamURL, {
            headers:{
                Authorization: `Beared ${TOKEN}`
            }

        })
    
        stream.on('data', (data) => {

        try {
           const json = JSON.parse(data)
           console.log(json)
        } catch (error) {
            
        }

    })
};

    (async () =>{
        try {
        //get a stream rules
        currentRules = await getRules()
        //delete all stream rulles
        await deleteRules(currentRules)
        //Set rules based on array above
        await setRules()
            
            } catch (error) {
                console.error(error)
                process.exit(1)
            }

            streamTweets()
        })()
