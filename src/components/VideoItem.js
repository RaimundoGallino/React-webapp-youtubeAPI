import React from 'react';
import '../style/video.css';

const VideoItem = ({video , handleVideoSelect}) => {

    /*const relatedVideos = `https://www.youtube.com/search?part=snippet&maxResults=5&relatedToVideoId=${video.id.videoId}&type=video`;


    console.log("videos relacionados",relatedVideos);
    console.log(video.id.videoId);
    console.log(video.snippet.thumbnails.medium.url);
    */
    return (
        <div className='item' onClick={ () => handleVideoSelect(video)}>
            { video.snippet.title ? (
                <div className='short-desc'>{video.snippet.title}</div>
            ) : (
                <div className='short-desc'>No title</div>
            )}
            <img className='thumbnail' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
        </div>
    )
};
export default VideoItem;