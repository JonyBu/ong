import React, { useEffect, useState } from 'react'
import { useHttp } from '../../../hooks/useHttp';
import Loader from '../../../components/Loader';
import HeadBand from '../../../components/HeadBand';
import styles from '../index.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ActivitiesDetails({ match }) {
    //Here we get the id from the request params
    const id = match.params.id
    const [activityFromDB, setActivityFromDB] = useState({
    })

    const { httpGet, isFetching } = useHttp();
    const getActivity = async (id) => {
        try {
            //this is the petition to the backend of the details
            const res = await httpGet(`/activities/${id}`);
            setActivityFromDB(res.data.activity)
        } catch (error) {
            console.log(error)
        }
    }

     useEffect(() => {
         getActivity(id)
     }, [])

    if (isFetching) {
        return (
            <div className={styles.containerLoader}>
                <Loader timeout={10000} />
            </div>
        )
    }

    return (
        <div className={styles.activityContainer}>
            <HeadBand />
            <h1 className={styles.title}>{activityFromDB.name}</h1>
            <img 
                className={styles.image} 
                src={activityFromDB.image || "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"} 
                alt={`Imagen para ${activityFromDB.image}`} 
            />
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: activityFromDB.content }}></div>
            <div className={styles.footer}>
            <Link to='/actividades'>
                <FontAwesomeIcon icon={ ['fas', 'arrow-left']} size="1x" />
                <span>Otras actividades</span>
            </Link>
            </div>
        </div>
    )
}

export default ActivitiesDetails;