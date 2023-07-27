
import styles from './styles.module.scss';
import addIcon from '../../../../assets/images/home/faq/add.svg';
import claseIcon from '../../../../assets/images/icons/clase.png';

import { useState } from 'react';

const Collapes = (props) => {

  const [open, setOpen] = useState(false)
  
  const openContent = () => {
    setOpen(true)
  }

  const closeContent = () => {
    setOpen(false)
  }

  return (
    <div className={`${styles.question}`}>
      <h6 className={styles.question_title}>{props.title}</h6>
      {open && (
        <p className={styles.question_content}>{props.content}</p>
      )}
      {open ? (
        <img src={claseIcon} alt="Open Close Icon" style={{ cursor: 'pointer' }} onClick={closeContent}/>
      ) : (
        <img src={addIcon} alt="Open Close Icon" style={{ cursor: 'pointer' }} onClick={openContent}/>
      )}
    </div>
  )
}

export default Collapes