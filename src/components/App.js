import React from 'react';
import youtube from '../apis/youtube';
import VideoPlayer from './VideoPlayer';
import logo from '../assets/youTubeLogoGif.gif';
import "../style/app.css"
import MoreDetails from './MoreDetails';



class App extends React.Component {
    state = {
        videos: [],
        videosBackup: [],
        selectedVideo: null,
        details: false,
        relatedVideos: [],
        videosWached : 0
    }

    handleSubmit = async (textFromSearchBar) => {
        const response = await youtube.get('/search', {
            params: {
                q: textFromSearchBar
            }
        })

        this.setState({
            videos: response.data.items.slice(1),
            videosBackup: response.data.items,
            selectedVideo: response.data.items[0],
            relatedVideos: this.handleRelatedVideos(response.data.items[0])
        })

    };

    handleVideoSelect = (video) => {
        let videoList = [...this.state.videosBackup];
        let index = videoList.indexOf(video)

        videoList.splice(index, 1)

        this.setState({selectedVideo: video})
        this.setState({videos: videoList})
        this.handleRelatedVideos(video);
    }

    handleVideoDetails = () => {
        this.setState({details: !this.state.details})
    }

    handleRelatedVideos = async (selectedVideo) => {
        console.log(selectedVideo.id.videoId);
        const relatedVideos = await youtube.get('/search?', {
            params: {
                relatedToVideoId: selectedVideo.id.videoId,
                maxResults: 3,
            }
        })

        this.setState({
            relatedVideos: relatedVideos.data.items
        })

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
    render() {
        return (

          
            <div className='parent'>
                <div className= "header">
                    <img style={{height:'100px',justifyContent:'center'}} src={logo} alt="youtube logo" centered/>
                    </div>
                { !this.state.details ? ( 

                    <>
                    <VideoPlayer 
                        handleFormSubmit={this.handleSubmit}
                        handleVideoDetails={this.handleVideoDetails}
                        handleVideoSelect={this.handleVideoSelect}
                        video={this.state.selectedVideo}
                        videos={this.state.videos}
                        details={this.state.details}
                    />
                    </>
                    ) : (
                    <>
                    <MoreDetails 
                        handleVideoDetails={this.handleVideoDetails}
                        handleVideoSelect={this.handleVideoSelect}
                        video={this.state.selectedVideo}
                        videos={this.state.relatedVideos}
                        details={this.state.details}
                    />
                    </>
                    
                    )}
            </div>
        )
    }
}

export default App;