import React from 'react';

import styles from './styles.module.scss';

import noCreditCardImg from '../../../../assets/images/home/legalandsafe/nocreditcard.svg';
import nonprofitImg from '../../../../assets/images/home/legalandsafe/nonprofit.svg';
import personalImg from '../../../../assets/images/home/legalandsafe/personaldata.svg';
import checkImg from '../../../../assets/images/home/legalandsafe/check.svg';

const LegalAndSafe = () => {
  return (
    <section className={styles.chat_request}>
      <div className={styles.wrapper}>
        <div className={styles.images}>
          <img className={styles.one} src={noCreditCardImg} alt="No Credit Card Required." />
          <img className={styles.two} src={nonprofitImg} alt="Supported by non profits." />
          <img className={styles.three} src={personalImg} alt="We never sells personal data." />
        </div>
        <div className={styles.content}>
          <p className={styles.upper_heading}>Legal and safe</p>
          <h1> What's Included in My Passdown Will? </h1>
          <p className={styles.description}>With Passdown, creating your will is simple yet thorough! Here is what you can expect your will to include: </p>
          <div className={styles.list}>
            <div className={styles.item}>
              <img src={checkImg} alt="Check" />
              <p> Executor Selection: Choose your trusted person to carry out your will.</p>
            </div>
            <div className={styles.item}>
              <img src={checkImg} alt="Check" />
              <p> Digital Executor: Designate someone to manage your online assets and digital footprint.</p>
            </div>
            <div className={styles.item}>
              <img src={checkImg} alt="Check" />
              <p> Beneficiary Designation: Decide who inherits your belongings.</p>
            </div>
            <div className={styles.item}>
              <img src={checkImg} alt="Check" />
              <p> Guardianship Declaration: If you have kids that are minors, name their guardian.</p>
            </div>

            <div className={styles.item}>
              <img src={checkImg} alt="Check" />
              <p> Pet Caretaker: Name someone to take care of your furry (or not so furry) friends.</p>
            </div>

            <div className={styles.item}>
              <img src={checkImg} alt="Check" />
              <p> Asset Distribution: List your assets to avoid any mix-ups.</p>
            </div>

            <div className={styles.item}>
              <img src={checkImg} alt="Check" />
              <p> Debt and Tax Instructions: Specify how to handle any outstanding bills or taxes.</p>
            </div>

            <div className={styles.item}>
              <img src={checkImg} alt="Check" />
              <p> Special Bequests: Leave particular items or amounts to specific people.</p>
            </div>

            <div className={styles.item}>
              <img src={checkImg} alt="Check" />
              <p> Residual Estate Allocation: Name who gets what's left after specific gifts are given.</p>
            </div>

            <div className={styles.item}>
              <img src={checkImg} alt="Check" />
              <p> Back-Up Plans: List alternates for beneficiaries, executors, and guardians – just in case.</p>
            </div>

            <div className={styles.item}>
              <img src={checkImg} alt="Check" />
              <p> Signatures: Sign your will and have two non-beneficiaries witness it.</p>
            </div>

          </div>

          <p className={styles.description}>Passdown aims to increase the number of Americans with wills, make will creation free, and make it such a quick process that it would be faster to setup and execute your will than buy coffee from Starbucks </p>

        </div>
      </div>
    </section>
  )
}

export default LegalAndSafe