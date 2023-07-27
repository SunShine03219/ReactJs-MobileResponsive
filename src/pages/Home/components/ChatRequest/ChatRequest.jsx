import React from 'react';
import styles from './styles.module.scss';
import robotAndGuy from '../../../../assets/images/home/chatrequest/robotandguy.svg';
import { useDispatch } from "react-redux";
import { chatGptAction } from "../../../../store/actions";
import { useHistory } from 'react-router-dom';

const ChatRequest = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const handleClick = () => {
    history.push('/blogs')
  }

  return (
    <section className={styles.chat_request}>
      <div className={styles.wrapper}>
        <div className={styles.image}>
          <img src={robotAndGuy} alt="Robot and human" />
        </div>
        <div className={styles.content}>
          <p className={styles.upper_heading}>Answers to your questions</p>
          <h1>Passdown, with ChatGPT</h1>
          <p className={styles.description}>Say hello to your new buddy, our ChatGPT-powered “estate planning expert”! Always ready to have a friendly chat and answer all your burning questions about estate planning, wills, and beyond, 24x7!</p>
          <button onClick={handleClick}>Chat Request</button>
        </div>
      </div>
    </section>
  )
}

export default ChatRequest