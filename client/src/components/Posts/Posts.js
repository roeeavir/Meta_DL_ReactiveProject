import React from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import makeStyles from './styles'
import './styles.css'

const Posts = () => {
    const posts = useSelector((state) => state.posts);
    const classes = makeStyles()

    console.log("posts ", posts);
    
    return (
        <>
        {/* <h1>POSTS</h1>
        <Post />
        <Post />
        <div className="scroller zoom">
        <section id="boxes">
            {items}
        </section>
        </div> */}
        <div id="lands">
            <ul id="landsMap">
                        {posts.map((post) => (
                <li key={post._id}>
                    <Post post={post} item/>
                </li>
                ))}
            </ul>
        </div>
        {/* <Grid container spacing={100}>
            {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={6} md={4} lg={3} >
                    <Post post={post} item/>
                </Grid>
            ))}
        </Grid> */}
        </>

    )
}

export default Posts;