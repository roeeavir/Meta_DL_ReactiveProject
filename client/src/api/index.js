import axios from 'axios';

const usersUrl = 'http://localhost:5000/users';
const landsUrl = 'http://localhost:5000/lands';


export const fetchPosts = () => axios.get(usersUrl);
export const createPost = (newPost) => axios.post(usersUrl, newPost);
// export const fetchUser = (user) => axios.get(loginUrl + "userName", user.userName);
export const fetchUser = (user) => axios.get(`${usersUrl}/${user.userName}`, {params: {password: user.password}});

export const fetchLands = () => axios.get(landsUrl);