import React, { useState, useEffect } from 'react'
import axios from 'axios'
import firebase from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'
import styles from './RegisterAndLogin.module.css'

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password || !confirmPassword) {
            return setError('Please fill all the fields first!')
        }
        if (password !== confirmPassword) {
            return setError('Passwords do not match!')
        }

        if (password.length < 6) {
            return setError('Password must be at least 6 characters')
        }

        const createdUser = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);

        await createdUser.user.updateProfile({
            displayName: name,
            photoURL: 'images\\default-image.jpg',
        });

        await createdUser.user.sendEmailVerification();

        console.log('created user', createdUser.user);


        const body = {
            displayName: createdUser.user.multiFactor.user.displayName,
            email: createdUser.user.multiFactor.user.email,
            uid: createdUser.user.multiFactor.user.uid,
            photoURL: 'images\\default-image.jpg',
        };


        axios.post('/api/user/register', body)
            .then(response => {
                if (response.data.success) {
                    navigate('/login')
                } else {
                    return alert('Failed to register user')
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const emailCheckHandler = () => {
        const firebaseAuth = firebase.auth();
        firebaseAuth.fetchSignInMethodsForEmail(email)
            .then((providers) => {
                if (providers.length === 0) {
                    setError("");
                } else {
                    return setError("This email is already in use");
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        emailCheckHandler();
    }, [email])

    return (
        <div className={styles.register}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}

export default Register
