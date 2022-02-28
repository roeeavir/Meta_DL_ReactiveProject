import axios from 'axios';

const url = 'http://localhost:5000/lands';
const loginUrl = 'http://localhost:5000/lands';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const fetchUser = (userName) => axios.get(loginUrl, {params: {userName}});