import React, { useEffect } from 'react'
import CommentLists from './CommentLists'
import CommentUpload from './CommentUpload'
import { useDispatch } from 'react-redux';
import { getComments } from '../reducer/commentSlice';

function CommentArea({ postId, comments }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getComments(postId))
    }, [dispatch, postId])

    return (
        <div>
            <CommentUpload postId={postId} />
            <CommentLists comments={comments} postId={postId} />
        </div>
    )
}

export default CommentArea
