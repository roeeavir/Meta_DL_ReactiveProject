import React, {useState} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import makeStyles from './formStyles'
import { createPost, getPosts } from '../../actions/actions'

const Register = () => {
    const [postData, setPostData] = useState({userName: '', password: ''})
    const classes = makeStyles()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getPosts())
        dispatch(createPost(postData))
        clear()
    }

    const clear = () => {
        setPostData({userName: '', password: ''})
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>Creating a User</Typography>
                <TextField name="userName" variant="outlined" label="UserName" fullWidth value={postData.userName} onChange={(e) => setPostData({...postData, userName: e.target.value})}/>
                <TextField name="password" variant="outlined" type="password" label="Password" fullWidth value={postData.password} onChange={(e) => setPostData({...postData, password: e.target.value})}/>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" type="submit"  size="large" fullWidth>Register</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Register;