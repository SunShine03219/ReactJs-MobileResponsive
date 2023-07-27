import React from 'react';

import styles from './styles.module.scss';

import formImg from '../../../../assets/images/home/makeawill/form.svg';
import printerImg from '../../../../assets/images/home/makeawill/printer.svg';
import safeImg from '../../../../assets/images/home/makeawill/safe.svg';

const MakeAWill = () => {
  return (
    <section className={styles.make_a_will}>
      <div className={styles.wrapper}>
        <p className={styles.upper_heading}>Easy and Fast</p>
        <h1>Make A Will In 3 Easy Steps</h1>
        <div className={styles.steps}>
          <div className={styles.step}>
            <img src={formImg} alt="Form Pic" />
            <h5>Chat it out</h5>
            <p>Have a friendly conversation with our will builder bot. Follow the step-by-step instructions to gather the necessary info for your will creation.</p>
            <div className={styles.dashed_line} />
          </div>
          <div className={styles.step}>
            <img src={printerImg} alt="Printer Pic" />
            <h5>Print your will</h5>
            <p>The information you provided is transformed into a legally valid will and given back to you as an immediately printable document.
            </p>
            <div className={styles.dashed_line} />
          </div>
          <div className={styles.step}>
            <img src={safeImg} alt="Safe Pic" />
            <h5>Make it official </h5>
            <p>Follow the included instructions to print, sign, and formalize your document. Keep it in a safe yet reachable place. It's your security blanket for the future!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MakeAWill