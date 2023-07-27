import React from 'react';

import styles from './styles.module.scss';
import phone from '../../../../assets/images/about/contactus/phone.svg';
import emailLg from '../../../../assets/images/about/contactus/email_lg.svg';
import location from '../../../../assets/images/about/contactus/location.svg';
import user from '../../../../assets/images/about/contactus/user - icon.svg';
import email from '../../../../assets/images/about/contactus/email.svg';

const ContactUs = () => {
  return (
    <section className={styles.contact} id='contact-us'>
      <div className={styles.wrapper}>
        <div className={styles.contact_us}>
          <h2>Contact Us</h2>
          <div className={styles.cards}>
            
            {/* <div className={styles.card} style={{background: "#F2667430"}}>
              <img src={phone} alt="Phone" />
              <h4>CONTACT</h4>
            </div> */}

            <div className={styles.card} style={{background: "#00AA6330"}}>
              <img src={emailLg} alt="Email" />
              <h4>EMAIL</h4>
              <p>info@passdown.com</p>
            </div>
            <div className={styles.card} style={{background: "#6FABE630"}}>
              <img src={location} alt="Location" />
              <h4>LOCATION</h4>
              <p>Built in Irvine, California</p>
            </div>
          </div>
        </div>
        <div className={styles.contact_form}>
          <h2>Contact Form</h2>
          <p>If you have any questions or concerns, we are here for you</p>
          <div className={styles.input_box}>
            <img src={user} alt="Icon" />
            <input type="text" placeholder='First and Last name' />
          </div>
          <div className={styles.input_box}>
            <img src={email} alt="Icon" />
            <input type="text" placeholder='Enter E-mail address' />
          </div>
          <textarea name="message" id="message" cols="30" rows="5" placeholder='Enter your message here...' />
          <button>Submit</button>
        </div>
      </div>
    </section>
  )
}

export default ContactUs