import React from 'react';
import VideoList from './VideoList';
import VideoContent from './VideoContent';
import { Link } from 'react-router-dom';

import '../style/videoplayer.css';
import '../style/moredetails.css';


const MoreDetails= ({handleVideoDetails, handleVideoSelect, handleVideosWached, video, videos, details}) => {
    return (
        <>
        <div className = "details-not-search">
            <Link to="/videoplayer" className="details">
            <button onClick={ () => handleVideoDetails()} className="back-button">Back </button>
            </Link>
        </div>
        <div className="videos">
            <div className="video-repro">
                <VideoContent video={video}  details ={details} handleVideosWached={handleVideosWached}/>
            </div>
            <VideoList handleVideoSelect={handleVideoSelect} videos={videos}/>
        </div>
        </>
    )
}
export default MoreDetails;