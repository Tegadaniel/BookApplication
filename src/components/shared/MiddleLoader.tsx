import React from 'react'
import Loader from 'react-loader-spinner';
import styles from './footer.module.scss';


export default function MiddleLoader() {
    return (
        <div className={`${styles.footer}  mt-5 p-3`}>
            <Loader type="ThreeDots" color="gray" height="100" width="100" />
        </div>
    )
}
