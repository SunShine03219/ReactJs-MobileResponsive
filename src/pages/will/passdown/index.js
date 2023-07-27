import React from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AvForm, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import { PassdownAction, currentStepAction, chatGptAction } from "../../../store/actions";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import leftArrow from '../../../assets/images/icons/arrow.png'
import Chat from '../chat'

const Digital = (props) => {
  const dispatch = useDispatch();
  const history = useHistory()

  const [agree, setAgree] = React.useState();

  const { content, email, isChat } = useSelector((state) => ({
    content: state.Passdown.content,
    email: state.Login.user?.email,
    isChat: state.ChatGpt.isChat
  }));

  React.useEffect(() => {
    dispatch(PassdownAction.getContent(email));
  }, [dispatch, email]);

  React.useEffect(() => {
    if (content && content.agree) setAgree(content.agree);
  }, [content]);

  const handleValidSubmit = (values) => {
    if (values.agree === "1") {
      localStorage.setItem("currentStep", 0);
      localStorage.setItem('passdown', values.agree)
      dispatch(currentStepAction.setCurrentStep(0));
      props.next();
    }
  };

  const subSubmitChat = (values) => {
   
  };

  const handleAgree = (e) => {
    setAgree(e.target.value);
  };

  const switchChat = () => {
    localStorage.setItem('chat_function', 'true')
    dispatch(chatGptAction.setChat(true))
    dispatch(chatGptAction.getCurrentQuestion({current_step: -1}))
  }

  return (
    <React.Fragment>
      {isChat ? (
        <Chat content={content} subSubmitChat={subSubmitChat} />
      ) : (
        <AvForm
          className="custom-form mt-4 pt-2"
          onValidSubmit={(e, v) => {
            handleValidSubmit(v);
          }}
        >
          <div className="content-wrapper passdown-container">
            <div className="mb-3">
              <p className="passdown-title">Passdown Terms of Use</p>
              <br />
              <div className="mb-3">
                <div className="mb-3">
                  <p style={{ fontSize: "14px", color: "black" }}>
                    By using this Passdown document generation system, you agree to our Terms of Use and Privacy Policy, and you confirm you are at least 18 years of age. In addition to the foregoing, you specifically acknowledge that no attorney-client relationship is created through your use of this system, and the documents generated ("Passdown Documents") do not constitute legal or tax advice.
                  </p>
                </div>
                <div className="mb-3">
                  <p style={{ fontSize: "14px", color: "black" }}>
                    The Passdown Documents are provided as-is and may not suit your specific needs or circumstances. Before relying on them, consider seeking advice from a licensed attorney and tax professional. You assume all risk and liability that may result from using these documents.
                  </p>
                </div>
                <div className="mb-3">
                  <p style={{ fontSize: "14px", color: "black" }}>
                    All warranties are expressly disclaimed, and while we strive to protect your information, we cannot guarantee its security. It is your responsibility to review all documents carefully before using them.
                  </p>
                </div>
                <p style={{ fontSize: "14px", color: "black" }}>
                  Do you agree to the above terms of use?
                </p>
                <div className="mb-3">
                  <AvRadioGroup
                    inline
                    name="agree"
                    value={agree}
                    onChange={handleAgree}
                  >
                    <AvRadio label="Yes" value="1" color="#087FA7" className="passdown-radio" />
                    <AvRadio label="No" value="0" color="#087FA7" className="passdown-radio" />
                  </AvRadioGroup>
                </div>
              </div>
            </div >
            <div className="button-wrapper" >
              <div className="bottom-left" onClick={() => history.push('/get-start')}>
                <img src={leftArrow} alt="leftArrow" />
                <label>Previous</label>
              </div>
              <button
                disabled={agree === "0"}
                className="button button--submit"
                type="submit"
              >
                <h5 style={{ color: "white", margin: 0 }}> Save & Continue </h5>
              </button>
            </div>

            <div className="switch-will">
              <label>
                Tired of forms? Try creating your will using our new chat feature. <div onClick={switchChat}>Click Here</div>
              </label>
            </div>

          </div >
        </AvForm >
      )}

    </React.Fragment >
  );
};

export default withRouter(Digital);