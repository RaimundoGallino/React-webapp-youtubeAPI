import React from 'react';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

const MoreDetails= ({handleVideoDetails, handleVideoSelect, video, videos, details}) => {
    return (
        <>
        <div className = "details-not-search"></div>
        <div className="videos">
            <div className="video-repro">
                {video ? (
                <VideoDetail video={video}  details ={details} />
                 ) : (  
                    <div>
                        <h1>Search any video...</h1>
                        <br></br>
                    </div>
                )}
                <div className="details">
                    {videos.length === 0 ? <div></div> :
                    <button onClick={ () => handleVideoDetails()} className="details-button">Back </button>}

                </div>
            </div>
            <VideoList handleVideoSelect={handleVideoSelect} videos={videos}/>
        </div>
        </>
    )
}
export default MoreDetails;