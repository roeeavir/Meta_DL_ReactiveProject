import React, {useState, useEffect} from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Land from './Land/Land';
import makeStyles from './mapStyles'
import './styles.css'

const Map = () => {
    const lands = useSelector((state) => state.reducer);
    const classes = makeStyles()

    console.log("Map data: ", lands);

    if (lands.length != 10000) {
        return (
            <div>
                <h1>Map loading or user isn't logged in</h1>
            </div>
        )
    } else {
            return (
        <>
        <div id="lands">
            <ul id="landsMap">
                        {lands.map((post) => (
                <li key={post._id}>
                    <Land post={post} item/>
                </li>
                ))}
            </ul>
        </div>
        </>

        )
    }
}
    


export default Map;