
import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import { useDispatch } from "react-redux";

import { getPosts, getLands } from './actions/actions'
import Map from './components/Map/Map'
import Register from './components/Form/Register'
import Login from './components/Form/Login'
import memories from './images/memories.jpeg'
import makeStyles from './appStyles'

const App = () => {
    const classes = makeStyles()
    const dispatch = useDispatch()
    const [show, setShow] = useState(true);
    const [text, setText] = useState("Switch to Login");
    const [action, setAction] = useState("Users");
    const userToken = undefined

    useEffect(() => {
        if (action == "Users"){
            console.log("getPosts")
            dispatch(getPosts())
            setAction("Posts")
        }
        else {
            console.log("getLands")
            // getUserToken().then(async (token) => {
            //             userToken = token})
            // console.log("Token: ", userToken)
            dispatch(getLands())
            setAction("Users")
        }
    }, [dispatch])

    const toggleForm = (e) => {
        e.preventDefault()

        setShow((s) => !s)

        setText(text == "Switch to Register" ? "Switch to Login" : "Switch to Register")

    }

    return (
        <Container maxWidth="xl">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h6">SevelLand</Typography>
                    <img className={classes.image} src={memories} alt="memories" height="60"/>
            </AppBar>
                    
            <Grow in>
                <Container>

                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={10} sm={10}>
                            <Grid item xs={1} sm={1}>
                                <button className="toggle" onClick={toggleForm} >{text}</button>
                            </Grid>
                            <Grid item xs={12} sm={4} style={{ display: show ? "block" : "none" }}>
                                <Register  />
                            </Grid>
                            <Grid item xs={12} sm={4} style={{ display: show ? "none" : "block" }}>
                                <Login />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={7}>
                            <Map />
                        </Grid>

                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;