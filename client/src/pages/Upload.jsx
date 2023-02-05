import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";
import styles from './Upload.module.css'
import firebase from '../firebaseConfig';
import { useSelector } from "react-redux";

function Upload() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(0);
    const [negotiable, setNegotiable] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            title: title,
            content: content,
            image: image,
            price: price,
            negotiable: negotiable,
            uid: user.uid,
        };

        if (!title || !content || !image || !price) {
            return alert("Please fill all the fields first!");
        }

        if (price < 0) {
            return alert("Price must be greater than 0");
        }

        axios
            .post("/api/post/upload", body)
            .then((response) => {
                if (response.data.success) {
                    alert("Upload Success");
                    navigate("/items");
                } else {
                    alert("Upload Failed");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const isUserEmailVerified = firebase.auth().currentUser?.emailVerified;
    console.log('isUserEmailVerified', isUserEmailVerified)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            if (userInfo === null) {
                console.log(userInfo)
                navigate('/login');
                alert('Please login first');
            }
        });
    }, []);

    useEffect(() => {
        if (isUserEmailVerified === false) {
            return alert('Please check your email in order to verify your account');
        }
    }, [isUserEmailVerified]);



    return (
        <div className={styles.upload__form}>
            <form onSubmit={handleSubmit}>
                <h2>Upload your valuable items!</h2>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <ImageUpload setImage={setImage} />
                <label htmlFor="content">Description</label>
                <textarea
                    id="content"
                    type="text"
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                />
                <div className={styles.checkbox__input}>
                    <label htmlFor="negotiable">Negotiable</label>
                    <input
                        id="negotiable"
                        type="checkbox"
                        checked={negotiable}
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
                        value={price}
                        onChange={(e) => {
                            setPrice(e.target.value);
                        }}
                    />
                </section>
                {isUserEmailVerified === false ? (
                    <div className={styles.button__area}>
                        <button type="submit" disabled>Submit</button>
                    </div>
                ) : (
                    <div className={styles.button__area}>
                        <button type="submit">Submit</button>
                    </div>
                )}
            </form>
        </div >
    );
}

export default Upload;
