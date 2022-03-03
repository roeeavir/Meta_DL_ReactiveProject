import React, {useState} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import makeStyles from './formStyles'
import { getUser, getPosts, getLands } from '../../actions/actions'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Form = () => {
    const [postData, setPostData] = useState({userName: '', password: ''})
    const [show, setShow] = useState(true);
    const classes = makeStyles()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()


        dispatch(getUser(postData)).then((bool) => {
            console.log("User: ", bool);
            if (bool) {
                dispatch(getLands())
            }
        })


    }

    const clear = () => {
        setPostData({userName: '', password: ''})
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>Login</Typography>
                <TextField name="userName" variant="outlined" label="UserName" fullWidth value={postData.userName} onChange={(e) => setPostData({...postData, userName: e.target.value})}/>
                <TextField name="password" variant="outlined" label="Password" fullWidth value={postData.password} onChange={(e) => setPostData({...postData, password: e.target.value})}/>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" type="submit" size="large" fullWidth>Login</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
            <div>
                <button style={{ display: show ? "none" : "block" }}>Move to map page</button>
            </div>
        </Paper>

        
        // <h1 className={classes.form}>FORM</h1>
    )
}

const Map = () => (
  <div>
    <h2>About</h2>
  </div>
);

export default Form;