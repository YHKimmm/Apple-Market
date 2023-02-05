import React, { useState, useEffect } from 'react'
import styles from './Comment.module.css'
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { editComment } from '../reducer/commentSlice';
import { removeComment } from '../reducer/commentSlice';
import { getComments } from '../reducer/commentSlice';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const customModalButton = {
    backgroundColor: '#666',
    color: '#ffffff',
    padding: '12px 18px',
    border: 'none',
    borderRadius: '18px',
    cursor: 'pointer',
    margin: '10px',
}


function CommentEditDelete({ comment, postId }) {
    const [commentInfo, setCommentInfo] = useState(comment.comment);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const user = useSelector(state => state.user);
    // const comments = useSelector(state => state.comments)

    const dispatch = useDispatch();

    const submitEditHandler = (e) => {
        e.preventDefault();
        dispatch(editComment(commentInfo, comment.postId, user.uid, comment._id));
        dispatch(getComments(postId))
        setIsEdit(false);
    }

    const handleDeleteComment = (e) => {
        e.preventDefault();
        dispatch(removeComment(comment._id, comment.postId));
        dispatch(getComments(postId))
        setShowDeleteModal(false);
    }

    const handleOpenDeleteModal = () => {
        setShowDeleteModal(true);
    }

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    }



    return (
        <div key={comment._id} className={styles.comment__lists}>
            <section className={styles.user__info}>
                <div className={styles.user__description}>
                    {comment.author.photoURL && (<img src={`/api/post/image?imagePath=${comment.author.photoURL}`} alt="image" />)}
                    <h4>{comment.author.displayName}</h4>
                </div>
                <p>{comment.comment}</p>
                {user.uid !== "" && (
                    <>
                        <button
                            className="material-symbols-outlined edit"
                            onClick={() => setIsEdit(!isEdit)}
                        >Edit</button>
                        <button
                            className="material-symbols-outlined delete"
                            onClick={handleOpenDeleteModal}
                        >Delete</button>
                    </>
                )}
            </section>

            {user.uid === comment.author.uid && isEdit && (
                <div className={styles.edit__comment}>
                    <form>
                        <input
                            type="text"
                            value={commentInfo}
                            onChange={(e) => setCommentInfo(e.target.value)}
                        />
                        <button type="submit" onClick={submitEditHandler}>Save</button>
                    </form>
                </div>
            )}

            {user.uid === comment.author.uid && (
                <section className={styles.modal}>
                    <Modal
                        isOpen={showDeleteModal}
                        onRequestClose={handleCloseDeleteModal}
                        style={customStyles}
                        contentLabel="Delete Modal"
                        ariaHideApp={false}
                    >
                        <h2>Are you sure want to delete this comment?</h2>
                        <button
                            onClick={handleDeleteComment}
                            style={customModalButton}
                        >Yes</button>
                        <button
                            onClick={handleCloseDeleteModal}
                            style={customModalButton}
                        >No</button>
                    </Modal>
                </section>
            )}
        </div>
    )
}

export default CommentEditDelete
