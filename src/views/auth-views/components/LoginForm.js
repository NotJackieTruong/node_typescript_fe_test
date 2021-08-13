import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {Button, Form, Input, Divider, Alert} from "antd";
import {MailOutlined, LockOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types';
import {GoogleSVG, FacebookSVG} from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon'
import {
  showLoading,
  showAuthMessage,
  hideAuthMessage,
  authenticated,
  setUserInfo
} from 'redux/actions/Auth';
import JwtAuthService from 'services/JwtAuthService'
import {useHistory} from "react-router-dom";
import {motion} from "framer-motion"
import Socket from "../../../socket/Socket";

export const LoginForm = (props) => {
  let history = useHistory();

  const {
    otherSignIn,
    showForgetPassword,
    hideAuthMessage,
    onForgetPasswordClick,
    showLoading,
    extra,
    loading,
    showMessage,
    message,
    authenticated,
    showAuthMessage,
    token,
    redirect,
    allowRedirect,
    setUserInfo
  } = props

  const onLogin = values => {
    showLoading()
    JwtAuthService.login(values).then(res => {
      if (!res?.success && !res.data.accessToken && res.data.user) {
        showAuthMessage(res?.message ?? "Error")
      } else {
        authenticated(res.data.accessToken)
        setUserInfo(res.data.user)
        Socket.emitUserOnline(res.data.user)
      }
    }).catch(e => {
      showAuthMessage(e)
    })
  };

  const onGoogleLogin = () => {
    showLoading()
  }

  const onFacebookLogin = () => {
    showLoading()
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

  const renderOtherSignIn = (
    <div>
      <Divider>
        <span className="text-muted font-size-base font-weight-normal">or connect with</span>
      </Divider>
      <div className="d-flex justify-content-center">
        <Button
          onClick={() => onGoogleLogin()}
          className="mr-2"
          disabled={loading}
          icon={<CustomIcon svg={GoogleSVG}/>}
        >
          Google
        </Button>
        <Button
          onClick={() => onFacebookLogin()}
          icon={<CustomIcon svg={FacebookSVG}/>}
          disabled={loading}
        >
          Facebook
        </Button>
      </div>
    </div>
  )

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
      <Form
        layout="vertical"
        name="login-form"
        onFinish={onLogin}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Please input your email',
            },
            {
              type: 'email',
              message: 'Please enter a validate email!'
            }
          ]}>
          <Input prefix={<MailOutlined className="text-primary"/>}/>
        </Form.Item>
        <Form.Item
          name="password"
          label={
            <div className={`${showForgetPassword ? 'd-flex justify-content-between w-100 align-items-center' : ''}`}>
              <span>Password</span>
              {
                showForgetPassword &&
                <span
                  onClick={() => onForgetPasswordClick}
                  className="cursor-pointer font-size-sm font-weight-normal text-muted"
                >
									Forget Password?
								</span>
              }
            </div>
          }
          rules={[
            {
              required: true,
              message: 'Please input your password',
            }
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary"/>}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign In
          </Button>
        </Form.Item>
        {
          otherSignIn ? renderOtherSignIn : null
        }
        {extra}
      </Form>
    </>
  )
}

LoginForm.propTypes = {
  otherSignIn: PropTypes.bool,
  showForgetPassword: PropTypes.bool,
  extra: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
};

LoginForm.defaultProps = {
  otherSignIn: true,
  showForgetPassword: false
};

const mapStateToProps = ({auth}) => {
  const {loading, message, showMessage, token, redirect} = auth;
  return {loading, message, showMessage, token, redirect}
}

const mapDispatchToProps = {
  showAuthMessage,
  showLoading,
  hideAuthMessage,
  authenticated,
  setUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
