import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useHttp } from '../../hooks/useHttp';
import { navArray } from '../../utils/navArray';
import { NavLink } from "react-router-dom";

import styles from "./Footer.module.css";

import { mockupDataFromEndpoint } from './mockupDataFromEndpoint';

const Footer = () => {
  const [publicData, setPublicData] = useState({});
  // const { httpGet } = useHttp();

  useEffect(() => {
    let isMounted = true;

    const getOrganizationData = async () => {
      // UNCOMMENT FOR DEVELOP WITH BACKEND
      // const { data } = await httpGet("/organizations/1/public");
      // setPublicData(data.organization);

      // if (isMounted) setPublicData(data.organization);

      //DEVELOP WITHOUT BACKEND
      setPublicData(mockupDataFromEndpoint);
    };

    getOrganizationData();

    return () => {
      // cleanup
      isMounted = false;
    };
  }, []);

  return (
    publicData && 
    ( 
      <footer className= {styles.footer} >
        <section className={styles.ong}>
          <h1>{publicData.name}</h1>
          <img alt={publicData.name} src={publicData.image} />
        </section>
        <section className={styles.webLinks}>
          <h2>Páginas</h2>
          <div>
            { navArray.map((r) => {
                return (
                  <NavLink 
                    key={r.name} 
                    to={r.route} 
                    activeClassName={ styles.activeLink } 
                    className={ styles.link } 
                    exact
                  >
                    {r.name}
                  </NavLink>
                );
              })}
          </div>
        </section>
        <section className={styles.socialLinks}>
          <h2>Redes Sociales</h2>
          <div>
            {publicData.socialNetworks &&
              publicData.socialNetworks.map((s) => {
                return (
                  //Putting a random because the example repeats socialNewtworks names                  
                  <a key={s.name} target="_blank" href={s.url} className={ styles.a }>
                    <FontAwesomeIcon icon={ ['fab', `${ s.name }` ]} size={ "lg" } />
                    {s.name}
                  </a>                  
                );
              })}
          </div>
        </section>
      </footer>
    )
  );
};

export default Footer;
