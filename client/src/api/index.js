import axios from 'axios';

const usersUrl = 'http://localhost:5000/users';
const landsUrl = 'http://localhost:5000/lands';
const signUp = 'http://localhost:5000/users/signup';
const loginUrl = 'http://localhost:5000/users/login';
const meUrl = 'http://localhost:5000/users/me';


export const fetchPosts = () => axios.get(usersUrl);
export const createPost = (newPost) => axios.post(signUp, newPost);
// export const fetchUser = (user) => axios.get(loginUrl + "userName", user.userName);
// export const fetchUser = (user) => axios.get(`${usersUrl}/${user.userName}`, {params: {password: user.password}});
export const fetchUser = (user) => axios.post(`${loginUrl}`, user);

export const fetchLands = () => axios.get(landsUrl);

export const fetchUserByToken = (token) => axios.get(meUrl, {params: {token: token}});

export const updateLand = (land) => axios.patch(landsUrl, land);