import React, { useState } from 'react'
import { Layout, Card, Form, Input, Button, Row, Col, message } from 'antd'
import { UserOutlined, LockOutlined, RightOutlined } from '@ant-design/icons'
import CountDown from '@/hooks/useCountDown'
import { getCodeImg, register } from '@/api/login'

import router from 'umi/router'
import styles from './index.scss'

const { Content } = Layout

export default function Register() {
  const [loading] = useState(false)
  const [userAccount, setUserAccount] = useState('')

  const rules = {
    username: [{ required: true, message: '请输入手机号或邮箱!' }],
    password: [{ required: true, message: '请输入密码!' }],
    aginPassword: [{ required: true, message: '请再次输入密码!' }],
    code: [{ required: true, message: '请输入验证码!' }]
  }

  const handleRegister = async values => {
    let { status } = await register(values)
    if (status) {
      goToLogin()
      message.success('注册成功')
    }
  }

  const goToLogin = () => {
    router.push('/user/login')
  }

  const sendCodeMessage = async () => {
    if (!userAccount) {
      message.warning('请输入手机号')
      return false
    }

    let { status } = await getCodeImg({
      sendTo: userAccount,
      templateId: 19,
      type: 0
    })
    if (status) {
      message.success('发送成功')
      return 'success'
    }
  }

  return (
    <Content className={styles.content_warper}>
      <div className={styles.logo}></div>
      <Card className={styles.card}>
        <h3>注册</h3>
        <Form className={styles.login_form} onFinish={handleRegister}>
          <Form.Item name="userAccount" rules={rules.username}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入手机号或邮箱"
              onChange={e => setUserAccount(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Row gutter={24}>
              <Col>
                <Form.Item name="code" noStyle rules={rules.code}>
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="number"
                    placeholder="请输入验证码"
                  />
                </Form.Item>
              </Col>
              <Col span={1}>
                <CountDown sendCodeMessage={sendCodeMessage} />
                {/* <Button className={styles.sendCodeBtn} onClick={sendCodeMessage}>
                  21
                </Button> */}
              </Col>
            </Row>
          </Form.Item>
          <Form.Item name="userPassword" rules={rules.password}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item name="aginPassword" rules={rules.aginPassword}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请再次输入密码"
            />
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
