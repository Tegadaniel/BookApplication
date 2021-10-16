import React from 'react'
import styles from './footer.module.scss';

export default function BookFooter() {
    return (
        <footer className={`${styles.footer}  mt-5 p-3 `}>
        2021 &copy; BookStore 
    </footer>
    );
}
