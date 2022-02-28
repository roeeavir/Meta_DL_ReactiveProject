import axios from 'axios';

const url = 'http://localhost:5000/lands';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
// export const fetchUser = (user) => axios.get(loginUrl + "userName", user.userName);
export const fetchUser = (user) => axios.get(`${url}/${user.userName}`);