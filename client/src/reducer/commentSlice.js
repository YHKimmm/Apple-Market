import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    comments: []
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setComments: (state, action) => {
            state.comments = action.payload
        },
        addComment: (state, action) => {
            state.comments.push(action.payload)
        },
        updateComment: (state, action) => {
            state.comments = state.comments.filter(c => c.id !== action.payload)

        },
        deleteComment: (state, action) => {
            state.comments = state.comments.filter(c => c.id !== action.payload)
        },
    }
})

export const getComments = (postId) => async (dispatch) => {
    try {
        const body = {
            postId: postId
        }
        const response = await axios.post('/api/comment/getComments', body)
        if (response.data.success) {
            dispatch(setComments(response.data.commentList))
        } else {
            console.log("Failed to get comments")
        }
    } catch (err) {
        console.log(err)
    }

}

export const postComment = (comment, postId, uid) => async (dispatch) => {
    try {
        const body = {
            comment: comment,
            postId: postId,
            uid: uid,
        }
        const response = await axios.post('/api/comment/postComment', body)
        if (response.data.success) {
            const newComment = { ...response.data.comment }
            newComment.author = response.data.author
            console.log('newComment ', newComment)
            dispatch(addComment(newComment))
        } else {
            console.log("Failed to save Comment")
        }
    } catch (err) {
        console.log(err)
    }
}

export const editComment = (comment, postId, uid, commentId) => async (dispatch) => {
    try {
        const body = {
            postId: postId,
            comment: comment,
            uid: uid,
            commentId: commentId
        }
        const response = await axios.post('/api/comment/editComment', body)
        if (response.data.success) {
            dispatch(updateComment(commentId))
        } else {
            console.log("Failed to edit comment")
        }
    } catch (err) {
        console.log(err)
    }
}

export const removeComment = (commentId, postId) => async (dispatch) => {
    try {
        const body = {
            commentId: commentId,
            postId: postId
        }
        const response = await axios.post('/api/comment/deleteComment', body)
        if (response.data.success) {
            dispatch(deleteComment(commentId))
        } else {
            console.log("Failed to delete comment")
        }
    } catch (err) {
        console.log(err)
    }
}

export const { setComments, addComment, updateComment, deleteComment } = commentsSlice.actions

export default commentsSlice.reducer