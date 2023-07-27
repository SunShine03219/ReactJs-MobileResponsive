import React, { useEffect, useState, useRef } from "react";
import chatImg from '../../assets/images/chat.png'
import youImg from '../../assets/images/you.png'
import sendImg from '../../assets/images/icons/send.png'
import movieImg from '../../assets/images/movie.gif'
import { useSelector, useDispatch } from "react-redux";
import { chatGptAction, currentStepAction } from "../../store/actions";
import { AutoComplete } from 'antd';
import { states, relations } from '../../constants/auto-complete'
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tooltip, Button } from "antd";
import { useHistory } from 'react-router-dom';


const Chat = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [answer, setAnswer] = useState('')
  const [showGif, setShowGif] = useState(false)
  const [options, setOptions] = useState([])
  const [qa_data, setQAData] = useState([])
  const [relationTypes, setRelationTypes] = useState([])

  const [stateInput, setStateInput] = useState(false)
  const [commonInput, setCommonInput] = useState(true)
  const [relationInput, setRelationInput] = useState(false)

  const { user, qadata } = useSelector((state) => ({
    user: state.Login.user,
    qadata: state.ChatGpt.qadata
  }));

  useEffect(() => {
    if (qadata?.length) {
      localStorage.setItem('qadata', JSON.stringify(qadata))
      setQAData(qadata)
    }
  }, [qadata])


  useEffect(() => {
    setOptions(states)
    setRelationTypes(relations)
  }, [])

  useEffect(() => {
    if (qadata?.length > 0) {
      setStateInput(false)
      setCommonInput(true)
      setRelationInput(false)

      let reversedArr = [...qadata].reverse();
      let field;
      let firstCount = 0
      reversedArr.map((item) => {
        if (Object.keys(item).includes('field') && firstCount === 0) {
          firstCount = 1
          field = item.field
        }
        return false
      })

      if (field === 'state' || field === 'guardianState' || field === 'backupGuardianState' || field === 'executor_state' || field === 'backupexecutor_state' || field === 'digitalExecutor_state' || field === 'backupDigitalExecutor_state' || field === 'caretaker_state' || field === 'backupCaretakerState' || field === 'realEstate_state' || field === 'realEstate_state_again' || field === 'retirement_state' || field === 'retirement_state_again' || field === 'brokerage_state' || field === 'brokerage_state_again' || field === 'lifeInsurance_state' || field === 'lifeInsurance_state_again' || field === 'bankAccount_state' || field ==='bankAccount_state_again' || field === 'vehicle_state' || field === 'vehicle_state_again' || field === 'businesses_state' || field === 'businesses_state_again' || field === 'other_state' || field === 'other_state_again') {
        setStateInput(true)
        setCommonInput(false)
        setRelationInput(false)
      }
      if (field === 'guardianRelation' || field === 'backupGuardianRelation' || field === 'recipientRelation' || field === 'beneficairy_relationship' || field === 'beneficairy_relationship_again' || field === 'nobeneficairy_relation' || field === 'nobeneficairy_relationship_again' || field === 'backupexecutor_relation' || field === 'executor_relation' || field === 'digitalExecutor_relation' || field === 'backupDigitalExecutor_relation' || field === 'caretaker_relation' || field === 'backupCaretakerRelation') {
        setStateInput(false)
        setCommonInput(false)
        setRelationInput(true)
      }
    }

  }, [qadata])

  const chatRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
    inputRef.current.focus();
  }, [qa_data])

  const handleInputChange = (event) => {
    setAnswer(event.target.value)
  }

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      let reversedArr = [...qadata].reverse();
      let field;
      let firstCount = 0
      reversedArr.map((item) => {
        if (Object.keys(item).includes('field') && firstCount === 0) {
          firstCount = 1
          field = item.field
        }
        return false
      })

      if (field === 'email' || field === 'agree') {
        const sendData = {}
        sendData[field] = answer
        dispatch(chatGptAction.updateVal(answer))
        setAnswer('')
        setShowGif(true)
        setTimeout(function () {
          dispatch(chatGptAction.sendData(sendData))
          setShowGif(false)
        }, 1000);
      } else {
        let sendData = {}
        sendData[field] = answer
        if (user) {
          sendData.email = user.email
        } else {
          const infoData = JSON.parse(localStorage.getItem("infoData1"));
          if (infoData) {
            sendData.email = infoData.email
          } else {
            const currentEamil = localStorage.getItem('currentEamil')
            sendData.email = currentEamil
          }
        }

        dispatch(chatGptAction.updateVal(answer))
        setAnswer('')

        setShowGif(true)
        setTimeout(function () {
          dispatch(chatGptAction.sendData(sendData))
          setShowGif(false)
        }, 1000);
      }

    }
  }

  const sendMessage = () => {
    let reversedArr = [...qadata].reverse();
    let field;
    let firstCount = 0
    reversedArr.map((item) => {
      if (Object.keys(item).includes('field') && firstCount === 0) {
        firstCount = 1
        field = item.field
      }
      return false
    })

    if (field === 'email' || field === 'agree') {
      const sendData = {}
      sendData[field] = answer
      dispatch(chatGptAction.updateVal(answer))
      setAnswer('')
      setShowGif(true)
      setTimeout(function () {
        dispatch(chatGptAction.sendData(sendData))
        setShowGif(false)
      }, 1000);
    } else {
      let sendData = {}
      sendData[field] = answer
      if (user) {
        sendData.email = user.email
      } else {
        const infoData = JSON.parse(localStorage.getItem("infoData1"));
        if (infoData) {
          sendData.email = infoData.email
        } else {
          const currentEamil = localStorage.getItem('currentEamil')
          sendData.email = currentEamil
        }
      }

      dispatch(chatGptAction.updateVal(answer))
      setAnswer('')

      setShowGif(true)
      setTimeout(function () {
        dispatch(chatGptAction.sendData(sendData))
        setShowGif(false)
      }, 1000);
    }
  }

  const handleSelect = (value) => {
    setAnswer(value)
  };

  const handleSearchState = (searchTxt) => {
    let filteredOptions = states.filter(option => option.value.toUpperCase().includes(searchTxt.toUpperCase()))

    if (filteredOptions.length === 0) {
      filteredOptions = states
    }

    setOptions(filteredOptions);
    setAnswer(searchTxt)
  }

  const handleSearchRelation = (searchTxt) => {
    let filteredOptions = relations.filter(option => option.value.toUpperCase().includes(searchTxt.toUpperCase()))
    if (filteredOptions.length === 0) {
      filteredOptions = relations
    }
    setRelationTypes(filteredOptions);

    setAnswer(searchTxt)
  }

  const switchGoForm = () => {
    localStorage.setItem('chat_function', 'false')
    let currentEmail;
    if (user) {
      currentEmail = user.email
    } else {
      const infoData = JSON.parse(localStorage.getItem("infoData1"));
      if (infoData) {
        currentEmail = infoData.email
      } else {
        currentEmail = localStorage.getItem('currentEamil')
      }
    }
    dispatch(chatGptAction.switchGoForm(currentEmail))
  }

  const goReview = () => {
    localStorage.setItem('currentStep', 10)
    dispatch(currentStepAction.setCurrentStep(10))
    history.push('/will')
  }

  console.log('qa_data =>', qa_data)

  return (
    <div className="chat-container">
      <div className="chat-main" ref={chatRef}>
        {qa_data.map((item, key) => (
          <div key={key}>
            <div className="chat-bot" key={'question' + key}>
              <img src={chatImg} alt="chatImg" width={49} height={49} />
              <div className="chat-bot-content">
                <div className="bot-content">
                  <p className="bot-question">
                    {item?.question && (
                      <div className="flex" style={{ position: 'relative' }}>
                        <div dangerouslySetInnerHTML={{ __html: item?.question }} />

                        {item.field === 'email' && (
                          <Tooltip
                            placement="right"
                            color={'#057CA4'}
                            title={
                              <span >
                                The email address you provide serves as a distinct marker
                                for your documents, ensuring you can return and pick up
                                where you left off whenever you wish. <br /> Furthermore, we also
                                offer the convenience of sending your documents directly to
                                this email, enabling you to store them for future reference.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined style={{ position: 'absolute', top: 70, left: 215 }} />
                          </Tooltip>
                        )}

                        {item.field === "fullName" && (
                          <Tooltip
                            placement="right"
                            color={'#057CA4'}
                            title={
                              <span>
                                Provide your full legal name to ensure your will is properly
                                identified and executed. <br />Providing accurate and complete
                                information helps avoid confusion and potential disputes
                                among your beneficiaries, ensuring that your estate is
                                distributed according to your wishes.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined style={{ marginTop: 5, marginLeft: 10 }} />
                          </Tooltip>
                        )}

                        {item.field === "maritalStatus" && (
                          <Tooltip
                            placement="top"
                            color={'#057CA4'}
                            title={
                              <span>
                                Indicate your marital status and spouse's name to help
                                clarify the distribution of assets and any spousal rights.
                                <br />
                                This information is crucial for determining how your estate
                                will be divided and whether your spouse has any claims to
                                your assets under your state's inheritance laws.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined style={{ marginTop: 5, marginLeft: 10 }} />
                          </Tooltip>
                        )}

                        {item.field === "haveChildren" && (
                          <Tooltip
                            placement="right"
                            color={'#057CA4'}
                            title={
                              <span>
                                List the names and birthdates of all your children,
                                including stepchildren or adopted children, to ensure
                                proper inheritance. <br />Providing this information helps to
                                accurately identify your beneficiaries and prevents
                                disputes among family members about who should inherit
                                your estate.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined style={{ position: 'absolute', top: 68, left: 205 }} />
                          </Tooltip>
                        )}

                        {item.field === "ageAllowed" && (
                          <Tooltip
                            placement="top"
                            color={'#057CA4'}
                            title={
                              <span>
                                Identify any minor children to ensure appropriate
                                guardianship and financial provisions are included
                                in your will. <br />Knowing which children are minors
                                allows you to make informed decisions about their
                                care and financial support in case you pass away
                                before they reach adulthood.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined style={{ marginTop: 5, marginLeft: 10 }} />
                          </Tooltip>
                        )}

                        {item.field === "guardianName" && (
                          <Tooltip
                            placement="top"
                            color={'#057CA4'}
                            title={
                              <span>
                                Nominate a trusted individual to care for your
                                minor children and a backup to ensure their
                                well-being. <br />Selecting a guardian and a backup
                                helps provide security for your children's future
                                and ensures they receive proper care and guidance
                                if you are no longer able to provide for them.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined style={{ marginTop: 5, marginLeft: 10 }} />
                          </Tooltip>
                        )}

                        {item.field === "exist" && (
                          <Tooltip
                            placement="right"
                            color={'#057CA4'}
                            title={
                              <span>
                                Specify any assets or amounts you'd like to distribute to
                                particular individuals, organizations, or causes. Detailing
                                specific bequests allows you to ensure that your loved ones,
                                favorite charities, or other organizations receive the
                                assets you want them to have.
                                <br />
                                Note: leaving a gift to someone in this manner is completely
                                optional so feel free to skip this question.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined style={{ position: 'absolute', left: 535, top: 5 }} />
                          </Tooltip>
                        )}

                        {item.field === "gifts" && (
                          <Tooltip
                            placement="left"
                            color={'#057CA4'}
                            overlayInnerStyle={{ width: '700px' }}
                            title={
                              <span>
                                When preparing your will, it's essential to understand
                                that certain types of assets, such as bank accounts, are
                                not initially subject to probate. These assets generally
                                (a) allow you to designate beneficiaries from within an
                                account itself, or (b) are held under joint ownership,
                                allowing them to bypass the probate process and be
                                distributed directly to the intended recipients outside
                                of this Will.
                                <br />
                                As such it is important to understand the beneficiary
                                designations, or joint owners, that you list on those
                                accounts take precedence over any provisions you create
                                in this will.
                                <br />
                                Here is a non-exhaustive list of non-probate assets and
                                how you can pass these assets on to loved ones outside
                                of probate:
                                <br />
                                <ol>
                                  <li>
                                    Retirement Accounts (e.g., 401(k), IRA): Ensure you
                                    have a designated beneficiary listed on your
                                    account. Keep the beneficiary information up-to-date
                                    and consider naming a contingent beneficiary in case
                                    the primary beneficiary predeceases you.
                                  </li>
                                  <li>
                                    Bank Accounts (e.g., checking, savings): Utilize
                                    payable-on-death (POD) or transfer-on-death (TOD)
                                    designations to allow the account to be transferred
                                    directly to the named beneficiary upon your death.
                                  </li>
                                  <li>
                                    Brokerage Accounts: Like bank accounts, use a TOD
                                    designation to allow your investments to transfer
                                    directly to the beneficiary without probate.
                                  </li>
                                  <li>
                                    Life Insurance Policies: List a beneficiary for each
                                    policy to ensure the death benefit is paid directly
                                    to them upon your passing. Review and update
                                    beneficiary information as needed, and consider
                                    naming contingent beneficiaries.
                                  </li>
                                  <li>
                                    Jointly Owned Property (e.g., real estate,
                                    vehicles): Ensure the property is titled as joint
                                    tenants with rights of survivorship or as tenants by
                                    the entirety. Upon the death of one owner, the
                                    property automatically passes to the surviving owner
                                    without going through probate.
                                  </li>
                                </ol>
                                Note, It is best practice to keep beneficiaries on those
                                accounts updated to ensure that your wishes are
                                fulfilled.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined style={{ marginTop: 5, marginLeft: 10 }} />
                          </Tooltip>
                        )}

                        {item.field === "distribution" && (
                          <Tooltip
                            placement="bottom"
                            color={'#057CA4'}
                            overlayInnerStyle={{ width: '700px' }}
                            title={
                              <span>
                                This question asks you to decide how you'd like the remaining assets of your estate (known as the "residue") to be distributed after all specific bequests (aka specific gifts), debts, taxes, and expenses have been paid.<br /><br />
                                Option 1: "All to My Spouse"
                                If you select this option, all remaining assets of your estate will be given to your spouse. This is often chosen by individuals who want to ensure their spouse is financially secure before any other distributions are made.<br /><br />
                                Option 2: "All to My Children, Split Equally, Per Stirpes"
                                If you choose this option, the remaining assets of your estate will be equally divided among your children. If a child predeceases you, their share will be distributed to their descendants. This is what "per stirpes" means – it's a legal term for this type of distribution. For example, if you have two children and one has already passed away but has two children of their own, your grandkids would each receive half of their parent's share (their parent being your child). <br />
                                Please note, in some jurisdictions, a surviving spouse may have a right to community property, which are assets acquired during the marriage. This means that even if you choose this option, your spouse may still have a claim to a portion of the estate's assets.<br /><br />
                                Option 3: Custom Distribution
                                Selecting this option allows you to specify a custom plan for the distribution of your remaining assets. You might choose this if you want to include friends, distant relatives, or charities in your will, or if you want to specify different amounts for different heirs.<br />
                                Remember, it's essential that your will reflects your wishes accurately. Consider consulting with a legal professional if you're unsure about any part of this process.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined style={{ marginTop: 5 }} />
                          </Tooltip>
                        )}

                        {item.field === "beneficairy_name" && (
                          <Tooltip
                            placement="bottom"
                            color={'#057CA4'}
                            overlayInnerStyle={{ width: '700px' }}
                            title={
                              <span>
                                Detail how your remaining estate, known as the
                                residuary estate, should be distributed among your
                                beneficiaries and provide an alternate plan in
                                case they don't survive you. This helps ensure
                                that your assets are distributed according to your
                                wishes and provides a clear plan for any
                                unforeseen circumstances.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined style={{ marginTop: 35, marginLeft: 10 }} />
                          </Tooltip>
                        )}

                        {item.field === "nobeneficairy_name" && (
                          <Tooltip
                            placement="bottom"
                            color={'#057CA4'}
                            overlayInnerStyle={{ width: '700px' }}
                            title={
                              <span>
                                This question asks you to designate a contingent beneficiary or beneficiaries for your residuary estate, which is the remainder of your assets after all specific bequests, debts, taxes, and expenses have been paid. <br />
                                A contingent beneficiary is someone who will inherit your residuary estate in the event that none of the primary beneficiaries you've named (like a spouse, children, or others in your will) survive you. It's a way of ensuring that your assets will go to a party of your choice, rather than being distributed according to state law, which may not align with your personal wishes. <br />
                                When choosing your contingent beneficiary, consider those individuals, charities, or organizations that align with your values and wishes. This could be a close friend, a non-immediate family member, a beloved charity, or an educational institution, among others. <br />
                                Remember, it's essential that your will reflects your wishes accurately. Consider consulting with a legal professional if you're unsure about any part of this process.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined />
                          </Tooltip>
                        )}

                        {item.field === "executor_name" && (
                          <Tooltip
                            placement="bottom"
                            color={'#057CA4'}
                            title={
                              <span>
                                Nominate a reliable individual to manage your estate,
                                known as the executor, and a backup to ensure a smooth
                                probate process. <br />The executor plays a crucial role in
                                carrying out your wishes and distributing your assets,
                                so choose someone you trust and who can handle the
                                responsibilities.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined />
                          </Tooltip>
                        )}

                        {item.field === "digitalAssets" && (
                          <Tooltip
                            placement="bottom"
                            color={'#057CA4'}
                            title={
                              <span>
                                Decide if you'd like provisions for managing your
                                digital assets, such as social media accounts, online
                                banking, and digital files. <br /> Including a provision for
                                digital assets ensures that your online presence and
                                valuable digital assets are handled according to your
                                wishes.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined />
                          </Tooltip>
                        )}

                        {item.field === "digitalExecutor_name" && (
                          <Tooltip
                            placement="bottom"
                            color={'#057CA4'}
                            title={
                              <span>
                                Nominate a person to handle your digital assets
                                and a backup to ensure your digital legacy is
                                managed properly.<br />The digital executor will be
                                responsible for managing, transferring, or closing
                                your digital accounts according to your wishes, so
                                choose someone you trust and who is tech-savvy.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined />
                          </Tooltip>
                        )}

                        {item.field === "digitalAssetName" && (
                          <Tooltip
                            placement="bottom"
                            color={'#057CA4'}
                            title={
                              <span>
                                Digital assets include a broad range of
                                online accounts, digital files, and
                                intellectual property. When listing your
                                digital assets, provide a clear description
                                of each asset (e.g., email accounts, social
                                media profiles, blogs, digital photos,
                                cryptocurrency wallets), instructions on
                                where to find them, and any additional
                                guidance for your Digital Executor. Think
                                about factors like privacy concerns,
                                sentimental value, and financial
                                implications when deciding how you'd like
                                each asset to be managed. For example, you
                                may want some digital assets to be archived,
                                while others should be deleted or
                                transferred to specific beneficiaries. By
                                giving detailed and unambiguous
                                instructions, you can ensure that your
                                digital legacy is preserved and managed
                                according to your wishes.
                                <br />
                                Don't forget to go to Schedule A after you
                                create your will to manually fill in all
                                usernames and passwords, where relevant.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined />
                          </Tooltip>
                        )}



                        {item.field === "havePets" && (
                          <Tooltip
                            placement="bottom"
                            color={'#057CA4'}
                            title={
                              <span>
                                List your pets' names and species if you'd like to include
                                provisions for their care after your passing.<br /> Including a
                                pet provision ensures that your beloved pets are taken
                                care of according to your wishes and that they continue to
                                receive love and care even when you are no longer able to
                                provide it.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined />
                          </Tooltip>
                        )}

                        {item.field === "caretaker_name" && (
                          <Tooltip
                            placement="bottom"
                            color={'#057CA4'}
                            title={
                              <span>
                                Nominate a person to care for your pets and a backup
                                to ensure they're taken care of according to your
                                wishes.<br />Select someone who will be committed to
                                providing a loving home for your pets, and a backup
                                in case the primary caretaker is unable to fulfill
                                the role.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined />
                          </Tooltip>
                        )}


                        {item.field === "allocate" && (
                          <Tooltip
                            placement="bottom"
                            color={'#057CA4'}
                            title={
                              <span>
                                Decide if you'd like to allocate funds from your
                                estate for your pet caretaker to use for your pets'
                                care.<br />Setting aside funds for pet care ensures that
                                your pets receive the necessary care, including
                                food, shelter, and medical expenses, without placing
                                an undue financial burden on the caretaker.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined />
                          </Tooltip>
                        )}

                        {item.field === "administration" && (
                          <Tooltip
                            placement="bottom"
                            color={'#057CA4'}
                            title={
                              <span>
                                Consider including an "Independent Administration"
                                clause to allow your executor to manage your estate
                                with minimal court supervision, potentially expediting
                                the probate process and reducing associated costs.<br />
                                This clause can be beneficial if you trust your
                                executor's judgment and ability to handle your estate
                                efficiently and effectively.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined />
                          </Tooltip>
                        )}

                        {item.field === "compensation" && (
                          <Tooltip
                            placement="bottom"
                            color={'#057CA4'}
                            title={
                              <span>
                                Decide if your executor should have the option to
                                receive reasonable compensation for their efforts,
                                guided by the legal standard.<br />Compensating your executor
                                can be a considerate gesture that acknowledges the time
                                and effort required to manage your estate.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined style={{ marginTop: 3, marginLeft: 10 }} />
                          </Tooltip>
                        )}

                        {item.field === "specific" && (
                          <Tooltip
                            placement="bottom"
                            color={'#057CA4'}
                            title={
                              <span>
                                Specify your preferences for burial and funeral
                                proceedings to ensure your final wishes are respected
                                and followed.<br />Providing detailed instructions helps
                                alleviate the burden on your loved ones, who may be
                                uncertain about your preferences during a difficult
                                time.<br />Consider any religious or cultural beliefs, the
                                location of your burial or cremation, and any specific
                                requests for your funeral or memorial service.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined style={{ marginTop: 3, marginLeft: 10 }} />
                          </Tooltip>
                        )}

                        {item.field === "wishForService" && (
                          <Tooltip
                            placement="top"
                            color={'#057CA4'}
                            overlayInnerStyle={{ width: '700px' }}
                            title={
                              <span>
                                Remember, this section is completely optional.
                                <br />
                                That said, if you prefer to outline your burial and
                                funeral preferences, it's essential to be as
                                specific and detailed as possible to ensure your
                                end-of-life wishes are respected and carried out.
                                <br />
                                For your memorial service you should feel free to
                                indicate your wishes (e.g., religious or secular,
                                intimate or large gathering, specific songs or
                                readings).
                                <br />
                                For the final disposition of your body, you should
                                feel free to indicate your wishes (e.g., burial,
                                cremation, burial at sea, green burial). If you
                                choose cremation, specify how you want your ashes to
                                be handled, such as scattering in a particular
                                location or given to a specific person. If you're
                                picking a standard burial, feel free to indicate the
                                location of your preferred cemetery or burial plot,
                                or any desired inscriptions on your headstone or
                                memorial. If you have specific cultural or religious
                                traditions you would like to be observed, make sure
                                to include those as well.
                                <br />
                                It is also a good idea to discuss your wishes with
                                your loved ones to ensure they understand and are
                                prepared to honor your preferences. By providing
                                clear and comprehensive instructions in your will,
                                you can ease the burden on your family and friends
                                during a difficult time and ensure your final wishes
                                are carried out as you intended. However, keep in
                                mind that funeral and burial instructions in a will
                                may not always be legally binding, so it's essential
                                to communicate your desires to your loved ones and
                                consider additional methods to ensure your wishes
                                are respected, such as creating a separate legally
                                binding document or preplanning and prepaying for
                                funeral arrangements.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined />
                          </Tooltip>
                        )}


                        {item.field === "haveAssets" && (
                          <Tooltip
                            placement="bottom"
                            color={'#057CA4'}
                            title={
                              <span>
                                Creating a thorough asset inventory is crucial to helping
                                your beneficiaries and executor understand the scope of your
                                estate and simplifying the probate process.<br />When listing
                                your assets, consider marital property laws in your state
                                and assume that any asset acquired during your marriage is
                                owned 50/50 with your spouse, unless a prenuptial or
                                postnuptial agreement states otherwise.<br />Include all relevant
                                categories of assets, such as real estate, retirement
                                accounts, brokerage accounts, life insurance policies, bank
                                accounts, vehicles, businesses, and other valuables like
                                jewelry, artwork, or collectibles. Remember to update your
                                inventory regularly to reflect changes in your assets and
                                store it in a secure yet accessible location, so your
                                executor and beneficiaries can easily find and reference it.
                                <br />
                                Note: this section is completely optional. Your Will remains
                                valid without this section.
                              </span>
                            }
                          >
                            <QuestionCircleOutlined style={{ marginTop: 3, marginLeft: 10 }} />
                          </Tooltip>
                        )}
                        {item.field === "complete" && (
                          <Button onClick={goReview}>Click Here to review your will!!!</Button>
                        )}
                      </div>
                    )}

                    {item?.error && (
                      <div dangerouslySetInnerHTML={{ __html: item?.error }} />
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="chat-answer" key={'answer' + key}>
              {item.answer && (
                <>
                  <div className="result">
                    <label>{item?.answer}</label>
                  </div>
                  <img src={youImg} alt="youImg" width={49} height={49} />
                </>
              )}

            </div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        {showGif && (
          <div className="flex move-container">
            <img src={chatImg} alt="chatImg" width={49} height={49} />
            <img src={movieImg} alt="movieImg" className="move-icon" />
          </div>
        )}
        <div className="result-insert">
          {commonInput && (
            <input className="anwser-input" type="text" name="answer" placeholder="Ask me anything..." onChange={handleInputChange} value={answer} onKeyPress={handleKeyPress} ref={inputRef} />
          )}

          {stateInput && (
            <AutoComplete
              options={options}
              value={answer}
              onSelect={handleSelect}
              onSearch={handleSearchState}
              placeholder="Ask me anything..."
              ref={inputRef}
              className="auto_complete"
              onKeyPress={handleKeyPress}
            />
          )}

          {relationInput && (
            <AutoComplete
              options={relationTypes}
              value={answer}
              onSelect={handleSelect}
              onSearch={handleSearchRelation}
              placeholder="Ask me anything..."
              ref={inputRef}
              className="auto_complete"
              onKeyPress={handleKeyPress}
            />
          )}

          <img src={sendImg} alt="sendImg" onClick={sendMessage} />
        </div>


        <div className="chat-footer">
          <label className="fotter-title">Chat not your style? No problem, just click here for our regular form.</label>
          <label className="switch" onClick={switchGoForm}>Click Here</label>
        </div>

      </div>

    </div>
  )
}

export default Chat