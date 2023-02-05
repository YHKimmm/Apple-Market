import React, { useState, useEffect } from 'react'
import ImageUpload from '../components/ImageUpload'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import styles from './Upload.module.css'
import { useNavigate } from 'react-router-dom';
function Edit() {
    const params = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);
    const [negotiable, setNegotiable] = useState(false);

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
        setTitle(item.title);
        setContent(item.content);
        setImage(item.image);
        setPrice(item.price);
        setNegotiable(item.negotiable);
    }, [item])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !content || !image || !price) {
            return alert('Please fill all the fields first!')
        }

        const body = {
            title: title,
            content: content,
            image: image,
            price: price,
            negotiable: negotiable,
        };
        axios.patch(`/api/post/items/${params.postNum}/edit`, body)
            .then(response => {
                if (response.data.success) {
                    alert('Post edited successfully')
                    navigate(`/items/${params.postNum}`)
                } else {
                    alert('Failed to edit post')
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <main>
            <div className={styles.upload__form}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title || ''}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                    <ImageUpload setImage={setImage} />
                    <label htmlFor="content">Description</label>
                    <textarea
                        id="content"
                        type="text"
                        value={content || ''}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                    />
                    <div className={styles.checkbox__input}>
                        <label htmlFor="negotiable">Negotiable</label>
                        <input
                            id="negotiable"
                            type="checkbox"
                            checked={negotiable || false}
                            onChange={(e) => {
                                setNegotiable(e.target.checked);
                            }}
                        />
                    </div>
                    <label htmlFor="price">Price</label>
                    <section className={styles.price__input}>
                        <input
                            id="price"
                            type="number"
                            value={price || 0}
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                        />
                    </section>
                    <div className={styles.button__area}>
                        <button type="submit">Submit</button>
                        <button type="submit"
                            className={styles.cancel}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(-1);
                            }}
                        ><span className="material-symbols-outlined">
                                backspace
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Edit
