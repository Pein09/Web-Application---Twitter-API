import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

function Tweets() {
    const [TweetsData, setTweetsData] = useState({
        data: {},
        loading: false,
        loaded: false,
    });

    async function fetchTweets() {
        setTweetsData(function setState(prevState) {
            return { ...prevState, loading: true };
        });


        try {
            const response = await fetch("http://www.splashbase.co/api/v1/images/latest");

            const data = await response.json(); //am transformat fluxu nostru de date intr un fisier de tip json

            setTweetsData({ data: data, loading: false, loaded: true });

           // console.log(data);

           localStorage.setItem("images", JSON.stringify(data));
        } catch (err) {
            setTweetsData(function setState(prevState) {
                return { ...prevState, loading: true, loaded: false };
            });

            console.error(err);
        }

    }

    useEffect(function insideEffect() {
        const savedImages = localStorage.getItem("images");
        const parsedImages = savedImages ? JSON.parse(savedImages) : {};

        if(Object.keys(parsedImages).length !==0){
            setTweetsData({data:parsedImages, loaded:true, loading:false});
        } else if (!TweetsData.loaded) fetchTweets();
    }, [TweetsData.loaded]);

    return <Fragment>
        {TweetsData.loading && <CircularProgress />}
        {TweetsData.loaded && TweetsData.data.images.map(function renderImage(image) {
            return (
                <h1 key ={image.id}>
                <Link to={`/photos/${image.id}`} 
                state={{
                    imageUrl: image.url,
                }}
                >{`Image ${image.id}`}
             
                </Link>
                </h1>
            )
        })}
    </Fragment>;
}
export default Tweets;