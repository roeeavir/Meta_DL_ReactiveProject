import * as api from "../api";

// api.fetchPosts

// Action Creators
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({
      type: "FETCH_POSTS",
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({
      type: "CREATE",
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getUser = (user) => async (dispatch) => {
  try {
    console.log("user: ", user);
    const { data } = await api.fetchUser(user);

    dispatch({
      type: "FETCH_USER",
      payload: data,
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getLands = () => async (dispatch) => {
  try {
    const { data } = await api.fetchLands();

    dispatch({
      type: "FETCH_POSTS",
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserByToken = (token) => async (dispatch) => {
  try {
    console.log("SHIKSE: ", token);
    const { data } = await api.fetchUserByToken(token);

    dispatch({
      type: "FETCH_USER",
      payload: data,
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateLandPrice = (land) => async (dispatch) => {
  
  try {
    const { data } = await api.updateLandPrice(land);
    console.log("land: ", land);
    dispatch({
      type: "UPDATE",
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateLandForSale = (land) => async (dispatch) => {

  try {
    const {
      data
    } = await api.updateLandForSale(land);
    console.log("land: ", land);
    dispatch({
      type: "UPDATE",
      payload: data,
    });
    return true
  } catch (error) {
    console.log(error.message);
    return false
  }
};

export const updateLandGame = (land) => async (dispatch) => {

  try {
    const {
      data
    } = await api.updateLandGame(land);
    console.log("land: ", land);
    dispatch({
      type: "UPDATE",
      payload: data,
    });
    return true
  } catch (error) {
    console.log(error.message);
    return false
  }
};