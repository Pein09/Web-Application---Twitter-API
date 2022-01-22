import { Fragment, useState, useEffect } from 'react';


function Tweets(){
    const [tweets, setTweets] = useState([]);

    useEffect(() =>{
        async function fetchData(){
            try{

                const result = await fetch("http://localhost:8080/api/tweets-from-api");
               const data =await  result.json();
               console.log(data.data.statuses)
                setTweets(data.data.statuses);
                
              }
              catch(err){
                console.log(`No data found: ${err}`);
              }   
            }
        fetchData();

  
}, [])

return <Fragment> 
    {tweets.length>0 && tweets.map((tweet) =>  ( <><b>{tweet.user.name}</b><p> {tweet.text} </p></>))}

       
</Fragment>
}


export default Tweets;
