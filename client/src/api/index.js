 import axios from 'axios';

const usersUrl = 'http://localhost:5000/users';
const landsUrl = 'http://localhost:5000/lands';
const signUp = 'http://localhost:5000/users/signup';
const loginUrl = 'http://localhost:5000/users/login';
const meUrl = 'http://localhost:5000/users/me';
const priceUrl = 'http://localhost:5000/lands/price';
const forSaleUrl = 'http://localhost:5000/lands/forSale';
const gameUrl = 'http://localhost:5000/lands/game';
const purchaseUrl = 'http://localhost:5000/lands/purchase';


export const fetchPosts = () => axios.get(usersUrl);

export const createPost = (newPost) => axios.post(signUp, newPost);

export const fetchUser = (user) => axios.post(`${loginUrl}`, user);

export const fetchLands = () => axios.get(landsUrl);

export const fetchUserByToken = (token) => axios.get(meUrl, {params: {token: token}});

export const updateLandPrice = (land) => axios.patch(priceUrl, land);

export const updateLandForSale = (land) => axios.patch(forSaleUrl, land);

export const updateLandGame = (land) => axios.patch(gameUrl, land);

export const purchaseLand = (land,buyer,seller) => axios.patch(purchaseUrl,land,{params :{buyer :buyer,seller:seller}});