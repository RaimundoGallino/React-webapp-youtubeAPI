import React from 'react';
import SearchBar from './Searchbar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import logo from '../assets/youTubeLogoGif.gif';
import "../style/app.css"



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
        console.log("VIDEOS", this.state.videos)
        console.log("video list al inicio", videoList)
        let index = videoList.indexOf(video)
        videoList.splice(index, 1)
        console.log("video list despues del splice", videoList)
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
                { this.state.details ? ( 
                    <>
                    <div className = "details-not-search"></div>
                    <div className="videos">
                        <div className="video-repro">
                            {this.state.selectedVideo ? (
                            <VideoDetail video={this.state.selectedVideo}  details ={this.state.details} />
                             ) : (  
                                <div>
                                    <h1>Search any video...</h1>
                                    <br></br>
                                </div>
                            )}
                            <div className="details">
                                {this.state.videos.length === 0 ? <div></div> :
                                <button onClick={ () => this.handleVideoDetails()} className="details-button">Back </button>}

                            </div>
                        </div>
                        <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.relatedVideos}/>
                    </div>
                    </>

                    ) : (

                    <>
                    <SearchBar handleFormSubmit={this.handleSubmit}/>
                    <div className="videos">
                        <div className="video-repro">
                        {this.state.selectedVideo ? (
                            <VideoDetail video={this.state.selectedVideo}  details ={this.state.details}/>
                            ) : (
                                <div>
                                    <h1>Search any video...</h1>
                                    <br></br>
                                </div>
                            )}
                            <div className="details">
                                {this.state.videos.length === 0 ? <div></div> :
                                <button onClick={ () => this.handleVideoDetails()} className="details-button">More details </button>}

                            </div>
                        </div>
                        <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/>
                    </div>
                    </>
                    )}
            </div>
        )
    }
}

export default App;