import axios from 'axios';
const KEY = 'AIzaSyAikcRF8W7iSfHsQBGf9hwmF9_scRIF1Tc';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 4,
        key: KEY,
        type: 'video'
    }
})
