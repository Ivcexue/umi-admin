import React, { useState } from 'react'
import { Layout, Card, Form, Input, Button, Row, Col, message } from 'antd'
import { UserOutlined, LockOutlined, RightOutlined } from '@ant-design/icons'

import { setToken } from '@/utils/auth'
import { login, getCodeImg } from '@/api/login'

import router from 'umi/router'
import styles from './index.scss'

const { Content } = Layout

let interval = null

export default function Login() {
  const [currentTab, setCurentTab] = useState(0)
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(60)
  const [userAccount, setUserAccount] = useState(null)

  const rules = {
    username: [{ required: true, message: '请输入手机号或邮箱!' }],
    password: [{ required: true, message: '请输入密码!' }],
    code: [{ required: true, message: '请输入验证码!' }]
  }

  const handleLogin = async values => {
    setLoading(true)
    let data = await login({
      ...values,
      clientType: 'pc',
      loginType: 'account'
    })

    if (data.status) {
      setToken(data.token)
      setLoading(false)

      message.success('登录成功')
      router.replace('/')
    } else {
      setLoading(false)
    }
  }

  const handleRegister = () => {
    router.push('/user/register')
  }

  const countDown = () => {
    if (interval) return
    interval = setInterval(async () => {
      await setCount(count => {
        if (count === 0) {
          clearInterval(interval)
          interval = null
        }
        return count - 1
      })
    }, 1000)
  }

  const sendCodeMessage = async () => {
    if (!userAccount) {
      message.warning('请输入手机号')
      return false
    }
    if (count < 60 && count > 0) return false

    let { status } = await getCodeImg({
      sendTo: userAccount,
      templateId: 19,
      type: 0
    })
    if (status) {
      countDown()
      message.success('发送成功')
    }
  }

  const loginInput = panel => {
    if (currentTab === 0 && !panel) {
      return (
        <Form.Item name="userPassword" rules={rules.password}>
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请输入密码" />
        </Form.Item>
      )
    } else {
      return (
        <Form.Item>
          <Row gutter={24}>
            <Col span={interval ? 14 : 16}>
              <Form.Item name="code" noStyle rules={rules.code}>
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="number" placeholder="请输入验证码" />
              </Form.Item>
            </Col>
            <Col span={1}>
              <Button className={styles.sendCodeBtn} onClick={sendCodeMessage}>
                {interval ? `${count}秒重新发送` : '发送验证码'}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      )
    }
  }

  return (
    <Content className={styles.content_warper}>
      <div className={styles.logo}></div>
      <Card className={styles.card}>
        <>
          <div className={styles.header_panel}>
            <span className={currentTab === 0 ? styles.curent : ''} onClick={() => setCurentTab(0)}>
              密码登录
            </span>
            <span className={currentTab === 1 ? styles.curent : ''} onClick={() => setCurentTab(1)}>
              验证码登录
            </span>
          </div>
          <Form className={styles.login_form} onFinish={handleLogin}>
            <Form.Item name="userAccount" rules={rules.username}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入手机号或邮箱" onChange={e => setUserAccount(e.target.value)} />
            </Form.Item>
            {loginInput()}
            <Form.Item>
              <Button type="primary" block htmlType="submit" loading={loading}>
                登录
              </Button>
            </Form.Item>
          </Form>
          <Button className={styles.register_btn} type="link">
            <span onClick={handleRegister}>还未注册账号，立即注册</span>
            <RightOutlined style={{ fontSize: '11px', marginTop: '3px' }} />
          </Button>
        </>
      </Card>
    </Content>
  )
}
