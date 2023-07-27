import React, { useRef, useState } from 'react';

import styles from './styles.module.scss';
import alia from '../../../../assets/images/about/ourteam/alia.svg';
import khalid from '../../../../assets/images/about/ourteam/khalid.svg';
import tawfiq from '../../../../assets/images/about/ourteam/tawfiq.svg';
import musa from '../../../../assets/images/about/ourteam/musa.svg';
import snapchat from '../../../../assets/images/about/ourteam/snapchat.svg';
import instagram from '../../../../assets/images/about/ourteam/instagram.svg';
import twitter from '../../../../assets/images/about/ourteam/twitter.svg';
import facebook from '../../../../assets/images/about/ourteam/facebook.svg';

const OurTeam = () => {
  const containerRef = useRef(null); // Reference to the container element
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(null);
  const [scrollTop, setScrollTop] = useState(null);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartY(event.pageY - containerRef.current.offsetTop);
    setScrollTop(containerRef.current.scrollTop);
    containerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return; // Return early if dragging hasn't started
    event.preventDefault();
    const y = event.pageY - containerRef.current.offsetTop;
    const walk = (y - startY) * 2; // Adjust scrolling speed by multiplying with a factor
    containerRef.current.scrollTop = scrollTop - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    containerRef.current.style.cursor = 'grab';
  };

  return (
    <section className={styles.our_team}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <p className={styles.upper_heading}>Our Team</p>
          <h2>We Are Not Just A Company We Are Like A Family</h2>
          <p className={styles.description}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.</p>
        </div>
        <div
          className={styles.members_container}
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className={styles.member}>
            <img src={alia} alt="Member" />
            <h5>Alia Ahmed</h5>
            <p>CEO and Co-founder</p>
            <div className={styles.social_media_icons}>
              <img src={snapchat} alt="Socail Media Icon" />
              <img src={instagram} alt="Socail Media Icon" />
              <img src={twitter} alt="Socail Media Icon" />
              <img src={facebook} alt="Socail Media Icon" />
            </div>
          </div>
          <div className={styles.member}>
            <img src={khalid} alt="Member" />
            <h5>Khalid Mohammed</h5>
            <p>Head of Design</p>
            <div className={styles.social_media_icons}>
              <img src={snapchat} alt="Socail Media Icon" />
              <img src={instagram} alt="Socail Media Icon" />
              <img src={twitter} alt="Socail Media Icon" />
              <img src={facebook} alt="Socail Media Icon" />
            </div>
          </div>
          <div className={styles.member}>
            <img src={tawfiq} alt="Member" />
            <h5>Tawfiq Muhammad</h5>
            <p>Head of Marketing</p>
            <div className={styles.social_media_icons}>
              <img src={snapchat} alt="Socail Media Icon" />
              <img src={instagram} alt="Socail Media Icon" />
              <img src={twitter} alt="Socail Media Icon" />
              <img src={facebook} alt="Socail Media Icon" />
            </div>
          </div>
          <div className={styles.member}>
            <img src={musa} alt="Member" />
            <h5>Musa Mahmoud</h5>
            <p>Head of People</p>
            <div className={styles.social_media_icons}>
              <img src={snapchat} alt="Socail Media Icon" />
              <img src={instagram} alt="Socail Media Icon" />
              <img src={twitter} alt="Socail Media Icon" />
              <img src={facebook} alt="Socail Media Icon" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurTeam