import React from 'react'
import styles from './Footer.module.css'
import { getYear } from '../utilities/getDates'

function Footer({ copyRight, author }) {
    const imageFolderPath = import.meta.env.BASE_URL + "";

    return (
        <footer>
            <img src={`${imageFolderPath}logo.jpg`} alt="footer logo img" className={styles.logo} />
            <p>&copy; {copyRight} {author} all rights reserved.</p>
        </footer>
    )
}

Footer.defaultProps = {
    author: 'Brayden',
    copyRight: getYear()
}


export default Footer
