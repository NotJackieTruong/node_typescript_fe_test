import React, {useEffect, useState} from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import {Menu, Grid, Avatar} from "antd";
import IntlMessage from "../util-components/IntlMessage";
import Icon from "../util-components/Icon";
import navigationConfig from "configs/NavigationConfig";
import {connect, useDispatch, useSelector} from "react-redux";
import {SIDE_NAV_LIGHT, NAV_TYPE_SIDE} from "constants/ThemeConstant";
import utils from 'utils'
import {onMobileNavToggle} from "redux/actions/Theme";
import {APP_PREFIX_PATH} from "../../configs/AppConfig";
import {UserOutlined} from "@ant-design/icons";
import {setChatNavigationConfig, setCurrentChat} from "../../redux/actions/ChatActions";
import Utils from "utils";
import CustomMenuItem from "./CustomComponents/CustomMenuItem";
import {env} from "../../configs/EnvironmentConfig";

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
  const {sideNavTheme, hideGroupTitle, localization, onMobileNavToggle} = props;
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg')
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const key = Utils.getRouteMongooseId(location.pathname)

  const {activeUsers, chats} = useSelector(state => {
    return {
      activeUsers: state.userReducer.activeUsers,
      chats: state.chatReducer.chats,
    }
  })
  const [navigationConfig, setNavigationConfig] = useState([])
  const [routeInfo, setRouteInfo] = useState(null)

  useEffect(() => {
    // if(chats.length<=0){
    //   history.push(`${APP_PREFIX_PATH}/home`)
    //   console.log({history})
    // }
    let currentChat = chats.find(item => item._id === key)
    let config = chats.map(chat => {
      return {
        key: chat._id,
        path: `${APP_PREFIX_PATH}/messages/${chat._id}`,
        title: chat.name,
        avatar: chat.avatar || env.API_ENDPOINT_URL + '/' + chat.members[1].avatar.url,
        breadcrumb: false,
      }
    })
    setNavigationConfig(config)
    setRouteInfo(Utils.getRouteInfo(config, location.pathname))
    Utils.checkObject(currentChat) && dispatch(setCurrentChat(currentChat))
  }, [chats])

  const onClick = ({item, key, keyPath, selectedKeys, domEvent}) => {
    // console.log({item, key, keyPath, selectedKeys, domEvent})
    let currentChat = chats.find(item => item._id === key)
    dispatch(setCurrentChat(currentChat))
  }

  const closeMobileNav = () => {
    if (isMobile) {
      onMobileNavToggle(false)
    }
  }

  return (
    <Menu
      theme={sideNavTheme === SIDE_NAV_LIGHT ? "light" : "dark"}
      mode="inline"
      style={{height: "100%", borderRight: 0}}
      defaultSelectedKeys={[key]}
      defaultOpenKeys={setDefaultOpen(key)}
      className={hideGroupTitle ? "hide-group-title" : ""}
      onClick={onClick}
    >
      {navigationConfig.map((menu) =>
          <Menu.Item key={menu.key} style={{
            height: 'fit-content',
            paddingLeft: '20%',
          }}>
            {menu.avatar ? <Avatar src={menu?.avatar} size={56} style={{marginRight: 8}}/> :
              <Avatar icon={<UserOutlined/>} size={56} style={{marginRight: 8}}/>
            }
            <span>{menu?.title}</span>
            {menu.path ? <Link onClick={() => closeMobileNav()} to={menu.path}/> : null}
          </Menu.Item>
        // <CustomMenuItem
        //   key={menu.key}
        //   avatar={menu.avatar}
        //   title={menu.title}
        //   path={menu.path}
        //   closeMobileNav={()=>{
        //     closeMobileNav()
        //   }}
        // />
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
