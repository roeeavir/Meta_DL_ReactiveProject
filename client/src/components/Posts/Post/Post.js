import React, {useState} from 'react';
import makeStyles from './styles'

const Post = ({post}) => {
    const classes = makeStyles()
    const [color, setColor] = useState("red");
    const colors = {nland: "red", park: "green", road: "grey"}
    let currentColor = colors[post.type]

    console.log("currentColor ", currentColor)

    const getColor = () => {
        if (post.type == 'park') {
            return 'green'
        } else if (post.type == 'road') {
            return 'grey'
        } else {
            return 'red'
        }
    }

    return (
      <button
        id="landBtn"
        style={{ backgroundColor: currentColor}}
      >
        {post.id}
      </button>
    )
}

export default Post;