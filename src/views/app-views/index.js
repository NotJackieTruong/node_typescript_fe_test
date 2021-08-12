import React, {lazy, Suspense, useEffect} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import {APP_PREFIX_PATH} from 'configs/AppConfig'
import {useDispatch} from "react-redux";
import JwtAuthService from "../../services/JwtAuthService";
import {authenticated, setUserInfo} from "../../redux/actions/Auth";
import Cookies from "js-cookie";

const Preloader = () => {
  const dispatch = useDispatch()
  JwtAuthService.getMe().then(res=>{
    console.log({res: res, cookie: document.cookie})
    if (res.data.accessToken) {
      dispatch(authenticated(res.data.accessToken))
      dispatch(setUserInfo(res.data.user))
    } else {
      dispatch(authenticated(""))
      dispatch(setUserInfo({}))
    }
  })

  return (
    <></>
  )
}

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Preloader/>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))}/>
        <Route path={`${APP_PREFIX_PATH}/users/me`} component={lazy(() => import(`./profile`))}/>
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/home`}/>
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);
