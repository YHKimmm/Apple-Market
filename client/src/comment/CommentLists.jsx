import React, { useEffect } from 'react'
import CommentEditDelete from './CommentEditDelete';

function CommentLists({ comments, postId }) {

    return (
        <div>
            {comments.map((comment) => {
                return (
                    <CommentEditDelete comment={comment} postId={postId} key={comment._id}></CommentEditDelete>
                );
            })}
        </div>
    )

}

export default CommentLists
