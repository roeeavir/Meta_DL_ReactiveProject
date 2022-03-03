import React, {useState} from 'react';
import makeStyles from './landStyles'

const Land = ({post}) => {
    const classes = makeStyles()
    const colors = {nland: "red", park: "green", road: "grey"}
    let currentColor = colors[post.type]

    return (
      <button
        id="landBtn"
        style={{ backgroundColor: currentColor}}
      >
        {post.id}
      </button>
    )
}

export default Land;