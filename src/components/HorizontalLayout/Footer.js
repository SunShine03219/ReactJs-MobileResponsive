import React from "react";
import { Link } from "react-router-dom"
import styles from './styles/footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <p>© 2023 Passdown. - All Rights Reserved</p>
        <div>
          <Link to="/terms">
            <p className={styles.terms}>terms of service</p>
          </Link>
          <Link to="/policy">
            <p className={styles.policy}>privacy policy</p>
          </Link>
          <p>info@passdown.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
