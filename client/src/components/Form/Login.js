import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import makeStyles from './formStyles'
import { getUser, getPosts, getLands } from '../../actions/actions'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Form = () => {
    const [postData, setPostData] = useState({userName: '', password: ''})
    const [text, setText] = useState("Login as Guest");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
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

    useEffect(() => {
        if (userName == "" && password == "") {
            setText("Login as Guest")
        } else {
            setText("Login as Registered User")
        }
    })

    const clear = () => {
        setPostData({userName: '', password: ''})
    }

    const saveUserName = async (e) => {
        await setUserName(e.target.value)
    }

    const savePassword = async (e) => {
        await setPassword(e.target.value)
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>Login</Typography>
                <TextField name="userName" variant="outlined" label="UserName" fullWidth value={postData.userName} onChange={(e) => {
                    setPostData({...postData, userName: e.target.value})
                    saveUserName(e)
                    }}/>
                <TextField name="password" variant="outlined" label="Password" fullWidth value={postData.password} onChange={(e) => {
                    setPostData({...postData, password: e.target.value})
                    savePassword(e)
                    }
                }/>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" type="submit" size="large" fullWidth>{text}</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
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