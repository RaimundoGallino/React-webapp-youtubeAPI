import React from 'react';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import '../style/videodetail.css';
import { Link } from 'react-router-dom';

const MoreDetails= ({handleVideoDetails, handleVideoSelect, video, videos, details}) => {
    return (
        <>
        <div className = "details-not-search"></div>
        <div className="videos">
            <div className="video-repro">
                <VideoDetail video={video}  details ={details} />
                    {videos.length === 0 ? <div></div> :
                    <div>
                    <Link to="/videoplayer" className="details">
                    <button onClick={ () => handleVideoDetails()} className="details-button">Back </button>
                    </Link>
                    </div>}

            </div>
            <VideoList handleVideoSelect={handleVideoSelect} videos={videos}/>
        </div>
        </>
    )
}
export default MoreDetails;