import React from 'react';
import {connect} from 'react-redux';
import SideNav from 'components/layout-components/SideNav';
import Loading from 'components/shared-components/Loading';
import MobileNav from 'components/layout-components/MobileNav'
import AppViews from 'views/app-views';
import {
  Layout,
  Grid,
} from "antd";

import navigationConfig from "configs/NavigationConfig";
import {
  SIDE_NAV_WIDTH,
  SIDE_NAV_COLLAPSED_WIDTH,
  NAV_TYPE_SIDE,
  NAV_TYPE_TOP,
  DIR_RTL,
  DIR_LTR, FOOTER_HEIGHT, HEADER_HEIGHT
} from 'constants/ThemeConstant';
import utils from 'utils';
import {useThemeSwitcher} from "react-css-theme-switcher";
import CustomHeader from "../../components/layout-components/CustomComponents/CustomHeader";
import CustomFooter from "../../components/layout-components/CustomComponents/CustomFooter";

const {Content, Header, Footer} = Layout;
const {useBreakpoint} = Grid;

export const AppLayout = ({navCollapsed, navType, location, direction}) => {
  const currentRouteInfo = utils.getRouteInfo(navigationConfig, location.pathname)
  const screens = utils.getBreakPoint(useBreakpoint());
  const isMobile = !screens.includes('lg')
  const isNavSide = navType === NAV_TYPE_SIDE
  const isNavTop = navType === NAV_TYPE_TOP
  const getLayoutGutter = () => {
    if (isNavTop || isMobile) {
      return SIDE_NAV_COLLAPSED_WIDTH
    }
    return navCollapsed ? SIDE_NAV_COLLAPSED_WIDTH : SIDE_NAV_WIDTH
  }

  const {status} = useThemeSwitcher();

  if (status === 'loading') {
    return <Loading cover="page"/>;
  }

  const getLayoutDirectionGutter = () => {
    if (direction === DIR_LTR) {
      return {paddingLeft: getLayoutGutter()}
    }
    if (direction === DIR_RTL) {
      return {paddingRight: getLayoutGutter()}
    }
    return {paddingLeft: getLayoutGutter()}
  }


  return (
    <Layout style={{height: "100%"}}>
      <SideNav routeInfo={currentRouteInfo}/>
      <Layout className="app-container"
              style={{height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column',...getLayoutDirectionGutter(), }}>
        <CustomHeader/>
        <div className="app-layout my-app-layout"
                style={{overflow: 'hidden', flexGrow: 1, height: '100%'}}>
          {/*<div className={`app-content ${isNavTop ? 'layout-top-nav' : ''}`} style={{marginTop: 0}}>*/}
          {/*  /!*<PageHeader display={currentRouteInfo?.breadcrumb} title={currentRouteInfo?.title}/>*!/*/}
          {/*  <Content>*/}
          {/*  </Content>*/}
          {/*</div>*/}
          <AppViews/>
        </div>
        {/*<Footer style={{backgroundColor: 'lightgreen', height: FOOTER_HEIGHT}}/>*/}
        <CustomFooter/>
      </Layout>
      {isMobile && <MobileNav/>}
    </Layout>
  )
}

const mapStateToProps = ({theme}) => {
  const {navCollapsed, navType, locale} = theme;
  return {navCollapsed, navType, locale}
};

export default connect(mapStateToProps)(React.memo(AppLayout));
