import React, { useState } from 'react';
import { useDispatch } from "react-redux";

import styles from './styles.module.scss';
import chatImg from '../../../../assets/images/home/hero/chat.svg';
import chat2Img from '../../../../assets/images/home/hero/chat2.svg';
import writingImg from '../../../../assets/images/home/hero/writing.svg';
import checkImg from '../../../../assets/images/home/hero/check.svg';
import arrowImg from '../../../../assets/images/home/hero/arrow.svg';
import sendImg from '../../../../assets/images/home/hero/send.svg';
import {useHistory} from 'react-router-dom'
import { chatGptAction } from "../../../../store/actions";

const Hero = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [isClicked, setIsClicked] = useState(false);
  // const handleClick = () => setIsClicked(!isClicked);

  const handleClick = () => {
    const chat_function = localStorage.getItem('chat_function')
    const currentStep = localStorage.getItem('currentStep')

    if(chat_function === null || chat_function === 'true') {
      localStorage.setItem('chat_function', 'true')
      if(currentStep === null) {
        dispatch(chatGptAction.getCurrentQuestion({current_step: -1}))
      } else {
        const qadata = JSON.parse(localStorage.getItem('qadata'))
        dispatch(chatGptAction.setData(qadata))
      }
      history.push('/will')
    } else {
      history.push('/will')
    }
  }
  return (
    <section className={styles.hero}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h1>Delay no more, set up your free will today</h1>
          <p className={styles.description}>Get started with our attorney-approved, AI-powered platform. Have a Will ready in 10 minutes or less period</p>
          <button onClick={handleClick}>Start Will Now</button>
          <footer>
            <div>
              <img src={checkImg} alt="chat" />
              <p>100% Free</p>
            </div>
            <div>
              <img src={checkImg} alt="chat" />
              <p>No credit card required</p>
            </div>
          </footer>
        </div>
        {!isClicked ? (
          <div className={styles.images}>
            <img className={styles.chat_img} src={chatImg} alt="Chat Img" />
            <img className={styles.writing_img} src={writingImg} alt="Writing Img" />
          </div>
        ) : (
          <div className={styles.images}>
            <img className={styles.chat_img} src={chat2Img} alt="Chat Img" />
            <div className={styles.input_container}>
              <div className={styles.autocomplete}>
                <button>What is ChatGPT</button>
                <button>Contact Us</button>
                <button>About the site</button>
              </div>
              <div className={styles.input_box}>
                <input type="text" placeholder="Ask me anything" />
                <img src={sendImg} alt="Sned Icon" />
              </div>
            </div>
          </div>
        )}
        <div className={styles.scroll_down}>
          <img src={arrowImg} alt="Arrow" />
          <p>Scroll Down</p>
        </div>
      </div>
    </section>
  )
}

export default Hero