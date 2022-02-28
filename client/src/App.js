
import React, { useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import { useDispatch } from "react-redux";

import { getPosts } from './actions/posts'
import Posts from './components/Posts/Posts'
import Register from './components/Form/Register'
import Login from './components/Form/Login'
import Map from './components/Form/Map'
import memories from './images/memories.jpeg'
import makeStyles from './styles'

const App = () => {
    const classes = makeStyles()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h6">Memories</Typography>
                    <img className={classes.image} src={memories} alt="memories" height="60"/>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Register />
                            <Login/>
                        </Grid>

                    </Grid>
                </Container>
            </Grow>
            <Map />
        </Container>
    )
}

export default App;