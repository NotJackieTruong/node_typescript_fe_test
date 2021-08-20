import React, {useEffect, useState} from "react";
import {PageHeader, Input, Form, Button, Checkbox, notification, Image} from "antd";
import CONSTANTS from "../../../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import ApiService from "../../../services/ApiService";
import {setUserInfo} from "../../../redux/actions/Auth";
import './index.css'
import ImgCrop from 'antd-img-crop';

const Profile = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState({})
  const [mode, setMode] = useState("view")
  const [image, setImage] = useState("")
  const userInfo = useSelector(state => {
    return state.auth.userInfo
  })

  useEffect(() => {
    console.log({userInfo})
  }, [userInfo])

  const onEdit = () => {
    setMode("edit")
  }

  const onCancel = () => {
    setMode("view")
  }

  const onFinish = (values) => {
    console.log('Success:', values);
    ApiService.updateUser({...values, fullName: values.firstName + " " + values.lastName}, userInfo._id).then(res => {
      if(res?.success){
        dispatch(setUserInfo(res.data.user))
        notification.success({
          message: res.message,
        })
      } else {
        notification.error({
          message: res?.message??"Error while updating",
        })
      }
      setMode("view")


    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onChange = (event)=>{
    let files = event.target.files
    let reader = new FileReader()
    reader.onload = (e)=>{
      console.log({readerEvent: e.target.result})
      setImage(e.target.result)
    }
    reader.readAsDataURL(files[0])
    console.log({files, reader})

  }

  return (
    <div style={{
      backgroundColor: '#fff',
      padding: CONSTANTS.STYLES.SPACING,
      borderRadius: CONSTANTS.STYLES.BORDER_RADIUS,
      marginRight: CONSTANTS.STYLES.SPACING,
      marginLeft: CONSTANTS.STYLES.SPACING,
      marginBottom: CONSTANTS.STYLES.SPACING
    }}>
      <PageHeader
        title={"My Profile"}
      />
      {image && <Image width={200} src={image}/>}
      <ImgCrop rotate >
        <Input type={'file'} onChange={onChange}/>

      </ImgCrop>
      <Form
        name="basic"
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        initialValues={{remember: true}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        colon={false}
        preserve={false}
        requiredMark={false}
        scrollToFirstError={true}
      >
        <Form.Item
          label="First name"
          name="firstName"
          rules={[{required: true, message: 'Please input your first name!'}]}
          initialValue={userInfo.firstName}
        >
          <Input disabled={mode==="view"} />
        </Form.Item>

        <Form.Item
          label="Last name"
          name="lastName"
          rules={[{required: true, message: 'Please input your last name!'}]}
          initialValue={userInfo.lastName}
        >
          <Input disabled={mode==="view"}/>
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{required: true, message: 'Please input your email!'}]}
          initialValue={userInfo.email}
        >
          <Input disabled={mode==="view"}/>
        </Form.Item>

        <Form.Item wrapperCol={{offset: 8, span: 16}}>
          {mode === "view" ? (
            <Button type="primary" onClick={onEdit}>
              Edit
            </Button>
          ) : (
            <>
              <Button htmlType="button" style={{margin: '0 8px'}} onClick={onCancel} type={'danger'}>
                Cancel
              </Button>
              <Button htmlType="submit" type="primary">
                Save
              </Button>

            </>
          )}

        </Form.Item>
      </Form>
    </div>
  )
}

export default Profile
