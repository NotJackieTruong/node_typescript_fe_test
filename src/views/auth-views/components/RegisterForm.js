import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input, Alert} from "antd";
import {showAuthMessage, showLoading, hideAuthMessage, authenticated, hideLoading} from 'redux/actions/Auth';
import {useHistory} from "react-router-dom";
import {motion} from "framer-motion"
import JwtAuthService from 'services/JwtAuthService'

const rules = {
  email: [
    {
      required: true,
      message: 'Please input your email address'
    },
    {
      type: 'email',
      message: 'Please enter a validate email!'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input your password'
    }
  ],
  firstName: [
    {
      required: true,
      message: 'Please input your first name'
    }
  ],
  lastName: [
    {
      required: true,
      message: 'Please input your last name'
    }
  ],
  confirm: [
    {
      required: true,
      message: 'Please confirm your password!'
    },
    ({getFieldValue}) => ({
      validator(rule, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject('Passwords do not match!');
      },
    })
  ]
}

export const RegisterForm = (props) => {

  const {
    showLoading,
    hideLoading,
    token,
    loading,
    redirect,
    message,
    showMessage,
    hideAuthMessage,
    authenticated,
    allowRedirect,
    showAuthMessage
  } = props
  const [form] = Form.useForm();
  let history = useHistory();

  const onSignUp = () => {
    form.validateFields().then(values => {
      console.log({values})
      let userInfo = {
        ...values,
        avatar: "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png"
      }
      showLoading()
      // const fakeToken = 'fakeToken'
      JwtAuthService.signUp(userInfo).then(res => {
        if (!res?.success) {
          showAuthMessage(res?.message ?? "Error")
        } else {
          // authenticated(res.data.token)
          window.location.href ='login'
        }
      })

    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  }

  useEffect(() => {
    if (token !== null && token !== "" && token !== undefined && allowRedirect) {
      history.push(redirect)
    }
    if (showMessage) {
      setTimeout(() => {
        hideAuthMessage();
      }, 3000);
    }
  });

  return (
    <>
      <motion.div
        initial={{opacity: 0, marginBottom: 0}}
        animate={{
          opacity: showMessage ? 1 : 0,
          marginBottom: showMessage ? 20 : 0
        }}>
        <Alert type="error" showIcon message={message}></Alert>
      </motion.div>
      <Form form={form} layout="vertical" name="register-form" onFinish={onSignUp}>
        <Form.Item
          name="firstName"
          label="First name"
          rules={rules.firstName}
          hasFeedback
        >
          <Input prefix={<UserOutlined className="text-primary"/>}/>
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last name"
          rules={rules.lastName}
          hasFeedback
        >
          <Input prefix={<UserOutlined className="text-primary"/>}/>
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={rules.email}
          hasFeedback
        >
          <Input prefix={<MailOutlined className="text-primary"/>}/>
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={rules.password}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined className="text-primary"/>}/>
        </Form.Item>
        <Form.Item
          name="confirm"
          label="ConfirmPassword"
          rules={rules.confirm}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined className="text-primary"/>}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

const mapStateToProps = ({auth}) => {
  const {loading, message, showMessage, token, redirect} = auth;
  return {loading, message, showMessage, token, redirect}
}

const mapDispatchToProps = {
  showAuthMessage,
  hideAuthMessage,
  showLoading,
  hideLoading,
  authenticated
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
