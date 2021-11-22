import React from 'react';

import '../style/videolist.css';


const VideoItem = ({video , handleVideoSelect, indexCounter}) => {
    console.log("el contador ", indexCounter)

    return (
        <div className='item' onClick={ () => handleVideoSelect(video) } style={{'--index': String(indexCounter)}}>

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