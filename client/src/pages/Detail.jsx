import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import styles from './Detail.module.css'
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import CommentArea from '../comment/CommentArea';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { getComments } from '../reducer/commentSlice';

function Detail() {
    const params = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState('');
    const comments = useSelector(state => state.comments.comments)
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const sortedComments = [...comments].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    console.log('sortedComments', sortedComments)

    useEffect(() => {
        axios.get(`/api/post/items/${params.postNum}`)
            .then(response => {
                if (response.data.success) {
                    setItem(response.data.item);
                } else {
                    alert('Failed to get post')
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    useEffect(() => {
        console.log('item', item)
        console.log('user', user)
        console.log('user uid', user.uid)
    }, [item, user])


    const handleDelete = () => {
        axios.delete(`/api/post/items/${params.postNum}/delete`)
            .then(response => {
                if (response.data.success) {
                    alert('Post deleted successfully')
                    navigate(`/items`)
                } else {
                    alert('Failed to delete post')
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        dispatch(getComments(item._id))
    }, [])

    useEffect(() => {
        console.log('comments', comments)
    }, [comments])


    return (
        <main className={styles.container}>
            <Link to='/items' className={styles.arrow__back}>
                <span className="material-symbols-outlined">
                    arrow_back
                </span>
            </Link>
            <section className={styles.item}>
                {item.image && <img src={`/api/post/image?imagePath=${item.image}`} alt="image" />}
                <div className={styles.sub__container}>
                    <div className={styles.userInfo}>
                        {item && (
                            <img src={`/api/post/image?imagePath=${item.author.photoURL}`} alt="image" />
                        )}
                        {item && (<p>{item.author.displayName}</p>)}
                    </div>
                    {user.isLoading && item && user.uid === item.author.uid ? (
                        <div className={styles.utilities}>
                            <Link to={`/items/${params.postNum}/edit`}>
                                <button className="material-symbols-outlined edit">edit</button>
                            </Link>
                            <button className="material-symbols-outlined delete" onClick={handleDelete} >delete</button>
                        </div>
                    ) : null}
                </div>

                <div className={styles.description}>
                    <h1>{item.title}</h1>
                    <p className={styles.createdAt}>{moment(item.createdAt).fromNow()}</p>
                    <div className={styles.price__info}>
                        <p style={{ marginRight: '10px', fontWeight: 'bold' }}>${item.price}</p>
                        {item.negotiable && <p className={styles.negotiable}>💡Negotiable</p>}
                    </div>
                    <p>{item.content}</p>
                </div>
            </section>
            <CommentArea postId={item._id} comments={sortedComments} />
        </main>
    )
}

export default Detail
