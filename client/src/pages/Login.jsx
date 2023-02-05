import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import firebase from '../firebaseConfig'
import styles from './RegisterAndLogin.module.css'
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            return setError('Please fill all the fields first!')
        }

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            navigate('/items');
        } catch (err) {
            if (err.code === "auth/user-not-found") {
                setErrorMessage("Not exist email")
            } else if (err.code === "auth/wrong-password") {
                setErrorMessage("Password is not matched")
            } else {
                setErrorMessage("Failed to login / Both email and password are not matched")
            }
            console.log('err', err.code)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setErrorMessage('');
        }, 5000)
    }, [errorMessage])


    return (
        <div className={styles.login}>
            <form onSubmit={handleSubmit}>
                <label>E-mail</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className={styles.loginSignInButton}>Sign In</button>
                <span>Don't have an account? <Link to='/register'>SIGN UP</Link> new account for free!</span>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    )
}

export default Login
