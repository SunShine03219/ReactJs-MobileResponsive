import React from 'react';

import styles from './styles.module.scss';
import manHoldingGift from '../../../../assets/images/about/hero/manholdinggift.svg';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.wrapper}>
        <h2><span>Passdown</span>.  Let’s simplify Estate Planning. </h2>
        <p>Welcome to Passdown!  We're a dedicated team of tech enthusiasts and legal experts, passionate about simplifying the complex world of estate planning.</p>
        <img className={styles.img} src={manHoldingGift} alt="Man holding gift" />
      </div>
    </section>
  )
}

export default Hero