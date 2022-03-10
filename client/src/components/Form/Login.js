import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import makeStyles from './formStyles'
import { getUser, getPosts, getLands } from '../../actions/actions'

var userToken = "";

export function getUserToken() {
    return userToken
}

async function setUserToken(token) {
    userToken = token
    console.log("User Token: ", token)
}


const Form = () => {
    const [postData, setPostData] = useState({userName: '', password: ''})
    const [text, setText] = useState("Login as Guest");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(true);
    const [token, setToken] = useState("");
    const classes = makeStyles()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(getUser(postData)).then((loginRes) => {
            if (loginRes) {
                setToken(loginRes.token);
                setUserToken(loginRes.token);
                console.log("Token: ", loginRes);
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

        if (token != undefined && token != "") {
            setShow(false)
        } else {
            setShow(true)
        }
    })

    const clear = () => {
        handleLogout()
    }

    const saveUserName = (e) => {
        setUserName(e.target.value)
    }

    const savePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogout = () => {
        setToken(undefined)
        setUserToken(token);
        setUserName("")
        setPassword("")
        setPostData({userName: '', password: ''})
        setText("Login as Guest")
        dispatch(getPosts())
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} style={{ display: show ? "block" : "none" }}>
                <Typography variant='h6'>Login</Typography>
                <TextField name="userName" variant="outlined" label="UserName" fullWidth value={postData.userName} onChange={(e) => {
                    setPostData({...postData, userName: e.target.value})
                    saveUserName(e)
                    }}/>
                <TextField name="password" type="password" variant="outlined" label="Password" fullWidth value={postData.password} onChange={(e) => {
                    setPostData({...postData, password: e.target.value})
                    savePassword(e)
                    }
                }/>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" type="submit" size="large" fullWidth>{text}</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" onClick={handleLogout} size="large" style={{ display: show ? "none" : "block" }} fullWidth>Logout</Button>
        </Paper>

    )
}

export default Form;