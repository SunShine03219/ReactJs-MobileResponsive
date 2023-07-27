import React from 'react';

import styles from './styles.module.scss';
import snapchat from '../../../../assets/images/about/passdown/snapchat.svg';
import instagram from '../../../../assets/images/about/passdown/instagram .svg';
import twitter from '../../../../assets/images/about/passdown/twitter.svg';
import facebook from '../../../../assets/images/about/passdown/facebook.svg';
import email from '../../../../assets/images/about/contactus/email.svg';

const Subscribe = () => {
  return (
    <section className={styles.subscribe}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <p className={styles.upper_heading}>Be the first to know</p>
          <h1>Stay in the know - subscribe for our life-changing updates!</h1>
          <div className={styles.social_media_handles}>
            <img src={snapchat} alt="Social Media" />
            <img src={instagram} alt="Social Media" />
            <img src={twitter} alt="Social Media" />
            <img src={facebook} alt="Social Media" />
          </div>
        </div>
        <div className={styles.subscribe_here}>
          <p>Passdown offers content throughout this website for informational purposes only. Passdown is not a law firm and does not provide legal advice.</p>
          <div className={styles.input_box}>
            <img src={email} alt="Icon" />
            <input type="text" placeholder='Enter E-mail address' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Subscribe