export default (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_POSTS':
            return action.payload;
        case 'FETCH_USER':
            return posts
        case 'CREATE':
            return [...posts, action.payload];
        case 'UPDATE':
            return posts.map(post =>
                post._id === action.payload._id ? action.payload : post
            );
        default:
            return posts
    }
}