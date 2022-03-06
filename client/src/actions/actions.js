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

    console.log(data);

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

        console.log(data);
    
        dispatch({
            type: "FETCH_USER",
            payload: data,
        });
        return data;
    } catch (error) {
        console.log(error.message);
    }
    }
