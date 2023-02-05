import React from 'react'
import axios from 'axios'
import styles from '../pages/Upload.module.css'

function ImageUpload({ setImage }) {

    const fileUpload = (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        axios.post('/api/post/image/upload', formData)
            .then((response) => {
                if (response.data.success) {
                    setImage(response.data.filePath);
                } else {
                    alert("Upload Failed");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className={styles.image__upload}>
            <input
                type="file"
                accept='image/*'
                onChange={fileUpload} />
        </div>
    )
}

export default ImageUpload
