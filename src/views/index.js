import React, {Suspense} from "react";
import {Route, Switch, Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import AppLayout from "layouts/app-layout";
import AuthLayout from 'layouts/auth-layout';
import AppLocale from "lang";
import {IntlProvider} from "react-intl";
import {ConfigProvider} from 'antd';
import {APP_PREFIX_PATH, AUTH_PREFIX_PATH} from 'configs/AppConfig'
import useBodyClass from 'hooks/useBodyClass';
import ProtectedRoute from "./components/ProtectedRoute";
import {AUTH_TOKEN} from "../redux/constants/Auth";

export const Views = (props) => {
  const {locale, location, direction} = props;
  const currentAppLocale = AppLocale[locale];
  useBodyClass(`dir-${direction}`);

  let accessToken = sessionStorage.getItem(AUTH_TOKEN)
  let isAuthenticated = accessToken !== "" && accessToken !== null && accessToken !== undefined

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}>
      <ConfigProvider locale={currentAppLocale.antd} direction={direction}>
        <Suspense fallback={<h1>Loading...</h1>}>
          {/*<SocketListener/>*/}
          <Switch>
            <Route exact path="/">
              <Redirect to={APP_PREFIX_PATH}/>
            </Route>
            <Route path={AUTH_PREFIX_PATH}>
              <AuthLayout direction={direction}/>
            </Route>
            <ProtectedRoute path={APP_PREFIX_PATH} isAuthenticated={isAuthenticated}>
              <AppLayout direction={direction} location={location}/>
            </ProtectedRoute>
          </Switch>
        </Suspense>

      </ConfigProvider>
    </IntlProvider>
  )
}

const mapStateToProps = ({theme, auth}) => {
  const {locale, direction} = theme;
  const {token} = auth;
  return {locale, token, direction}
};

export default withRouter(connect(mapStateToProps)(Views));
