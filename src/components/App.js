import React, {useState} from 'react';
import youtube from '../apis/youtube';
import VideoPlayer from './VideoPlayer';
import logo from '../assets/youTubeLogoGif.gif';
import "../style/app.css"
import MoreDetails from './MoreDetails';



export default function App () {
    const [videos, setVideos] = useState([]);
    const [videosBackup, setVideosBackup] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [details, setDetails] = useState(false);
    const [relatedVideos, setRelatedVideos] = useState([]);
    //const [videosWached, setVideosWached] = useState(0);


    const handleSubmit = async (textFromSearchBar) => {
        const response = await youtube.get('/search', {
            params: {
                q: textFromSearchBar
            }
        })
        setVideos(response.data.items.slice(1));
        setVideosBackup(response.data.items);
        setSelectedVideo(response.data.items[0]);
        setRelatedVideos(handleRelatedVideos(response.data.items[0]));
    };

    const handleRelatedVideos = async (selectedVideo) => {
        console.log(selectedVideo.id.videoId);
        const relatedVideos = await youtube.get('/search?', {
            params: {
                relatedToVideoId: selectedVideo.id.videoId,
                maxResults: 3,
            }
        })
        setRelatedVideos(relatedVideos.data.items);

    }

    const handleVideoSelect = (video) => {
        let videoList = [...videosBackup];
        let index = videoList.indexOf(video)
        videoList.splice(index, 1)
        setSelectedVideo(video);
        setVideos(videoList);
        handleRelatedVideos(video);
        console.log("HANDLE VIDEOOO", video)
    }

    const handleVideoDetails = () => {
        setDetails(!details);

    }
    /*
    handleVideoCounter = () => {
        console.log("antes",this.state.videosWached);
        this.setState({
            videosWached: this.state.videosWached + 1
        })
        console.log("despues",this.state.videosWached);
    }
    */

    return (
        <div className='parent'>
        <div className= "header">
            <img style={{height:'100px',justifyContent:'center'}} src={logo} alt="youtube logo"/>
            </div>
        { !details ? ( 

            <>
            <VideoPlayer 
                handleFormSubmit={handleSubmit}
                handleVideoDetails={handleVideoDetails}
                handleVideoSelect={handleVideoSelect}
                video={selectedVideo}
                videos={videos}
                details={details}
            />
            </>
            ) : (
            <>
            <MoreDetails 
                handleVideoDetails={handleVideoDetails}
                handleVideoSelect={handleVideoSelect}
                video={selectedVideo}
                videos={relatedVideos}
                details={details}
            />
            </>
            
            )}
    </div>
    )
}

