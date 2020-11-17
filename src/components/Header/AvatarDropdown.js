import React, { Component } from 'react'
import { Menu, Dropdown, Modal } from 'antd'
import { UserOutlined, SettingOutlined, LogoutOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import router from 'umi/router'
import { removeToken } from '@/utils/auth'
import styles from './index.scss'

const { confirm } = Modal


class AvatarDropdown extends Component {
  handleMenuClick = (event) => {
    const { key } = event
    if (key === 'logout') {
      this.showConfirm()
      return;
    }
  }

  showConfirm = () => {
    confirm({
      title: '提示',
      okText: '确定',
      cancelText: '取消',
      content: '确定注销并退出系统吗？',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        router.replace('/user/login')
        removeToken()
      }
    });
  }

  render() {
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.handleMenuClick}>
        <Menu.Item key="center">
          <UserOutlined />
            个人中心
          </Menu.Item>
        <Menu.Item key="settings">
          <SettingOutlined />
            个人设置
        </Menu.Item>
        <div className={styles.line}></div>
        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menuHeaderDropdown}>
        <div className={styles.dropdown} onClick={e => e.preventDefault()}>
          <div className={styles.avatar}>
            <img src={require('@/assets/images/avatar.png')} alt="avatar" />
          </div>
          <div>Joker</div>
        </div>
      </Dropdown>
    )
  }
}

export default AvatarDropdown
