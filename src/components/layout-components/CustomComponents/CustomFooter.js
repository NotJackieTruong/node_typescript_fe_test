import React, {useEffect, useRef, useState} from "react";
import {Button, Input} from "antd";
import {SendOutlined, CloseCircleOutlined, RetweetOutlined, FileOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import Socket from "../../../socket/Socket";
import {setCurrentRepliedMessage} from "../../../redux/actions/ChatActions";
import CONSTANTS from "../../../utils/constants";
import CurrentRepliedMessagePreview from "./CurrentRepliedMessagePreview";

const CustomFooter = () => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState("")
  const [chosenFiles, setChosenFiles] = useState([])
  const {currentChat, userInfo, currentRepliedMessage} = useSelector(state => {
    return {
      currentChat: state.chatReducer.currentChat,
      userInfo: state.auth.userInfo,
      currentRepliedMessage: state.chatReducer.currentRepliedMessage,
    }
  })
  const inputRef = useRef()
  const inputFileRef = useRef()

  useEffect(() => {
    console.log({current: inputRef.current})
    currentRepliedMessage && Object.keys(currentRepliedMessage).length > 0 && inputRef.current?.focus()
  }, [currentRepliedMessage])

  const onChange = (event) => {
    // setMessage()
    setMessage(event.target.value)
  }

  const onPressEnter = () => {
    if (message !== "") {
      let messageObj = {
        chat: currentChat._id,
        message: message,
        sender: userInfo._id,
        createdAt: new Date(Date.now()),
        repliesTo: currentRepliedMessage._id
      }
      console.log({messageObj})
      Socket.emitSendMessage(messageObj)
      setMessage("")
      dispatch(setCurrentRepliedMessage({}))
    }
  }

  const onOpenFilePicker = (event) => {
    inputFileRef.current?.click()

  }

  const onChooseFile = (event) => {
    let files = event.target.files
    console.log({files})


    for(let file in files){
      let reader = new FileReader()
      reader.onload = (event) => {
        console.log(event.target.result)
      }
      const fileData = files[file]
      fileData && typeof fileData === 'object' && reader.readAsArrayBuffer(fileData)
    }

  }

  return (
    <div className={'d-flex flex-row align-items-center'} style={{width: '100%'}}>
      <div className={'mr-3 ml-3 mb-3 flex-grow-1'} style={{
        backgroundColor: '#f5f5f5',
        borderRadius: 16,
      }}>
        <CurrentRepliedMessagePreview/>
        <input ref={inputFileRef} onChange={onChooseFile} type={'file'} multiple={true}
               style={{display: 'none', visibility: 'hidden',}}/>
        <Input
          ref={inputRef}
          bordered={false}
          size={"middle"}
          placeholder={"Type a message..."}
          suffix={<div className={'d-flex flex-row'}>
            <FileOutlined onClick={onOpenFilePicker} style={{fontSize: CONSTANTS.STYLES.ICON_SIZE}}/>
          </div>}

          style={{
            borderRadius: 50,
          }}
          onChange={onChange}
          value={message}
          onPressEnter={onPressEnter}
        />

      </div>
      <SendOutlined className={'align-self-end mb-3 mr-3'} style={{color: '#007aff', fontSize: 24}}
                    onClick={onPressEnter}/>
    </div>
  )
}

export default CustomFooter
