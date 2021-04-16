import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Card = ({ card, path }) => {

  const id = card.id; 
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if ( card.content && card.updatedAt) {
      const previewContent = card.content;
      const indexOfContent = previewContent.indexOf('<p>');
                      
      const contentInitial = indexOfContent;
      const sizeOfContent = 100;
    
      const subContent = indexOfContent != -1 ? 
        previewContent.substr(contentInitial, sizeOfContent)
        : previewContent.substr(0, sizeOfContent);

      const subContentCleaned = subContent.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "");

      setContent(subContentCleaned + '...');
      
      const date = new Date(card.updatedAt);
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      const spanishDate = date.toLocaleDateString('es-ES', options);

      setDate(spanishDate);
    }
  }, [])

  return (
    <Link to={ `/${path}/${id}` } >
      <div className={styles.cardBody}>
        <img
          className={styles.cardImage}
          src={card.image || "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"}
          alt={`imagen para ${card.name}`}
        />        
        <div className={styles.textWrapper}>
          <h2 className={styles.cardTitle}>{card.name}</h2>
          <span className={styles.date}>{date}</span>
          <div className={styles.details}>
            <p className={styles.content}>{content}</p>
            <Link to={ `/${path}/${id}` } className={styles.link}>
              Leer más
              <FontAwesomeIcon icon={ ['fas', 'long-arrow-alt-right']} size="lg" />
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
