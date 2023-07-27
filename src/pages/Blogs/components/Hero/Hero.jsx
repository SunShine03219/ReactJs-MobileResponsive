import React from 'react';

import styles from './styles.module.scss';
import search from '../../../../assets/images/blogs/Search.svg';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.wrapper}>
        <h1>Meet your Virtual Estate Planning Guide: ChatGPT</h1>
        <h5> Explore the world of wills and trusts with confidence. Whether it's understanding legal jargon or seeking guidance on how to pick guardians for your children, our AI Assistant, ChatGPT, is here for you 24 x 7
        </h5>
        <div className={styles.search_bar}>
          <input type="text" placeholder='Ask ChatGPT about anything related to wills and trusts!' />
          <img src={search} alt="Search Icon" />
        </div>
      </div>
    </section>
  )
}

export default Hero