import React, { useEffect, useState } from "react";
import styles from './styles.module.css';

const colors = [
  "#f26dc4","#44bcc2","#d9d052","#36a629","#ef7a7a",
  "#ea4e4e","#fbd3ed","#99f3f7","#9bd394","#e1d975",
];

function HeadBand() {
  const [color, setColor] = useState("");
  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  }, []);
  return <div className={styles.headband} style={{ backgroundColor: color }} />;
}

export default HeadBand;