import React, { useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import styles from "./index.module.css";
import nouserimage from "../../assets/images/no-user-image.jpg";
import { ChildishTitle } from "../../components/ChildishTitle";

function Novedades() {
  const [newsFromDB, setNewsFromDB] = useState([
    { name: "placeholder1", image: nouserimage, createdAt: null, id: 2 },
    { name: "placeholder2", image: nouserimage, createdAt: null, id: 3 },
    { name: "placeholder3", image: nouserimage, createdAt: null, id: 4 },
  ]);

  const { httpGet, isFetching } = useHttp();

  const allTheNews = async () => {
    try {
      const res = await httpGet("/news?true");
      setNewsFromDB(res.data.news);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allTheNews();
  }, []);

  return (
    <div className={ styles.section }>
       <ChildishTitle>
         Novedades
       </ChildishTitle>

      {isFetching ? (
        <div className={ styles.containerLoader }>
          <Loader timeout={10000} />
        </div>
      ) : (
        <div className={ styles.newsGrid }>
          {newsFromDB.map((newsItem) => {
            return <Card key={ newsItem.id } path='novedades' card={ newsItem } />;
          })}
        </div>
      )}
    </div>
  );
}

export default Novedades;
