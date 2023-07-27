import React from 'react';

import styles from './styles.module.scss';
import logo from '../../../../assets/images/about/passdown/logo.svg';
import snapchat from '../../../../assets/images/about/passdown/snapchat.svg';
import instagram from '../../../../assets/images/about/passdown/instagram .svg';
import twitter from '../../../../assets/images/about/passdown/twitter.svg';
import facebook from '../../../../assets/images/about/passdown/facebook.svg';
import meeting from '../../../../assets/images/about/passdown/meeting.svg';

const Passdown = () => {
  return (
    <section className={styles.passdown}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <img src={logo} alt="Logo" />
          <h6>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</h6>
          <br />
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
          <div className={styles.social_media_handles}>
            <img src={snapchat} alt="Social Media" />
            <img src={instagram} alt="Social Media" />
            <img src={twitter} alt="Social Media" />
            <img src={facebook} alt="Social Media" />
          </div>
        </div>
        <div className={styles.image_container}>
          <img src={meeting} alt="Meeting" />
        </div>
      </div>
    </section>
  )
}

export default Passdown