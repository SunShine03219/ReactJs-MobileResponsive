
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import styles from './styles/header.module.scss';
import logo from '../../assets/images/logo-white.svg';
import jwt from "jwt-decode";
import Avatar from '../Custom/Avatar'
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, chatGptAction } from "../../store/actions";


const Header = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.Login);

  const currentPath = location.pathname;

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const access_token = localStorage.getItem('authUser')
    const chat_function = localStorage.getItem('chat_function')
    if (access_token) {
      const userData = jwt(access_token);
      dispatch(setAuthUser(userData));
    }

    if(chat_function === 'true') {
      dispatch(chatGptAction.setChat(true))
      const qaData = JSON.parse(localStorage.getItem('qadata'))
      dispatch(chatGptAction.setData(qaData))
    } else {
      dispatch(chatGptAction.setChat(false))
    }
  }, [dispatch])

  return (
    <React.Fragment>
      <header className="passdown-header">
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <img src={logo} alt="logo" width={150} style={{ fill: "white" }} onClick={() => history.push('/home')} />
          </div>
          <ul className={styles.desktop_nav}>

            <Link to={"/home"}>
              <li className={currentPath === "/home" ? styles.active : ""}>Home</li>
            </Link>
            <Link to={"/about-us"}>
              <li className={currentPath === "/about-us" ? styles.active : ""}>About Us</li>
            </Link>
            <Link to={"/blogs"}>
              <li className={currentPath === "/blogs" ? styles.active : ""}>Blog</li>
            </Link>
            <Link to={"/about-us#contact-us"}>
              <li className={currentPath === "/about-us#contact-us" ? styles.active : ""}>Contact Us</li>
            </Link>

            {user ? (
              <>
                <Link to={'/profile'}>
                  <li className="d-flex align-items-center">
                    <Avatar name={user?.fullName} width={30} height={30} background='#FFFFFF' color="#057CA4" fontSize={16} />
                    <label style={{ marginBottom: 0, marginLeft: 10, color: 'white' }}>{user?.fullName}</label>
                  </li>
                </Link>
                <Link to={'/will'}>
                  <li>My Will</li>
                </Link>
              </>
            ) : (
              <>
                <Link to={"/login"}>
                  <li className={styles.login_btn}>Login</li>
                </Link>
                <Link to={"/register"}>
                  <li className={styles.register_btn}>Register</li>
                </Link>
              </>
            )}
          </ul>
          <div className={styles.hamburger} onClick={toggle}>
            <div />
            <div />
            <div />
          </div>
        </div>
        {isOpen && (
          <ul className={styles.mobile_nav}>
            <Link to={"/home"}>
              <li className={currentPath === "/home" ? styles.active : ""}>Home</li>
            </Link>
            <Link to={"/about-us"}>
              <li className={currentPath === "/about-us" ? styles.active : ""}>About Us</li>
            </Link>
            <Link to={"/blogs"}>
              <li className={currentPath === "/blogs" ? styles.active : ""}>Blog</li>
            </Link>
            <Link to={"/about-us#contact-us"}>
              <li className={currentPath === "/about-us#contact-us" ? styles.active : ""}>Contact Us</li>
            </Link>
            <div className={styles.auth_btns}>
              {user ? (
                <>
                  <li className="d-flex align-items-center">
                    <Avatar name={user?.fullName} />
                    <label style={{ marginBottom: 0, marginLeft: 10 }}>{user?.fullName}</label>
                  </li>
                  <li>My Will</li>
                </>
              ) : (
                <>
                  <Link to={"/login"}>
                    <li className={styles.login_btn}>Login</li>
                  </Link>
                  <Link to={"/register"}>
                    <li className={styles.register_btn}>Register</li>
                  </Link>
                </>
              )}

            </div>
          </ul>
        )}
      </header>
    </React.Fragment>
  );
};

export default Header;


