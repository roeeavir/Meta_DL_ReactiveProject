import axios from 'axios';

const url = 'http://localhost:5000/lands';

export const fetchPosts = () => axios.get(url);