import React from 'react';

import styles from './styles.module.scss';

import createdImg from '../../../../assets/images/home/stats/created.svg';
import membersImg from '../../../../assets/images/home/stats/members.svg';
import visitorsImg from '../../../../assets/images/home/stats/visitors.svg';

const Stats = () => {
  return (
    <section className={styles.stats}>
      <div className={styles.wrapper}>
        <div className={styles.stat}>
          <img src={createdImg} alt="Created" />
          <h1>33%</h1>
          <p>Only 33% of Americans have an Estate Plan</p>
        </div>
        <div className={styles.stat}>
          <img src={membersImg} alt="Members" />
          <h1>$1,000 - $4,000</h1>
          <p>Average cost of having an attorney draft an estate plan</p>
        </div>
        <div className={styles.stat}>
          <img src={visitorsImg} alt="Visitors" />
          <h1>10 hrs</h1>
          <p>Average of 10+ hours to have a Estate Plan drafted by an attorney</p>
        </div>
      </div>
    </section>
  )
}

export default Stats