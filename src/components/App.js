import React, {useState} from 'react';
import youtube from '../apis/youtube';
import VideoPlayer from './VideoPlayer';
import logo from '../assets/youTubeLogoGif.gif';
import MoreDetails from './MoreDetails';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import "../style/app.css"


export default function App () {
    

    const [videos, setVideos] = useState([]);
    const [videosBackup, setVideosBackup] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [details, setDetails] = useState(false);
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [wachedVideos, setWachedVideos] = useState([]);
    const [videosWachedCounter, setVideosWachedCounter] = useState(0);
    

    /* Handles submit sended from the input
        - gets the text from the input 
        - make a GET request from the api (/search)
        - uptdates the data for other components to render
    */
    const handleSubmit = async (textFromSearchBar) => {
        const response = await youtube.get('/search', {
            params: {
                q: textFromSearchBar
            }
        })
        setSelectedVideo(response.data.items[0]);
        setVideosBackup(response.data.items);
        setVideos(response.data.items.slice(1));
        setRelatedVideos(handleRelatedVideos(response.data.items[0]));
    };

    /* Handles related videos request
        - gets id of the selected video
        - make a GET request from the api (relatedToVideoId)
        - cleans the data obtained from response (some items miss the snippet param)
        - uptdates the cleaned data for other components to render
    */
    const handleRelatedVideos = async (selectedVideo) => {

        // Requesting related videos
        console.log(selectedVideo.id.videoId);
        const relatedVideos = await youtube.get('/search?', {
            params: {
                relatedToVideoId: selectedVideo.id.videoId,
                maxResults: 5,
            }
        })

        // Cleaning incomplete response data
        let cleanedResponse = [];
        relatedVideos.data.items.forEach(element => {
            if (element.snippet !== undefined) {
                cleanedResponse.push(element);
            }
        });
        console.log(cleanedResponse);
        setRelatedVideos(cleanedResponse.slice(0, 3));
    }

    /* Handles the selection of the video
        - recives the video from the item onClick event
        - makes a backup for all videos list (including the on that is on the VideoContent)
        - sets the selected video variable
    */
    const handleVideoSelect = (video) => {
        let videoList = [...videosBackup];
        let index = videoList.indexOf(video)
        videoList.splice(index, 1);
        setSelectedVideo(video);
        setVideos(videoList);
        handleRelatedVideos(video);
    }

    /* Handles the details boolean
        - method called with video details button
        - the value is updated with the oposite
    */
    const handleVideoDetails = () => {
        setDetails(!details);
    }

    /* Handles the amount of videos wached by the user
        - gets the selected video id
        - checks if the same video id exists on the array of videos wached
        - appends it if there is not
    */
    const handleVideosWached = () => {
        var id = selectedVideo.id.videoId;
        if ( wachedVideos.includes(id) === false ) {
            wachedVideos.push(id)
            setWachedVideos(wachedVideos)
            setVideosWachedCounter(videosWachedCounter + 1)
        }
    }


    return (
        <Router>
        <div className='parent'>
            <Header/>
            <Routes>
            <Route path="/videoplayer" element={<VideoPlayer
                handleFormSubmit={handleSubmit}
                handleVideoDetails={handleVideoDetails}
                handleVideoSelect={handleVideoSelect}
                handleVideosWached={handleVideosWached}
                video={selectedVideo}
                videos={videos}
                details={details}
                videosWachedCounter={videosWachedCounter}
            />}/>
            <Route path="/details" element={<MoreDetails 
                handleVideoDetails={handleVideoDetails}
                handleVideoSelect={handleVideoSelect}
                handleVideosWached={handleVideosWached}
                video={selectedVideo}
                videos={relatedVideos}
                details={details}
                videosWachedCounter={videosWachedCounter}
            />}/>
            </Routes>
        </div>
        </Router>
    )
}

const Header = () => {

    return (
        <div className= "header">
            <img src={logo} alt="youtube logo"/>
        </div>
    )
}

