import React, { useState, useEffect } from 'react'
import { Drawer, Tabs, Tree } from 'antd'
import PropTypes from 'prop-types'

const { TabPane } = Tabs

const Rolepermissions = props => {
  const { drawerVisible, setDraVisible, menu } = props
  const [checkedKeys, setCheckedKeys] = useState(['20201010174520242073044'])
  const [selectedKeys, setSelectedKeys] = useState([])

  useEffect(() => {
    let menus = menu.menus
    initTreeData(menus)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menu])

  const initTreeData = menus => {
    if (menus && menus.length > 0) {
      let initData = menus.map((item, index) => {
        item.title = item.label
        item.key = `0-${index}`
        console.log(index, 'index')
        if (item.children && item.children.length > 0) {
          // initTreeData(item.children)
        }
        return item
      })
      return initData
    }
  }

  const onClose = () => {
    setDraVisible(false)
  }

  const onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys)
  }

  const onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys)
    setCheckedKeys(checkedKeys)
  }

  const onSelect = (selectedKeys, info) => {
    console.log('onSelect', info)
    setSelectedKeys(selectedKeys)
  }

  return (
    <>
      <Drawer
        title="角色权限"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={drawerVisible}
        width="500"
      >
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="菜单权限" key="1">
            <Tree
              checkable
              onExpand={onExpand}
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              onSelect={onSelect}
              selectedKeys={selectedKeys}
              treeData={menu.menus}
            />
          </TabPane>
          <TabPane tab="数据权限" key="2">
            数据权限
          </TabPane>
        </Tabs>
      </Drawer>
    </>
  )
}

Rolepermissions.defaultProps = {
  drawerVisible: false
}

Rolepermissions.propTypes = {
  menu: PropTypes.object.isRequired,
  drawerVisible: PropTypes.bool
}

export default Rolepermissions
