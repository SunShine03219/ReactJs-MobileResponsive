import React from "react";
import getStartImg from '../../assets/images/getstart.png'
import rating from '../../assets/images/icons/rating.png'
import check from '../../assets/images/icons/check.png'
import { Link } from 'react-router-dom';

const GetStart = () => {
  return (
    <div className="get-start-container">
      <div className="wrapper">
        <div className="row">
          <div className="col-md-6">
            <div className="left-content">
              <p className="title">Make Your Will Online</p>
              <div className="review-content">
                <p className="sub-title">Excellent </p>
                <img src={rating} alt="rating" />
                <div className="rating-text">
                  <label style={{ marginLeft: 10, fontWeight: 'bold' }}> 4.9 </label>
                  <label style={{ marginLeft: 10 }}> Over </label>
                  <label style={{ marginLeft: 10, fontWeight: 'bold' }}> 13,000 </label>
                  <label style={{ marginLeft: 10 }}> reviews </label>
                </div>
              </div>
              <div className="item">
                <div className="sub-item">
                  <img src={check} alt="check" />
                  <p className="sub-item-title">Protect Your Partner</p>
                </div>
                <p className="item-title">Ensure they have everything they need if you pass away first.</p>
              </div>

              <div className="item">
                <div className="sub-item">
                  <img src={check} alt="check" />
                  <p className="sub-item-title">Secure Your Children’s Future</p>
                </div>
                <p className="item-title">Appoint guardians if they’re under 18 and make sure everyone gets a fair share.</p>
              </div>

              <div className="item">
                <div className="sub-item">
                  <img src={check} alt="check" />
                  <p className="sub-item-title">Share Out Your Estate</p>
                </div>
                <p className="item-title">Divide your property and accounts between friends, family and charities.</p>
              </div>
              
              <div className="continue-btn">
                <Link to={"/will"}>
                  <button>Continue Online</button>
                </Link>
              </div>


            </div>
          </div>
          <div className="col-md-6">
            <div className="right-content">
              <img src={getStartImg} alt="getStartImg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default GetStart;
