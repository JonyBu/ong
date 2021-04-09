import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import styles from "./slider.module.css";
import "./slider.css";

let arrayDefault = [
  {
    imageUrl:
      "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_960_720.jpg",
    text: " text 1 ",
  },
  {
    imageUrl:
      "https://cdn.pixabay.com/photo/2017/02/07/16/47/kingfisher-2046453_960_720.jpg",
    text: " text 2 ",
  },
  {
    imageUrl:
      "https://cdn.pixabay.com/photo/2017/08/10/02/05/tiles-shapes-2617112_960_720.jpg",
    text: " text 3 ",
  },
];

const Slider = ({ arraySliderItem }) => {
  if (arraySliderItem) {
    arrayDefault = arraySliderItem;
  }

  return (
    <Carousel
      className={styles.container}
      autoPlay={true}
      dynamicHeight={true}
      emulateTouch={true}
      infiniteLoop={true}
      interval={5000}
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
    >
      {arrayDefault.map((element, i) => {
        return (
          <div key={i} className={styles.slider}>
            <img
              src={element.imageUrl}
              alt={element.text}
              className={styles.img}
            />
            <div className={styles.overlay}>
              <p className={styles.text}>
                {element.text}
              </p>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default Slider;
