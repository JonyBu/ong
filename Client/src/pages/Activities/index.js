import React, { useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import styles from "./index.module.css";
import nouserimage from "../../assets/images/no-user-image.jpg";
import { ChildishTitle } from "../../components/ChildishTitle";

function Actividades() {
  const [activitiesFromDB, setActFromDB] = useState([
    { name: "placeholder1", image: nouserimage, createdAt: null, id: 2 },
    { name: "placeholder2", image: nouserimage, createdAt: null, id: 3 },
    { name: "placeholder3", image: nouserimage, createdAt: null, id: 4 },
  ]);

  const { httpGet, isFetching } = useHttp();

  const getAllActivities = async () => {
    try {
      const res = await httpGet("/activities");
      setActFromDB(res.data.activities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllActivities();
  }, []);

  return (
    <div className={ styles.section }>
       <ChildishTitle>
        Actividades
       </ChildishTitle>

      {isFetching ? (
        <div className={ styles.containerLoader }>
          <Loader timeout={10000} />
        </div>
      ) : (
        <div className={ styles.activitiesGrid }>
          {activitiesFromDB.map((activityItem) => {
            return <Card key={ activityItem.id } path='actividades' card={ activityItem } />;
          })}
        </div>
      )}
    </div>
  );
}

export default Actividades;
