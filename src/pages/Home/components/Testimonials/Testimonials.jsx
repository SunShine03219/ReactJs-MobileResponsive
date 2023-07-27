import React, { useState } from 'react';

import styles from './styles.module.scss';

import ratingImg from '../../../../assets/images/home/testimonials/rating.svg';
import arrowImg from '../../../../assets/images/home/testimonials/arrow.svg';

const Testimonials = () => {
  const [slide, setSlide] = useState(0);

  const slideData = [
    {
      title: "",
      description: "Passdown's free will tool was a lifesaver. Quick, intuitive, and reliable, it turned an expensive necessity into a hassle-free experience. A true game-changer."
    },
    {
      title: "",
      description: "Skeptical at first, Passdown won me over. Their free will tool was straightforward, hassle-free, and gave me peace of mind. An impressive service"
    },
    {
      title: "",
      description: "As a single mom, the high costs of will writing were daunting. Passdown's free will tool was simple, clear, and comforting. Now, I can rest easy knowing my kids are protected."
    },
    {
      title: "",
      description: "Passdown's free will tool was a godsend. Easy to navigate, guided at each step, it gave me the confidence to finalize my will. Highly recommend for seniors like me!"
    },
    {
      title: "",
      description: "Trustworthy, efficient, and user-friendly Passdown's free will tool is revolutionary. Customizing my will was effortless. The future of legal planning is here!"
    }


  ];

  const handleClickPreviuos = () => {
    if (slide > 0) {
      setSlide(slide-1);
    }
  }

  const handleClickNext = () => {
    if (slide < slideData.length - 1) {
      setSlide(slide+1);
    }
  };
  
  return (
    <section className={styles.testimonials}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <p className={styles.upper_heading}>Testimonials</p>
          <h1>What People Say About Us.</h1>
          <div className={styles.dots}>
            {slideData.map((data, index) => (
              <div className={`${(slide === index) ? styles.active_dot : ""} ${styles.dot}`} key={index}/>
            ))}
          </div>
        </div>
        <div className={styles.reviews}>
          <div className={styles.review}>
            <img src={ratingImg} alt="Rating" />
            {/* <h6>{slideData[slide].title}</h6> */}
            <p>{slideData[slide].description}</p>
          </div>
          <div className={styles.change_slide_btns}>
            <button className={styles.previous_slide} onClick={handleClickPreviuos}>
              <img src={arrowImg} alt="Arrow" />
            </button>
            <button className={styles.next_slide} onClick={handleClickNext}>
              <img src={arrowImg} alt="Arrow" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials