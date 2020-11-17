import React from 'react'
import { Layout } from 'antd'
import styles from './index.scss'

const { Content } = Layout

export default function Login({ children }) {
  return (
    <Content className={styles.content_warper}>
      <div className={styles.logo}></div>
      {children}
    </Content>
  )
}
