import React, { memo } from 'react'
import { Modal } from 'antd'

function CommonModal(props) {
  const {
    visible, 
    onOk,
    children,
    footer=false,
    width='',
    title,
    bodyStyle
  } = props


  const attr = {
    visible,
    width,
    title,
    bodyStyle,
    footer,
    destroyOnClose: true,
    cancelText: '取消',
    okText: '确认',
    onCancel: () => onOk(false),
    onOK: () => onOk(true)
  }


  return (
    <Modal {...attr}>
      {children}
    </Modal>
  )
}

export default memo(CommonModal)