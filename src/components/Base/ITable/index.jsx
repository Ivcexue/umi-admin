import React, { Component } from 'react'
import { Table, Layout } from 'antd'
import request from '@/utils/request'

const { Content } = Layout

export default class Itable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 1,
      pageSize: 10,
      loading: true,
      paginationState: true,
      position: ['bottomCenter', 'bottomCenter'],
      columns: [],
      dataSource: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: 100
      },
      pageNum: 0,
      ...props
    }
  }

  getTableDataSourse = async params => {
    this.setState({ loading: true })
    let { tableData } = this.state
    let { url, method } = tableData

    let { data, status } = await request({
      method,
      body: params
    })(url)

    let isRoleApi = url === '/api/guodun-userauth/role/page'
    if (status && data.list.length > 0) {
      this.setState({
        loading: false,
        dataSource: isRoleApi ? this.mapRoleData(data.list) : data.list,
        pagination: {
          total: data.total
        }
      })
    } else {
      this.setState({ loading: false })
    }
  }

  // 角色管理数据重组
  mapRoleData = data => {
    let sortData = data.find(item => item.roleId === '20200929092157187777777')
    let curenIndex = [].indexOf.call(data, sortData)

    if (curenIndex > -1) {
      data.splice(curenIndex, 1)
      data.unshift(sortData)
    }

    return data
  }

  setDefaultTabls = () => {
    let { tableData } = this.state
    this.setState({ columns: tableData.columns })
  }

  // 重置/刷新表格数据
  refreshTableData = params => {
    const { pageNum } = this.state
    this.getTableDataSourse({ pageNum, ...params })
  }

  onChange = page => {
    let { current } = page
    this.setState({ pageNum: current })
    this.getTableDataSourse({ pageNum: current })
  }

  componentDidMount() {
    this.getTableDataSourse()
    this.setDefaultTabls()
  }

  render() {
    const {
      columns,
      dataSource,
      pagination,
      loading,
      tableData: { scroll }
    } = this.state
    
    return (
      <Content className="layout-content">
        <Table
          rowKey={record => record.roleId}
          bordered
          pagination={pagination}
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          onChange={this.onChange}
          scroll={scroll ? scroll : null}
        />
      </Content>
    )
  }
}
