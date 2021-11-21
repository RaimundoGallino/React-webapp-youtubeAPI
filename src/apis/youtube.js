import axios from 'axios';
const KEY = 'AIzaSyCOfKBnbjSTh-xwDsZKXPFCPX_OLiDcpU0';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 4,
        key: KEY,
        type: 'video'
    }
})
