import React from 'react'
import { Button, Popconfirm } from 'antd'

function ButtonConfirm(props) {
  const { onClick, text = '删除', title = '确认删除吗?' } = props

  // if (type !== 'del') return <Button {...props}></Button>

  const style = { width: 200 }

  const attr = {
    title,
    style,
    onConfirm: onClick
  }

  return (
    <Popconfirm {...attr}>
      <Button type="danger" {...props} onClick={e => e.preventDefault()}>
        {text}
      </Button>
    </Popconfirm>
  )
}

ButtonConfirm.propTypes = {}

export default ButtonConfirm

// /components/index.js
export { default as ButtonConfirm } from './BtnConfirm.js'
