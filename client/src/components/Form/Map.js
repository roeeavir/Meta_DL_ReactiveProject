import React, {useState} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import makeStyles from './styles'
import { createPost } from '../../actions/posts'

const Map = () => {
    // const [postData, setPostData] = useState({userName: '', password: ''})
    const [show, setShow] = useState(true);

    const classes = makeStyles()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()

        // dispatch(createPost(postData))
    }

    const clear = () => {
        // setPostData({userName: '', password: ''})
    }

    return (
    <div>
      <button onClick={() => setShow((s) => !s)}>toggle</button>
      <div style={{ display: show ? "block" : "none" }}>hello</div>
    </div>
        // <h1 className={classes.form}>FORM</h1>
    )
}

export default Map;