import {
  DashboardOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'
import {Avatar} from "antd";
import Socket from "../socket/Socket";

const activeUserList = Socket.userList.map((user, index)=>{
  return{
    key: user._id,
    path: `${APP_PREFIX_PATH}/messages/${user._id}`,
    title: user.fullName,
    avatar: user.avatar,
    breadcrumb: false,
  }
})

const dashBoardNavTree = [{
  key: 'home',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'home',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
}]

const navigationConfig = [
  ...dashBoardNavTree,
]

export default navigationConfig;
