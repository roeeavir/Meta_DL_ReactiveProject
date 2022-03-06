export default (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_POSTS':
            return action.payload;
        case 'FETCH_USER':
            return posts
        case 'CREATE':
            return [...posts, action.payload];
        default:
            return posts
    }
}