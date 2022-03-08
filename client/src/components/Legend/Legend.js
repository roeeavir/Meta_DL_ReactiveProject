import React from "react";
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import './styles.css'

export function getColors() {
    return { nland: "red", park: "green", road: "grey", nland_notForSale : "pink" };
}

const Legend = () => {
    let colors = getColors();


    return (
        <div className="legend">
            <h1>Legend of Colors and Meanings</h1>
            <h2 style={{ color: colors.road }}> Road: Grey</h2>
            <h2 style={{ color: colors.park }}> Park: Green</h2>
            <h2 style={{ color: colors.nland_notForSale }}> Land (not for sale and no game): Pink and borderless</h2>
            <h2 style={{ color: colors.nland_notForSale, border: "1px solid black"}}> Land (not for sale and with game): Pink and and with border</h2>
            <h2 style={{ color: colors.nland }}> Land (for sale and no game): red and borderless</h2>
            <h2 style={{ color: colors.nland, border: "1px solid black"}}> Land (for sale and with game): red and has border</h2>
        </div>
    )
};

export default Legend;