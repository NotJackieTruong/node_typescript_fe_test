import React from "react";
import {Avatar, Layout} from 'antd';
import {connect, useSelector} from 'react-redux';
import {SIDE_NAV_WIDTH, SIDE_NAV_DARK, NAV_TYPE_SIDE} from 'constants/ThemeConstant';
import {Scrollbars} from 'react-custom-scrollbars';
import MenuContent from './MenuContent'
import CustomCarousel from "./CustomComponents/CustomCarousel";

const {Sider} = Layout;

export const SideNav = ({navCollapsed, sideNavTheme, routeInfo, hideGroupTitle, localization = true}) => {
  const props = {sideNavTheme, routeInfo, hideGroupTitle, localization}
  const activeUsers = useSelector(state => {
    return state.userReducer.activeUsers
  })
  return (
    <Sider
      className={`side-nav ${sideNavTheme === SIDE_NAV_DARK ? 'side-nav-dark' : ''}`}
      width={SIDE_NAV_WIDTH}
      collapsed={navCollapsed}
    >
      <CustomCarousel>
        {activeUsers.map(user => (
          <>
            <Avatar src={user.avatar}/>
            <span>{user.fullName}</span>
          </>
        ))}
      </CustomCarousel>
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
