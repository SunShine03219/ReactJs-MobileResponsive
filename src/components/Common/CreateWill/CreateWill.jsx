import React from 'react';

import styles from './styles.module.scss';
import priceImg from '../../../assets/images/home/createwill/Price.svg';
import timeImg from '../../../assets/images/home/createwill/Time.svg';
import { useHistory } from 'react-router-dom';

const CreateWill = () => {
  const history = useHistory();
  return (
    <section className={styles.create_will}>
      <div className={styles.wrapper}>
        <h1>Now Try Making A Will</h1>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <img src={priceImg} alt="Price" />
            <h2>100%</h2>
            <h5>Free</h5>
          </div>
          <div className={styles.stat}>
            <img src={timeImg} alt="Price" />
            <h2>10 Min</h2>
            <h5>It Takes Time</h5>
          </div>
        </div>
        <button onClick={() => history.push('/will')}>Create A Will Now</button>
      </div>
    </section>
  )
}

export default CreateWill