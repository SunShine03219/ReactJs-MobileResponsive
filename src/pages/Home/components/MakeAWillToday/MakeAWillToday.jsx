import React from 'react';
import { useDispatch } from "react-redux";
import { chatGptAction } from "../../../../store/actions";
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';
import humansWithKey from '../../../../assets/images/home/makeawilltoday/humanswithkey.svg';

const MakeAWillToday = () => {
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
    // history.push('/will')
  }


  return (
    <section className={styles.make_a_will_today}>
      <div className={styles.wrapper}>
        <div className={styles.image}>
          <img src={humansWithKey} alt="Humans with key" />
        </div>
        <div className={styles.content}>
          <p className={styles.upper_heading}>Simple steps</p>
          <h1>Founded by an Estate Planning Attorney</h1>
          <p className={styles.description}>“Founded by an Estate Planning Attorney” doesn't just give our platform a fancy title – it's the heart and soul behind it all. Estate planning attorneys spend years helping folks like yourself secure their futures. We’ve taken all the insider know-how, all the little tips and tricks you'd usually have to pay the big bucks for, and poured them into this friendly, easy-to-use platform. So when you're using our will creator, it's like having a friendly attorney guiding you every step of the way. You're not just ticking off a box on your to-do list; you're taking control of your legacy with a buddy who's got your back.
          </p>
            <button onClick={handleClick}>Make My Will Today</button>
        </div>
      </div>
    </section>
  )
}

export default MakeAWillToday