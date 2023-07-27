import React from 'react';

import styles from './styles.module.scss';
import img1 from '../../../../assets/images/about/whyus/1.svg';
import img2 from '../../../../assets/images/about/whyus/2.svg';
import img3 from '../../../../assets/images/about/whyus/3.svg';
import img4 from '../../../../assets/images/about/whyus/4.svg';
import img5 from '../../../../assets/images/about/whyus/5.svg';
import img6 from '../../../../assets/images/about/whyus/6.svg';

const WhyUs = () => {
  return (
    <section className={styles.why_us}>
      <div className={styles.wrapper}>
        <p className={styles.upper_heading}>Why Us?</p>
        <h2>Features We Offer To You</h2>
        <p className={styles.description}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.heading}>
              <img src={img1} alt="Logo" />
              <h4>SIMPLICITY</h4>
            </div>
            <p>Adipisicing adipisicing et ut proident quis ex ullamco laboris sunt dolore nostrud amet laboris proident.Sint in quis eiusmod nulla dolor qui eiusmod irure ex reprehenderit culpa.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.heading}>
              <img src={img2} alt="Logo" />
              <h4>HARD WORK</h4>
            </div>
            <p>Adipisicing adipisicing et ut proident quis ex ullamco laboris sunt dolore nostrud amet laboris proident.Sint in quis eiusmod nulla dolor qui eiusmod irure ex reprehenderit culpa.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.heading}>
              <img src={img3} alt="Logo" />
              <h4>PASSION</h4>
            </div>
            <p>Adipisicing adipisicing et ut proident quis ex ullamco laboris sunt dolore nostrud amet laboris proident.Sint in quis eiusmod nulla dolor qui eiusmod irure ex reprehenderit culpa.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.heading}>
              <img src={img4} alt="Logo" />
              <h4>INNOVATION</h4>
            </div>
            <p>Adipisicing adipisicing et ut proident quis ex ullamco laboris sunt dolore nostrud amet laboris proident.Sint in quis eiusmod nulla dolor qui eiusmod irure ex reprehenderit culpa.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.heading}>
              <img src={img5} alt="Logo" />
              <h4>TEAM WORK</h4>
            </div>
            <p>Adipisicing adipisicing et ut proident quis ex ullamco laboris sunt dolore nostrud amet laboris proident.Sint in quis eiusmod nulla dolor qui eiusmod irure ex reprehenderit culpa.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.heading}>
              <img src={img6} alt="Logo" />
              <h4>GROWTH</h4>
            </div>
            <p>Adipisicing adipisicing et ut proident quis ex ullamco laboris sunt dolore nostrud amet laboris proident.Sint in quis eiusmod nulla dolor qui eiusmod irure ex reprehenderit culpa.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyUs