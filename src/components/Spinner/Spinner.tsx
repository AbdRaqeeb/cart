import React from 'react';
import styles from './Spinner.module.css';

const Spinner = () => {
    return (
        <div className={styles.spinnerContainer}>
            <div className={styles.loading}></div>
        </div>
    );
};

export default Spinner;