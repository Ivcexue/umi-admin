import React, { useEffect, useRef } from 'react'
import { Modal, Form, Input, InputNumber, Button, message, Space } from 'antd'
import { updateRole, addRole } from '@/api/role'
import styles from './index.scss'

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 }
}

const validateMessages = {
  /*eslint no-template-curly-in-string: "off"*/
  required: '${label}不能为空'
}

const Editrole = props => {
  const { visible, setVisible, record, resetTableData, type } = props
  const form = useRef(null)

  useEffect(() => {
    if (form.current) {
      form.current.setFieldsValue(record)
    }
  }, [record])

  const onFinish = async values => {
    if (values) {
      type === 'edit' ? handleEditRole(values) : handleAddRole(values)
    }
  }

  const handleEditRole = async values => {
    let params = {
      ...values,
      roleId: record.roleId,
      companyId: record.companyId,
      dataScope: record.dataScope,
      roleType: record.roleType,
      status: record.status,
      params: {},
      createTime: record.createTime
    }

    let { status } = await updateRole(params)
    if (status) {
      message.success('修改成功')
      setVisible(false)
      resetTableData()
    }
  }

  const handleAddRole = async values => {
    let params = {
      ...values,
      status: record.status,
      dataScope: record.dataScope
    }
    let { status } = await addRole(params)
    if (status) {
      message.success('角色添加成功')
      setVisible(false)
      resetTableData()
    }
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const resetForm = () => {
    form.current.setFieldsValue({
      roleName: '',
      roleKey: '',
      roleSort: '',
      remark: null
    })
  }

  return (
    <>
      <Modal
        title="修改角色"
        visible={visible}
        maskClosable={false}
        footer={null}
        afterClose={resetForm}
      >
        <Form
          ref={form}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item name="roleName" label="角色名称" rules={[{ required: true }]}>
            <Input placeholder="请输入角色名称" value={record.roleName} />
          </Form.Item>
          <Form.Item name="roleKey" label="权限字符" rules={[{ required: true }]}>
            <Input placeholder="请输入权限字符" value={record.roleKey} />
          </Form.Item>
          <Form.Item name="roleSort" label="角色顺序" rules={[{ required: true, type: 'number' }]}>
            <InputNumber value={record.roleSort} />
          </Form.Item>
          <Form.Item name="remark" label="职责描述">
            <Input.TextArea placeholder="请输入内容" value={record.remark} />
          </Form.Item>
          <Form.Item className={styles.footer_btn}>
            <Space>
              <Button onClick={handleCancel}>取消</Button>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Editrole
