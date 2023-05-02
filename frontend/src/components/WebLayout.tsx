import { PieChartOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd'
import { useState } from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
const { Header, Sider } = Layout
function getItem(
  label: string,
  key: string,
  icon: JSX.Element,
  to: string,
  children: undefined
) {
  return {
    key,
    icon,
    children,
    label: <Link to={to}>{label}</Link>,
  }
}
const items = [
  getItem('Users', '1', <UserOutlined />, '/users', undefined),
  getItem('Chart', '2', <PieChartOutlined />, '/chart', undefined),
]
const WebLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme='dark'
          defaultSelectedKeys={['1']}
          mode='inline'
          items={items}
        />
      </Sider>
      <Layout className='site-layout'>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Outlet />
      </Layout>
    </Layout>
  )
}
export default WebLayout
