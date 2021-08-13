import React from "react";
import {Avatar, Grid, Layout} from 'antd';
import {connect, useSelector} from 'react-redux';
import {SIDE_NAV_WIDTH, SIDE_NAV_DARK, NAV_TYPE_SIDE} from 'constants/ThemeConstant';
import {Scrollbars} from 'react-custom-scrollbars';
import MenuContent from './MenuContent'
import utils from "../../utils";

const {Sider} = Layout;
const { useBreakpoint } = Grid;

export const SideNav = ({navCollapsed, sideNavTheme, routeInfo, hideGroupTitle, localization = true}) => {
  const props = {sideNavTheme, routeInfo, hideGroupTitle, localization}
  const screens = utils.getBreakPoint(useBreakpoint());
  const isMobile = !screens.includes('lg')
  return (
    <Sider
      className={`side-nav ${sideNavTheme === SIDE_NAV_DARK ? 'side-nav-dark' : ''}`}
      width={SIDE_NAV_WIDTH}
      collapsed={isMobile}
      style={{top: 0, height: '100%'}}
    >
      <Scrollbars autoHide>
        <MenuContent
          type={NAV_TYPE_SIDE}
          {...props}
        />
      </Scrollbars>
    </Sider>
  )
}

const mapStateToProps = ({theme}) => {
  const {navCollapsed, sideNavTheme} = theme;
  return {navCollapsed, sideNavTheme}
};

export default connect(mapStateToProps)(SideNav);
