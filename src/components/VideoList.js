import React from 'react';
import VideoItem from './VideoItem';

const VideoList = ({videos , handleVideoSelect}) => {
    console.log("estos son los videos que le llegan al video list",videos)
    const renderedVideos =  videos.map((video) => {
        console.log("estos son los videos",video);
        return <VideoItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect} />
        // console.log(video.id);
    });

    return <div className='video-thumbnails'>{renderedVideos}</div>;
};
export default VideoList;