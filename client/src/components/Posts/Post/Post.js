import React from 'react';
import makeStyles from './styles'

const Post = ({post}) => {
    const classes = makeStyles()

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
            <div className="land">
      <button
        id="landBtn"
        style={{ background: {getColor}}}
      >
        {post.id}
      </button>
    </div>
    )
}

export default Post;