import React, { Component } from 'react'
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Link } from 'umi'
import Redirect from 'umi/redirect'
import { Layout, Menu, Breadcrumb } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import AvatarDropdown from '@/components/Header/AvatarDropdown'
// import Breadcrumbs from '../components/Breadcrumbs'

import { getRoutes } from '@/api/admin'
import { getToken } from '@/utils/auth'
import styles from './index.scss';

const { Header, Content, Sider } = Layout
const { SubMenu } = Menu

class BasicLayout extends Component {
  state = {
    collapsed: false,
    menuData: []
  }

  getAuthRoutes = async () => {
    let { data, status } = await getRoutes()
    if (data) {
      if (status) {
        this.setState({
          menuData: data
        })
      }
    }
  }

  setCollapsedToggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  componentWillUnmount() {
    document.body.style.margin = "0px";
    // 这是防止页面被拖拽
    document.body.addEventListener('touchmove', (ev) => {
      ev.preventDefault();
    });
  }

  componentDidMount() {
    if (getToken()) {
      this.getAuthRoutes()
    }
  }

  render() {
    const { collapsed, menuData } = this.state
    const { children } = this.props

    return (
      getToken() ?
        <Layout className={styles.layout_warper}>
          <Sider collapsed={collapsed}>
            <div className={styles.logo}>
              <img src={require('@/assets/images/logo.png')} alt="LOGO" />
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="home">
                <Link to='/'>首页</Link>
              </Menu.Item>
              {
                menuData.map((item, index) => {
                  return (
                    <SubMenu key={index} title={item.meta.title}>
                      {
                        item.children.map((list) => {
                          return (
                            <Menu.Item key={list.component}><Link to={`/${list.component}`}>{list.meta.title}</Link></Menu.Item>
                          )
                        })
                      }
                    </SubMenu>
                  )
                })
              }
            </Menu>
          </Sider >
          <Layout className="site-layout">
            <Header className={styles.layout_header}>
              <div onClick={this.setCollapsedToggle}>
                {collapsed ? <MenuUnfoldOutlined className={styles.collapsed} /> : <MenuFoldOutlined className={styles.collapsed} />}
              </div>
              <AvatarDropdown />
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
              </Breadcrumb>
              {/* <Breadcrumbs /> */}
              {children}
              {/* <TransitionGroup>
                <CSSTransition key={location.pathname} timeout={500}>
                  {children}
                </CSSTransition>
              </TransitionGroup> */}
            </Content>
          </Layout>
        </Layout >
        : <Redirect to="/user/login" />
    )
  }

}


export default BasicLayout
