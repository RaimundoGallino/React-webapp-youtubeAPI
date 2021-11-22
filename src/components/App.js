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

/* handle submit sended from the input
    gets the text from the input and make a 
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

    const handleVideoSelect = (video) => {
        let videoList = [...videosBackup];
        let index = videoList.indexOf(video)
        videoList.splice(index, 1);
        setSelectedVideo(video);
        setVideos(videoList);
        handleRelatedVideos(video);
        console.log("VIDEO BACKUP LIST", videosBackup)
    }

    const handleVideoDetails = () => {
        setDetails(!details);
    }

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
            <img style={{height:'100px',justifyContent:'center'}} src={logo} alt="youtube logo"/>
        </div>
    )
}

