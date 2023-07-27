import React, { useState, useEffect } from "react";
import Avatar from '../../components/Custom/Avatar'
import editIcon from '../../assets/images/icons/edit.png'
import passwordIcon from '../../assets/images/icons/password.png'
import profileImg from '../../assets/images/profile-img.png'
import profileMain from '../../assets/images/profile-main.png'
import check from '../../assets/images/icons/check.png'
import delIcon from '../../assets/images/icons/small-del.png'
import arrrowRight from '../../assets/images/icons/arrow-right.png'
import { LogoutOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, updateUserInfo, setSuccess, passwordChange, currentStepAction } from "../../store/actions";
import { CustomButton, CustomModalContent, ModalOverlay } from '../../components/Custom/General'
import successIcon from '../../assets/images/icons/success.png'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import emailIcon from '../../assets/images/icons/email.png'
import userIcon from '../../assets/images/icons/user.png'
import mistake from '../../assets/images/icons/mistake.png'
import emailSuccessIcon from '../../assets/images/icons/emailsuccess.png'
import { useHistory } from "react-router-dom";
import API from '../../helper/api'
import { Spin, Alert, Popconfirm  } from 'antd'

const Profile = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [willExist, setWillExist] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  const [currentUserId, setCurrentUserId] = useState(null)
  const [openPass, SetOpenPass] = useState(false)
  const [passMatchErr, setPassMatchErr] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(null)

  const { loading, success, change_success, error, message, user } = useSelector((state) => state.Login);

  useEffect(() => {
    if (success) {
      setOpenEdit(false)
      setOpenSuccess(true)
      dispatch(setSuccess(false));
    }
  }, [success, dispatch])

  useEffect(() => {
    if (change_success) {
      SetOpenPass(false)
      setIsSuccess(true)
    }
  }, [change_success])

  useEffect(() => {
    const currentStep = localStorage.getItem('currentStep')
    if (currentStep) {
      setWillExist(true)
      setCurrentStep(currentStep)
    } else {
      setWillExist(false)
    }
  }, [])

  const logout = () => {
    dispatch(logoutUser(props.history))
  }

  const editShowModal = (userId) => {
    setCurrentUserId(userId)
    setOpenEdit(true)
  }

  const handleValidSubmit = (event, values) => {
    dispatch(updateUserInfo(values, currentUserId));
  };

  const changePassModal = (userId) => {
    setCurrentUserId(userId)
    SetOpenPass(true)
  }

  const handleChangePass = (event, values) => {
    if (values.new_password !== values.confirm_password) {
      setPassMatchErr(true)
    } else {
      dispatch(passwordChange(values, currentUserId));
    }
  };

  const closeModal = () => {
    SetOpenPass(false)
    setOpenEdit(false)
    dispatch(setSuccess(false));
  }

  const confirm = (e) => {
    API.delete(`/will/deleteWillByEmail/${user.email}`)
    .then(res => {
      if(res.data.success) {
        localStorage.removeItem('assetsData')
        localStorage.removeItem('childrenData')
        localStorage.removeItem('digitalData')
        localStorage.removeItem('executorData')
        localStorage.removeItem('giftsData')
        localStorage.removeItem('infoData')
        localStorage.removeItem('petsData')
        localStorage.removeItem('provisionsData')
        localStorage.removeItem('residuaryData')
        localStorage.removeItem('passdownData')
        localStorage.removeItem('currentStep')
        setWillExist(false)
        dispatch(currentStepAction.setCurrentStep(0))
      }
    })
  };

  const cancel = (e) => {};

  return (
    <div className="profile-container">
      <div className="wrapper">
        <div className="row mt-4">
          <div className="col-md-6">
            <div className="profile-item">
              <Avatar name={user?.fullName} width={100} height={84} background={'#D1F4FF'} color="#057CA4" fontSize={35} />
              <div className="profile-item-detail">
                <div className="detail-header">
                  <p className="name">{user?.fullName}</p>
                  <div className="flex header-right" onClick={() => editShowModal(user?.id)}>
                    <label> Edit </label>
                    <img src={editIcon} alt="editIcon" />
                  </div>
                </div>
                {/* <p className="sub-name">+1 (949) 999-9999</p> */}
                <p className="sub-name">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="profile-item">
              <div className="profile-item-detail">
                <div className="detail-header">
                  <img src={passwordIcon} alt="passwordIcon" />
                  <div className="flex header-right" onClick={() => changePassModal(user?.id)}>
                    <label> Edit </label>
                    <img src={editIcon} alt="editIcon" />
                  </div>
                </div>
                <p className="sub-pass">Your Password</p>
                <p className="sub-pass-hidden">****************</p>
              </div>
            </div>
          </div>
        </div>

        <div className="will-contain">
          <div className="row">
            <div className="col-md-6 p-4">
              <p className="title">My Will</p>
              {willExist ? (
                <>
                  <div className="will-item">
                    <div className="sub-will-item">
                      <label>10/10/2023 | 10:00 AM</label>
                      <div className="top-right">
                        <div className="right" style={{ cursor: 'pointer' }}>
                          <label style={{ margin: 0, marginRight: 7 }} onClick={() => history.push('/will')}> Edit </label>
                          <img src={editIcon} alt="editIcon" width={24} height={24} />
                        </div>
                        <div className="vetival" style={{ marginLeft: 5, marginRight: 5, marginTop: 3 }}> | </div>
                        <div className="right" style={{ cursor: 'pointer' }}>
                          <Popconfirm
                            title="Delete the will"
                            description="Are you sure to delete this will?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                          >
                            <label style={{ margin: 0, marginRight: 7 }}> Delete </label>

                          </Popconfirm>
                          <img src={delIcon} alt="delIcon" width={24} height={24} />
                        </div>
                      </div>
                    </div>

                    <div className="sub-will-item">
                      <label style={{ color: 'black' }}>FULL NAME</label>
                      <div className="top-right">
                        <div className="right">
                          <label style={{ margin: 0, marginRight: 7 }} > {user?.fullName} </label>
                        </div>
                      </div>
                    </div>

                    <div className="sub-will-item">
                      <label style={{ color: 'black' }}> Status </label>
                      <div className="top-right">
                        <div className="right" style={{ cursor: 'pointer' }} onClick={() => history.push('/will')}>
                          <label style={{ margin: 0, marginRight: 7, color: '#00AA63', cursor: 'pointer' }}> {Number(currentStep) === 9 ? 'Completed' : `Current Step: ${currentStep}`} </label>
                          <img src={arrrowRight} alt="arrrowRight" width={20} height={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="mt-4">
                    <CustomButton className="create-will-btn" type="button" width={232} height={45} fontSize={20} background={'#00AA63'}> Add A New Will </CustomButton>
                  </div> */}
                </>
              ) : (
                <>
                  <p className="no-will-text">There is currently no will :(</p>
                  <p className="normal">Get started now and feel free to write your will</p>
                  <CustomButton className="create-will-btn" type="button" width={232} height={45} fontSize={20} background={'#087FA7'} onClick={() => history.push('/get-start')}> Create A Will Now </CustomButton>
                  <div className="flex" style={{ marginTop: 40 }}>

                    <div className="flex" style={{ alignItems: 'center' }}>
                      <img src={check} alt="check" width={10} height={10} />
                      <label style={{ margin: 0, marginLeft: 10 }}> 100% Free </label>
                    </div>

                    <div className="flex" style={{ alignItems: 'center', marginLeft: 50 }}>
                      <img src={check} alt="check" width={10} height={10} />
                      <label style={{ margin: 0, marginLeft: 10 }}> No credit card required </label>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="col-md-6 relative" style={{ display: 'flex', justifyContent: 'flex-end', padding: 30 }}>
              <img src={profileImg} alt="profileImg" className="support-img"/>
              <img src={profileMain} alt="profileMain" style={{ position: 'absolute', top: 152 }} />
            </div>
          </div>

        </div>

        <div className="wrapper-footer mt-4">
          <div className="logout">
            <LogoutOutlined style={{ fontSize: '16px', color: 'red' }} />
            <label onClick={logout}> LogOut </label>
          </div>
        </div>
      </div >

      <ModalOverlay isOpen={openEdit}>
        <CustomModalContent isOpen={openEdit} width={500} height={400}>
          <div className="modal-container">
            {loading && <Spin />}
            <p style={{ fontSize: 45, fontWeight: 'bold', color: '#057CA4' }}>Edit Information</p>
            <p style={{ fontSize: 18 }}>You can edit your basic information here</p>
            {user && (
              <AvForm
                model={user}
                className="custom-form mt-4 pt-2"
                onValidSubmit={(e, v) => {
                  handleValidSubmit(e, v);
                }}
              >
                <div className="mb-3">
                  <div className="icon-container">
                    <img src={userIcon} alt="userIcon" />
                  </div>
                  <AvField
                    name="fullName"
                    className="form-control custom-input"
                    placeholder="Enter First and Last name"
                    type="text"
                    required
                  />
                </div>
                <div className="mb-3">
                  <div className="icon-container">
                    <img src={emailIcon} alt="emailIcon" />
                  </div>
                  <AvField
                    name="email"
                    className="form-control custom-input"
                    placeholder="Enter E-mail address"
                    type="email"
                    required
                  />
                </div>

                <div style={{ marginTop: 20 }}>
                  <CustomButton className="login-btn" type="button" width={150} height={45} fontSize={20} background={'red'} style={{ marginRight: 20 }} onClick={closeModal}> Cancel </CustomButton>
                  <CustomButton className="login-btn" type="submit" width={150} height={45} fontSize={20} background={'#087FA7'} > Save </CustomButton>
                </div>

              </AvForm>
            )}
          </div>
        </CustomModalContent>
      </ModalOverlay>

      <ModalOverlay isOpen={openSuccess}>
        <CustomModalContent isOpen={openSuccess} width={355} height={280}>
          <div className="">
            <img src={successIcon} alt="successIcon" />
            <p style={{ marginTop: 30 }}>Thank you for trusting us Modifications saved successfully</p>
            <div style={{ marginTop: 20 }}>
              <CustomButton className="login-btn" type="submit" width={150} height={45} fontSize={20} background={'#087FA7'} onClick={() => setOpenSuccess(false)}> Ok </CustomButton>
            </div>
          </div>
        </CustomModalContent>
      </ModalOverlay>

      <ModalOverlay isOpen={openPass}>
        <CustomModalContent isOpen={openPass} width={500} >
          <div className="modal-container">
            {loading && <Spin />}
            <p style={{ fontSize: 45, fontWeight: 'bold', color: '#057CA4' }}>Change Password</p>
            <p style={{ fontSize: 18 }}>Strong password include numbers, letters, and punctuation marks.</p>
            {passMatchErr && (
              <Alert message="New passwords must match" type="error" />
            )}
            {error !== '' && (
              <Alert message={error} type="error" />
            )}
            <AvForm
              className="custom-form mt-4 pt-2"
              onValidSubmit={(e, v) => {
                handleChangePass(e, v);
              }}
            >
              <div className="mb-3">
                <div className="icon-container">
                  <img src={userIcon} alt="userIcon" />
                </div>
                <AvField
                  name="old_password"
                  type="password"
                  className="form-control custom-input"
                  required
                  placeholder="Old Password"
                />
              </div>
              <div className="mb-3">
                <div className="icon-container">
                  <img src={emailIcon} alt="emailIcon" />
                </div>
                <AvField
                  name="new_password"
                  type="password"
                  className="form-control custom-input"
                  required
                  placeholder="New Password"
                />
              </div>

              <div className="mb-3">
                <div className="icon-container">
                  <img src={emailIcon} alt="emailIcon" />
                </div>
                <AvField
                  name="confirm_password"
                  type="password"
                  className="form-control custom-input"
                  required
                  placeholder="Confirm New Password"
                />
              </div>

              <div style={{ marginTop: 20 }}>
                <CustomButton className="login-btn" type="button" width={150} height={45} fontSize={20} background={'red'} onClick={closeModal} style={{ marginRight: 20 }}> Cancel </CustomButton>
                <CustomButton className="login-btn" type="submit" width={150} height={45} fontSize={20} background={'#087FA7'} > Save </CustomButton>
              </div>

            </AvForm>
          </div>
        </CustomModalContent>
      </ModalOverlay>


      <ModalOverlay isOpen={isSuccess}>
        <CustomModalContent isOpen={isSuccess} width={355}>
          <div className="error-content">
            <img src={emailSuccessIcon} alt="emailSuccessIcon" />
            <p>{message}</p>
            <CustomButton className="login-btn" type="submit" width={150} height={45} fontSize={20} background={'#087FA7'} onClick={() => {
              setIsSuccess(false)
              dispatch(setSuccess(false))
            }}> Ok </CustomButton>
          </div>
        </CustomModalContent>
      </ModalOverlay>

      <ModalOverlay isOpen={isError}>
        <CustomModalContent isOpen={isError} width={355}>
          <div className="error-content">
            <img src={mistake} alt="mistake" />
            <p>{error}</p>
            <CustomButton className="login-btn" type="submit" width={150} height={45} fontSize={20} background={'#087FA7'} onClick={() => setIsError(false)}> Ok </CustomButton>
          </div>
        </CustomModalContent>
      </ModalOverlay>

    </div >
  )
};

export default Profile;
