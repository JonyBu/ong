import React from 'react'
import styles from './styles.module.css'

function index(props) {
    return (
        <div className={styles.NewsTitle}>
            <h1>{props.title || "Título no disponible"}</h1>
        </div>
    )
}

export default index
