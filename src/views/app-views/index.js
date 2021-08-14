import React, {lazy, Suspense, useEffect} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import {APP_PREFIX_PATH} from 'configs/AppConfig'
import {useDispatch, useStore} from "react-redux";
import JwtAuthService from "../../services/JwtAuthService";
import {authenticated, setUserInfo} from "../../redux/actions/Auth";
import Socket from "../../socket/Socket";
import {setActiveUsers} from "../../redux/actions/UserActions";

const Preloader = () => {
  console.log("Preloader called")
  const dispatch = useDispatch()
  useEffect(() => {
    Socket.emitGetActiveUsers()
    JwtAuthService.getMe().then(res => {
      if (res.data.accessToken) {
        dispatch(authenticated(res.data.accessToken))
        dispatch(setUserInfo(res.data.user))
      } else {
        dispatch(authenticated(""))
        dispatch(setUserInfo({}))
      }
    })
  })

  return (
    <></>
  )
}

export const AppViews = () => {
  const dispatch = useDispatch()

  const dispatchUserAction = (userList) => {
    console.log("User list on listening: ", userList)
    dispatch(setActiveUsers(userList))
  }
  const dispatchChatAction = (chat)=>{

  }
  useEffect(() => {
    Socket.onUserOnline(dispatchUserAction)
    Socket.onUserOffline(dispatchUserAction)
    Socket.onGetActiveUsers(dispatchUserAction)
  })

  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Preloader/>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))}/>
        <Route path={`${APP_PREFIX_PATH}/users/me`} component={lazy(() => import(`./profile`))}/>
        <Route path={`${APP_PREFIX_PATH}/messages/:id`} component={lazy(() => import(`./chat`))}/>
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/home`}/>
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);
