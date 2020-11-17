import React, { useState } from 'react'
import { Layout, Card, Form, Input, Button, Row, Col } from 'antd'
import { UserOutlined, LockOutlined, RightOutlined } from '@ant-design/icons'

import router from 'umi/router'
import styles from './index.scss'

const { Content } = Layout

let interval = null

export default function Register() {
  const [loading] = useState(false)
  const [count, setCount] = useState(3)

  const rules = {
    username: [{ required: true, message: '请输入手机号或邮箱!' }],
    password: [{ required: true, message: '请输入密码!' }],
    aginPassword: [{ required: true, message: '请再次输入密码!' }],
    code: [{ required: true, message: '请输入验证码!' }]
  }

  const handleLogin = async values => {
    console.log(values)
  }

  const goToLogin = () => {
    router.push('/user/login')
  }

  const sendCodeMessage = () => {
    if (interval) return
    interval = setInterval(() => {
      setCount(count => count - 1)
    }, 1000)

    console.log(count, 'count')
    if (count === 0) {
      console.log(interval)
      clearInterval(interval)
      interval = null
    }
  }

  return (
    <Content className={styles.content_warper}>
      <div className={styles.logo}></div>
      <Card className={styles.card}>
        <h3>注册</h3>
        <Form className={styles.login_form} onFinish={handleLogin}>
          <Form.Item name="userAccount" rules={rules.username}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入手机号或邮箱" />
          </Form.Item>
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
          <Form.Item name="userPassword" rules={rules.password}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item name="aginPassword" rules={rules.aginPassword}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请再次输入密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" block htmlType="submit" loading={loading}>
              注册
            </Button>
          </Form.Item>
        </Form>
        <Button className={styles.register_btn} type="link">
          <span onClick={goToLogin}> 我已注册账号，前往登录 </span>
          <RightOutlined style={{ fontSize: '11px', marginTop: '3px' }} />
        </Button>
      </Card>
    </Content>
  )
}
