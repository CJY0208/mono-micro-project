import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Space, message, Avatar } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import useAccount from '@packages/shared/hooks/useAccount'

import styles from './style.module.scss'

export default function Login() {
  const [form] = Form.useForm()
  const { setAccount } = useAccount()
  const navigate = useNavigate()

  return (
    <div className={`${styles.container} w-full h-full flex justify-center`}>
      <Space size="large" direction="vertical" className="w-[520px] p-8 mt-32">
        <Space
          size="large"
          direction="vertical"
          className="w-full flex flex-col items-center justify-center"
        >
          <Avatar className="w-44 h-44" />
          <p className="text-white text-2xl font-bold text-center my-5">
            Mono Micro Project
          </p>
        </Space>
        <Form form={form} className="mt-6">
          <Space size={2} direction="vertical" className="w-full">
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入用户名（随便输入）',
                },
              ]}
            >
              <Input
                size="large"
                prefix={
                  <UserOutlined className="mr-2" style={{ color: '#1890ff' }} />
                }
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码（随便输入）',
                },
              ]}
            >
              <Input
                size="large"
                prefix={
                  <LockOutlined className="mr-2" style={{ color: '#1890ff' }} />
                }
                type="password"
                placeholder="密码"
              ></Input>
            </Form.Item>
            <Form.Item>
              <Button
                className="mt-6"
                size="large"
                block
                type="primary"
                onClick={async () => {
                  const [error, values] = await form
                    .validateFields()
                    .then((values) => [null, values])
                    .catch((error) => [error, null])

                  if (error) {
                    return
                  }

                  console.log(values)

                  message.success('登录成功')
                  setAccount({
                    username: 'TEST_USER',
                  })

                  navigate('/')
                }}
              >
                登录
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Space>
    </div>
  )
}
