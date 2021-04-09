import React, { useEffect, useState } from 'react'
import { useHttp } from '../../../hooks/useHttp';
import Loader from '../../../components/Loader';
import HeadBand from '../../../components/HeadBand';
import styles from '../index.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function NewsDetails({ match }) {
    //Here we get the id from the request params
    const id = match.params.id
    const [newsFromDB, setNewsFromDB] = useState({
    })

    const { httpGet, isFetching } = useHttp();
    const thisNews = async (id) => {
        try {
            //this is the petition to the backend of the details
            const res = await httpGet(`/news/${id}`);
            setNewsFromDB(res.data.news)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        thisNews(id)
    }, [])

    if (isFetching) {
        return (
            <div className={styles.containerLoader}>
                <Loader timeout={10000} />
            </div>
        )
    }

    return (
        <div className={styles.newsContainer}>
            <HeadBand />
            <h1 className={styles.title}>{newsFromDB.name}</h1>
            <img 
                className={styles.image} 
                src={newsFromDB.image || "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"} 
                alt={`Imagen para ${newsFromDB.image}`} 
            />
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: newsFromDB.content }}></div>
            <div className={styles.footer}>
                <Link to='/novedades'>
                    <FontAwesomeIcon icon={ ['fas', 'arrow-left']} size="1x" />
                     <span>  Volver a novedades </span>
                </Link>
            </div>
        </div>
    )
}

export default NewsDetails;