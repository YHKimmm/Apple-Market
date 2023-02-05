import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import styles from './Comment.module.css'
import { postComment } from '../reducer/commentSlice';
import { useDispatch } from 'react-redux';

function CommentUpload({ postId }) {
    const [comment, setComment] = useState('');
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        if (user.uid === "") {
            return alert('Please login first to make a comment');
        }

        if (!comment) {
            return alert('Please type something first');
        }

        dispatch(postComment(comment, postId, user.uid))
        setComment('');
    }

    return (
        <div className={styles.comment__form}>
            {user && (
                <form onSubmit={submitHandler}>
                    <input
                        placeholder="Share your thoughts!"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                    <button type="submit">Upload</button>
                </form>
            )}

        </div>
    )
}

export default CommentUpload
