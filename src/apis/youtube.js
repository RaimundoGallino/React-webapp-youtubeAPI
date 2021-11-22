import axios from 'axios';
const KEY = 'AIzaSyCjqs520IEykQgLHEvpCRX6MePyGEwRt_k';


// New instance of axios for handleing youtube api requests
export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 4,
        key: KEY,
        type: 'video'
    }
})
