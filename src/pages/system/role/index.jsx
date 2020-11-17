import React, { Component, createRef } from 'react'
import { Space, Layout, Button, Modal, message, DatePicker, ConfigProvider, Input } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import { ExclamationCircleOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons'
import Editrole from './Editrole'
import ITable from '@/components/Base/ITable'
import Rolepermissions from './Rolepermissions'
import { delRole, getMenuProMissIons, changeRoleState } from '@/api/role'
import { ROLE_LIST_API } from '@/api/table/role'

import styles from './index.scss'

const { Content } = Layout
const { confirm } = Modal
const { RangePicker } = DatePicker

const itableRef = createRef()
export default class RoleManag extends Component {
  state = {
    type: 'edit',
    visible: false,
    record: {},
    roleName: '',
    date: [],
    menuObj: {},
    drawerVisible: false
  }

  handleEdit(record) {
    this.setState({
      visible: true,
      record,
      type: 'edit'
    })
  }

  handleDeleteRole(record) {
    confirm({
      title: `是否确认删除角色 ${record.roleName}?`,
      icon: <ExclamationCircleOutlined />,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        let { status } = await delRole(record.roleId)
        if (status) {
          message.success('删除成功')
          itableRef.current.refreshTableData()
        }
      }
    })
  }

  stopService = ({ roleName, roleId, status }) => {
    confirm({
      title: `是否确认${status === 0 ? '停用' : '启用'}角色 ${roleName}?`,
      icon: <ExclamationCircleOutlined />,
      okText: '确定',
      cancelText: '取消',
      async onOk() {
        let data = await changeRoleState({ roleId, status: status === 0 ? -1 : 0 })
        if (data.status) {
          message.success(`${status === 0 ? '停用' : '启用'}角色 ${roleName}成功`)
          itableRef.current.refreshTableData()
        }
      }
    })
  }

  setVisible = (visible, type) => {
    this.setState({
      visible: visible,
      type
    })
  }

  resetTableData = () => {
    itableRef.current.refreshTableData()
  }

  handleSelectDate = (value, date) => {
    this.setState({ date })
  }

  handleSearchRoleName = () => {
    const { roleName } = this.state
    itableRef.current.refreshTableData({ roleName })
  }

  handleChangeIpt = event => {
    this.setState({
      roleName: event.target.value
    })
  }

  handleSerchRole = () => {
    const { date, roleName } = this.state
    itableRef.current.refreshTableData({
      beginTime: date[0],
      endTime: date[1],
      roleName
    })
  }

  handleRest = () => {
    this.setState({ roleName: '', date: [] })
    itableRef.current.refreshTableData()
  }

  hanleRoleProMissions = async record => {
    let { status, data } = await getMenuProMissIons(record.roleId)

    if (status && data.menus.length > 0) {
      this.setState({
        drawerVisible: true,
        menuObj: data
      })
    }
  }

  setDraVisible = state => {
    this.setState({
      drawerVisible: state
    })
  }

  render() {
    const tableData = {
      url: ROLE_LIST_API,
      method: 'get',
      scroll: { y: 540 },
      columns: [
        {
          title: '角色名称',
          dataIndex: 'roleName',
          align: 'center'
        },
        {
          title: '角色ID',
          dataIndex: 'roleId',
          align: 'center'
        },
        {
          title: '角色描述',
          dataIndex: 'remark',
          align: 'center'
        },
        {
          title: '操作',
          align: 'center',
          render: record => {
            let isSuperAdmin = record.roleId === '20200929092157187777777'
            return (
              <Space size="middle">
                <Button
                  className={styles.control_btn}
                  disabled={isSuperAdmin}
                  onClick={this.handleEdit.bind(this, record)}
                >
                  编辑
                </Button>
                <Button
                  className={styles.control_btn}
                  disabled={isSuperAdmin}
                  onClick={() => this.hanleRoleProMissions(record)}
                >
                  角色权限
                </Button>
                <Button
                  className={styles.control_btn}
                  disabled={isSuperAdmin}
                  onClick={() => this.stopService(record)}
                >
                  {record.status === -1 ? '启用' : '停用'}
                </Button>
                <Button
                  className={styles.control_btn}
                  disabled={isSuperAdmin}
                  onClick={() => this.handleDeleteRole(record)}
                >
                  删除
                </Button>
              </Space>
            )
          }
        }
      ]
    }

    const { visible, record, type, roleName, drawerVisible, menuObj } = this.state
    return (
      <>
        <Content className={styles.header_content}>
          <div className={styles.search_warper}>
            <span>创建日期</span>
            <ConfigProvider locale={zh_CN}>
              <RangePicker onChange={this.handleSelectDate} />
            </ConfigProvider>
          </div>
          <Input
            addonAfter={<SearchOutlined className="pointer" onClick={this.handleSearchRoleName} />}
            placeholder="请输入搜索内容"
            className={styles.search_ipt}
            onChange={this.handleChangeIpt}
            value={roleName}
          />
          <Space className={styles.space_warper}>
            <Button type="primary" icon={<SearchOutlined />} onClick={this.handleSerchRole}>
              查询
            </Button>
            <Button icon={<ReloadOutlined />} onClick={this.handleRest}>
              重置
            </Button>
          </Space>
          <div className={styles.header_warper}>
            <Button className={styles.addbtn} onClick={() => this.setVisible(true, 'add')}>
              新增角色
            </Button>
          </div>
        </Content>
        <Content className="layout-content">
          <ITable tableData={tableData} ref={itableRef} />
          {/* 修改添加角色 */}
          <Editrole
            visible={visible}
            setVisible={visib => this.setVisible(visib)}
            resetTableData={this.resetTableData}
            record={record}
            type={type}
          />
          {/* 角色权限 */}
          <Rolepermissions
            drawerVisible={drawerVisible}
            menu={menuObj}
            setDraVisible={() => this.setDraVisible(false)}
          />
        </Content>
      </>
    )
  }
}
