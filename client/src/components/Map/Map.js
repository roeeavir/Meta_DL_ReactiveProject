import React from 'react';
import { useSelector } from 'react-redux';
import Land from './Land/Land';

import './styles.css'

const Map = () => {
    const lands = useSelector((state) => state.reducer);


    if (lands.length != 10000) {
        return (
            <div>
                <h1>Map is loading or user isn't logged in</h1>
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