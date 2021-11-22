import React from 'react';
import VideoItem from './VideoItem';

import '../style/videolist.css';


const VideoList = ({videos , handleVideoSelect}) => {
    
    var indexCounter = 0;

    const renderedVideos = videos.map((video) => {
        indexCounter = indexCounter + 1
        return <VideoItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect} indexCounter={indexCounter}/>
        // console.log(video.id);
    });

    return <div className='video-thumbnails'>{renderedVideos}</div>;
};
export default VideoList;