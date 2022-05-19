import React, { useMemo, useState, Suspense } from 'react'
import {
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useOutlet,
  matchRoutes,
  // useOutletContext
} from 'react-router-dom'
import { flatten } from 'lodash'
import {
  Menu,
  Layout,
  Dropdown,
  Spin,
  Avatar,
  Space,
  Modal,
  message,
} from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  GlobalOutlined,
  LogoutOutlined,
  LockOutlined,
} from '@ant-design/icons'

import useRoutesConfig from '@/routes/config'
import useAppConfig from '@packages/shared/hooks/useAppConfig'
import useAccount from '@packages/shared/hooks/useAccount'

import './style.scss'

const { Header, Sider, Content } = Layout

const languageLabels: any = {
  'zh-CN': '简体中文',
  'en-US': 'English',
}

export default function CommonLayout() {
  const navigate = useNavigate()
  const { account } = useAccount()
  const { locale, setLocale } = useAppConfig()
  const configs = useRoutesConfig()
  const [collapsed, setCollapsed] = useState(false)

  const menuConfig = useMemo(() => {
    const targetConfig = configs.find((item: any) => {
      return item?.element?.type?.displayName === 'CommonLayout'
    })

    return filterNav(targetConfig?.children ?? [])
  }, [configs])

  // @ts-ignore
  window.navigate = navigate

  return (
    <div className="common-layout-wrapper">
      <Layout>
        <Sider
          // width={280}
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflowY: 'auto',
          }}
        >
          <div className="logo"></div>
          <Menu
            theme="dark"
            items={menuConfig}
            mode="inline"
            onSelect={(item) => {
              // console.log(item)
              navigate(item?.key)
            }}
            onOpenChange={(item) => {
              // console.log(item)
              // navigate(item?.key)
            }}
          />
        </Sider>
        <Layout>
          <Header className="common-layout-header" style={{ padding: 0 }}>
            <div className="common-layout-header-content">
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
              <Space
                className="common-layout-header-content-right"
                size="large"
              >
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item
                        key="logout"
                        onClick={() => {
                          Modal.confirm({
                            title: '操作确认',
                            content: '确定要登出吗？',
                            onOk: async () => {
                              message.success('登出成功')
                              navigate('/login')
                            },
                            onCancel() {},
                          })
                        }}
                      >
                        <Space>
                          <LogoutOutlined />
                          登出
                        </Space>
                      </Menu.Item>
                      <Menu.Item key="modify">
                        <Space>
                          <LockOutlined />
                          修改密码
                        </Space>
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <Space>
                    <Avatar className="avatar" />
                    <span>{account?.username}</span>
                  </Space>
                </Dropdown>

                <Dropdown
                  overlay={
                    <Menu
                      className="menu"
                      selectedKeys={[locale!]}
                      onClick={({ key }) => {
                        setLocale(key)
                      }}
                      items={['zh-CN', 'en-US'].map((key: any) => ({
                        key,
                        label: languageLabels[key],
                      }))}
                    ></Menu>
                  }
                  placement="bottomRight"
                >
                  <div style={{ height: '100%' }}>
                    <GlobalOutlined />
                  </div>
                </Dropdown>
              </Space>
            </div>
          </Header>
          <Content
            style={{
              padding: '24px 16px 0',
            }}
          >
            <div className="common-layout-content">
              <Suspense fallback={<Spin />}>
                <Outlet />
              </Suspense>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

CommonLayout.displayName = 'CommonLayout'

function filterNav(list: any[], parents: any[] = []): any[] {
  return flatten(
    [...list]
      .map(({ ...item }: any) => {
        if (Array.isArray(item.children)) {
          item.children = filterNav(item.children, [...parents, item])

          if (item.children.length === 0) {
            return undefined
          }

          if (item.children.length === 1) {
            return item.children[0]
          }

          if (!(item.label ?? item.title)) {
            return item.children
          }
        } else {
          if (!item.menu) {
            return undefined
          }
        }

        return item
      })
      .flat(Infinity)
  )
    .filter(Boolean)
    .map(({ ...item }: any) => {
      if (Array.isArray(item.children)) {
        item.key = item.key ?? item.path
        delete item.path
      } else {
        item.key =
          item.key ??
          `/${[...parents, item]
            .map((item) => item.path)
            .filter(Boolean)
            .join('/')
            .replace(/\/\//g, '/')}`
      }

      item.label = item.label ?? item.title

      delete item.title
      delete item.index
      delete item.element
      delete item.menu

      return item
    })
}
