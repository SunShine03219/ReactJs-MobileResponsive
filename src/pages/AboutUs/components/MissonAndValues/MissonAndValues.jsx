import React, { useRef, useState } from 'react';

import styles from './styles.module.scss';
import bulb from '../../../../assets/images/about/missionandvalues/bulb.svg';
import vision from '../../../../assets/images/about/missionandvalues/vision.svg';
// import crown from '../../../../assets/images/about/missionandvalues/crown.svg';
// import friendly from '../../../../assets/images/about/missionandvalues/friendly.svg';
// import brain from '../../../../assets/images/about/missionandvalues/brain.svg';
// import misc from '../../../../assets/images/about/missionandvalues/misc.svg';

const MissonAndValues = () => {
  // const containerRef = useRef(null);
  // const [isDragging, setIsDragging] = useState(false);
  // const [startX, setStartX] = useState(null);
  // const [scrollLeft, setScrollLeft] = useState(null);

  // const handleMouseDown = (event) => {
  //   setIsDragging(true);
  //   setStartX(event.pageX - containerRef.current.offsetLeft);
  //   setScrollLeft(containerRef.current.scrollLeft);
  //   containerRef.current.style.cursor = 'grabbing';
  // };

  // const handleMouseMove = (event) => {
  //   if (!isDragging) return;
  //   event.preventDefault();
  //   const x = event.pageX - containerRef.current.offsetLeft;
  //   const walk = (x - startX) * 2;
  //   containerRef.current.scrollLeft = scrollLeft - walk;
  // };

  // const handleMouseUp = () => {
  //   setIsDragging(false);
  //   containerRef.current.style.cursor = 'grab';
  // };

  return (
    <section className={styles.mission_and_values}>
      <div className={styles.wrapper}>

        <div className={styles.mission}>

          <div className={styles.card}>
            <div className={styles.heading}>
              <h3>Our Story</h3>
              <img src={bulb} alt="Bulb" />
            </div>
            <p>
              We started Passdown when we saw a clear problem - creating a will or trust was often too complex, intimidating, and expensive for many people. That didn't sit right with us. We believed in the idea of creating a platform that could simplify this essential life task and make it accessible to all.<br />

              We combined the ease of technology with the in-depth knowledge of skilled estate planning attorneys to produce a service that is changing lives. With ChatGPT, we offer a friendly digital assistant that's ready to answer your questions and guide you through the process, any time of the day or night.

            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.heading}>
              <h3>Our Mission</h3>
              <img src={vision} alt="Bulb" />
            </div>
            <p>
              Our mission at Passdown is simple. We strive to offer a streamlined, affordable solution for creating wills and trusts. We believe that every person should have the chance to secure their legacy and protect their loved ones, no matter their background or financial situation.
              We've committed ourselves to make estate planning less mysterious and more accessible. Our AI-powered 'estate planning guru' is always ready to answer your questions along the way, making the whole process more human and less daunting.
              By doing this, our goal is to empower you to take control of your future, providing you with the peace of mind you deserve.

            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.heading}>
              <h3>Our Promise</h3>
              <img src={bulb} alt="Bulb" />
            </div>
            <p>
              At Passdown, we're with you every step of the way. Whether you're interacting with our AI assistant or reaching out to our human support team, backed by experienced attorneys, we're here to provide you with the guidance you need.
              Join us on this journey. Together, let's simplify estate planning.

            </p>
          </div>

        </div>

        {/* <div className={styles.values}>
          <div className={styles.content}>
            <p className={styles.upper_heading}>Our Values</p>
            <h3>We Are Not Just A Company We Are Like A Family</h3>
          </div>
          <div
            className={styles.cards}
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className={styles.card}>
              <img src={crown} alt="Crown" />
              <h5>Support Team</h5>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</p>
            </div>
            <div className={styles.card}>
              <img src={friendly} alt="Friendly" />
              <h5>Friendly Enviorment</h5>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</p>
            </div>
            <div className={styles.card}>
              <img src={brain} alt="Brain" />
              <h5>Miscellaneous</h5>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</p>
            </div>
            <div className={styles.card}>
              <img src={misc} alt="Misc." />
              <h5>Miscellaneous 2</h5>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  )
}

export default MissonAndValues