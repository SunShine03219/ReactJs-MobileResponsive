import React from 'react';
import { useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom'
import styles from './styles.module.scss';
import guyOnLaptopImg from '../../../../assets/images/home/getstarted/guyonlaptop.svg';
import { chatGptAction } from "../../../../store/actions";


const GetStarted = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleClick = () => {
    const chat_function = localStorage.getItem('chat_function')
    const currentStep = localStorage.getItem('currentStep')
    if(chat_function === null) {
      localStorage.setItem('chat_function', 'true')
      if(!currentStep) {
        dispatch(chatGptAction.getCurrentQuestion({current_step: -1}))
      }
      history.push('/will')
    } else {
      history.push('/will')
    }
  }

  return (
    <section className={styles.get_started}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <p className={styles.upper_heading}>Safe and reliable</p>
          <h1>Your trusted partner in Will Creation</h1>
          <p className={styles.description}>Simplify your will creation to just 10 minutes. Prioritize what's important with our AI-powered tool, backed by legal professionals. Absolutely free. 
          </p>
            <button onClick={handleClick}>Let's Get Started</button>
        </div>
        <div className={styles.image}>
          <img src={guyOnLaptopImg} alt="Guy On Laptop" />
        </div>
      </div>
    </section>
  )
}

export default GetStarted