import React from "react";
import {Link} from "react-router-dom";
import {Menu, Grid, Avatar} from "antd";
import IntlMessage from "../util-components/IntlMessage";
import Icon from "../util-components/Icon";
import navigationConfig from "configs/NavigationConfig";
import {connect, useSelector} from "react-redux";
import {SIDE_NAV_LIGHT, NAV_TYPE_SIDE} from "constants/ThemeConstant";
import utils from 'utils'
import {onMobileNavToggle} from "redux/actions/Theme";
import {APP_PREFIX_PATH} from "../../configs/AppConfig";

const {SubMenu} = Menu;
const {useBreakpoint} = Grid;

const setLocale = (isLocaleOn, localeKey) =>
  isLocaleOn ? <IntlMessage id={localeKey}/> : localeKey.toString();

const setDefaultOpen = (key) => {
  let keyList = [];
  let keyString = "";
  if (key) {
    const arr = key.split("-");
    for (let index = 0; index < arr.length; index++) {
      const elm = arr[index];
      index === 0 ? (keyString = elm) : (keyString = `${keyString}-${elm}`);
      keyList.push(keyString);
    }
  }
  return keyList;
};

const SideNavContent = (props) => {
  const {sideNavTheme, routeInfo, hideGroupTitle, localization, onMobileNavToggle} = props;
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg')
  const closeMobileNav = () => {
    if (isMobile) {
      onMobileNavToggle(false)
    }
  }
  const activeUsers = useSelector(state => {
    return state.userReducer.activeUsers
  })
  return (
    <Menu
      theme={sideNavTheme === SIDE_NAV_LIGHT ? "light" : "dark"}
      mode="inline"
      style={{height: "100%", borderRight: 0}}
      defaultSelectedKeys={[routeInfo?.key]}
      defaultOpenKeys={setDefaultOpen(routeInfo?.key)}
      className={hideGroupTitle ? "hide-group-title" : ""}
    >
      {activeUsers.map(user => {
        return {
          key: user._id,
          path: `${APP_PREFIX_PATH}/messages/${user._id}`,
          title: user.fullName,
          avatar: user.avatar,
          breadcrumb: false,
        }
      }).map((menu) =>
        <Menu.Item key={menu.key} style={{
          height: 'fit-content',
          paddingLeft: '20%',
        }}>
          {menu.icon ? <Icon type={menu?.icon}/> :
            <Avatar src={menu?.avatar} size={56} style={{marginRight:8}}/>}
          <span>{menu?.title}</span>
          {menu.path ? <Link onClick={() => closeMobileNav()} to={menu.path}/> : null}
        </Menu.Item>
      )}
    </Menu>
  );
};

const TopNavContent = (props) => {
  const {topNavColor, localization} = props;
  return (
    <Menu mode="horizontal" style={{backgroundColor: topNavColor}}>
      {navigationConfig.map((menu) =>
        menu.submenu.length > 0 ? (
          <SubMenu
            key={menu.key}
            popupClassName="top-nav-menu"
            title={
              <span>
        {menu.icon ? <Icon type={menu?.icon}/> : null}
                <span>{setLocale(localization, menu.title)}</span>
          </span>
            }
          >
            {menu.submenu.map((subMenuFirst) =>
                subMenuFirst.submenu.length > 0 ? (
                  <SubMenu
                    key={subMenuFirst.key}
                    icon={
                      subMenuFirst.icon ? (
                        <Icon type={subMenuFirst?.icon}/>
                      ) : null
                    }
                    title={setLocale(localization, subMenuFirst.title)}
                  >
                    {subMenuFirst.submenu.map((subMenuSecond) => (
                      <Menu.Item key={subMenuSecond.key}>
          <span>
        {setLocale(localization, subMenuSecond.title)}
          </span>
                        <Link to={subMenuSecond.path}/>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                ) : (
                  <Menu.Item key={subMenuFirst.key}>
                    {subMenuFirst.icon ? (
                      <Icon type={subMenuFirst?.icon}/>
                    ) : null}
                    <span>{setLocale(localization, subMenuFirst.title)}</span>
                    <Link to={subMenuFirst.path}/>
                  </Menu.Item>
                )
            )}
          </SubMenu>
        ) : (
          <Menu.Item key={menu.key}>
            {menu.icon ? <Icon type={menu?.icon}/> : null}
            <span>{setLocale(localization, menu?.title)}</span>
            {menu.path ? <Link to={menu.path}/> : null}
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

const MenuContent = (props) => {
  return props.type === NAV_TYPE_SIDE ? (
    <SideNavContent {...props} />
  ) : (
    <TopNavContent {...props} />
  );
};

const mapStateToProps = ({theme}) => {
  const {sideNavTheme, topNavColor} = theme;
  return {sideNavTheme, topNavColor};
};

export default connect(mapStateToProps, {onMobileNavToggle})(MenuContent);
