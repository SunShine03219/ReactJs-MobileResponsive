import React from 'react';

import styles from './styles.module.scss';

import easyToUseImg from '../../../../assets/images/home/advantages/easytouse.svg';
import perfectImg from '../../../../assets/images/home/advantages/perfectdesign.svg';
import supportImg from '../../../../assets/images/home/advantages/support.svg';
import fastImg from '../../../../assets/images/home/advantages/fastcoms.svg';

const Advantages = () => {
  return (
    <section className={styles.advantages}>
      <div className={styles.wrapper}>
        <p className={styles.upper_heading}>Advantages and benefits</p>
        <h1>Benefits Of The Service</h1>
        <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, </p>
        <div className={styles.benefits}>
          <div className={styles.benefit}>
            <img src={easyToUseImg} alt="Easy to use." />
            <h5>Ease of Use:</h5>
            <p>With our intuitive interface, creating your own will has never been simpler. No legal jargon, just straightforward instructions.</p>
          </div>
          <div className={styles.benefit}>
            <img src={perfectImg} alt="Easy to use." />
            <h5>Cost-Effective:</h5>
            <p>Save on expensive legal fees with our free will tool. Get professional quality results without the heavy price tag.</p>
          </div>
          <div className={styles.benefit}>
            <img src={supportImg} alt="Easy to use." />
            <h5>Customizable</h5>
            <p>Your will, your way. Customize your document to suit your unique needs and circumstances.</p>
          </div>
          <div className={styles.benefit}>
            <img src={fastImg} alt="Easy to use." />
            <h5>Secure</h5>
            <p>Your information is safe with us. We utilize top-tier security measures to ensure the utmost protection for your data.</p>
          </div>
          <div className={styles.benefit}>
            <img src={fastImg} alt="Easy to use." />
            <h5>Peace of Mind</h5>
            <p>Feel at ease knowing your final wishes are documented securely and accurately. With Passdown, you're always in good hands.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Advantages