import React from 'react'
import { Button, Popconfirm } from 'antd'

function ButtonConfirm(props) {
  const { onClick, text = '删除', title = '确认删除吗?', disabled } = props

  const style = { width: 200 }

  const attr = {
    title,
    style,
    disabled,
    onConfirm: onClick,
    okText: '确定',
    cancelText: '取消'
  }

  return (
    <Popconfirm {...attr}>
      <Button
        {...props}
        onClick={e => e.preventDefault()}
      >
        {text}
      </Button>
    </Popconfirm>
  )
}

ButtonConfirm.propTypes = {}

export default ButtonConfirm
