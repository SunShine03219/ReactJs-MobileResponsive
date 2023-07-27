import React from 'react';

import styles from './styles.module.scss';
import profilePicLg from '../../../../assets/images/about/keymembers/profilepiclg.svg';
import profilePicSm from '../../../../assets/images/about/keymembers/profilepicsm.svg';
import arrow from '../../../../assets/images/about/keymembers/arrow.svg';

const KeyMembers = () => {
  return (
    <section className={styles.key_members}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <p className={styles.upper_heading}>Key Team Members</p>
          <h2>Passdown Is The Best Place I Ever Worked At.</h2>
          <p className={styles.description}>I've been working at Passdown. since the beginning and I've been here for more than 10 years and I can honestly say that this is the best place I ever worked at. Passdown has come a long way since it was founded and I recommend it to anyone. Interns, Juniors, Mediors or Seniors. Anyone can easily find a place at Passdown and fit in just fine.</p>
          <div className={styles.profile_info}>
            <img src={profilePicSm} alt="Profile Pic" />
            <div className={styles.info}>
              <h6>Ahmed Ahmed</h6>
              <p>Senior Software Developer</p>
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.arrows}>
              <img src={arrow} className={styles.arrow_one} alt="Arrow" />
              <img src={arrow} className={styles.arrow_two} alt="Arrow" />
            </div>
            <div className={styles.date}>01/02/2023</div>
          </div>
        </div>
        <div className={styles.image_container}>
          <img src={profilePicLg} alt="Profile Pic" />
        </div>
      </div>
    </section>
  )
}

export default KeyMembers