import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import firebase from '../firebaseConfig'
import styles from './Profile.module.css'
import Avatar from 'react-avatar';
import { useDispatch } from 'react-redux'
import { updateUserImage } from '../reducer/userSlice'

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [userProfileImage, setUserProfileImage] = useState('');
    const navigate = useNavigate();

    const currentUser = firebase.auth().currentUser;
    console.log('current user', currentUser);
    const imageUpload = (e) => {
        let formData = new FormData();
        formData.append("file", e.target.files[0]);
        axios.post("/api/post/image/upload", formData)
            .then((response) => {
                setUserProfileImage(response.data.filePath);
                console.log(response.data);
            })
    }


    const saveProfileImage = async (e) => {
        e.preventDefault();

        try {
            await firebase.auth().currentUser.updateProfile({
                photoURL: userProfileImage
            });
        } catch (err) {
            alert('Failed to save profile image')
            console.log(err);
        }

        if (user) {
            dispatch(updateUserImage(user.uid, userProfileImage))
        }
    }

    useEffect(() => {
        if (currentUser && currentUser.multiFactor.user.photoURL) {
            setUserProfileImage(currentUser.multiFactor.user.photoURL);
        }
    }, [currentUser])


    useEffect(() => {
        if (user.isLoading && !user.accessToken) {
            navigate('/login');
        } else {
            setUserProfileImage(user.photoURL);
        }
    }, [user]);

    console.log(user);

    return (
        <div>
            <form className={styles.profile__form}>
                {user && <h2>Hello {user.displayName}!</h2>}
                <h3>We recommend having a easy-to-see photos<br /> that will boost your credit!</h3>
                <label>
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => imageUpload(e)}
                    />
                    {user.isLoading && currentUser ? (<Avatar size="200"
                        round={true}
                        src={`/api/post/image?imagePath=${userProfileImage || currentUser.multiFactor.user.photoURL}`}
                        alt="image"
                        style={{ cursor: "pointer" }} />) : null}
                </label>
                <h2 type="text" name="name" >{currentUser && (user.displayName || currentUser.multiFactor.user.displayName)}</h2>
                <h3 type="email" name="email" > {user.email} </h3>
                <button onClick={(e) => saveProfileImage(e)}>Save Image</button>
            </form>
        </div>
    )
}

export default Profile
