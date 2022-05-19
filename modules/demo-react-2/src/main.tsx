import React from 'react'
import ReactDOM from 'react-dom'
import { renderWithQiankun } from 'vite-plugin-qiankun/dist/helper'
import useAccount from '@packages/shared/hooks/useAccount'
import useAppConfig from '@packages/shared/hooks/useAppConfig'
import App from '@/routes'

import './index.scss'

const appName = 'demo-react-2'

export default function start(props: any = {}) {
  const { container } = props

  ReactDOM.render(
    <App />,
    container
      ? container.querySelector(`#${appName}-root`)
      : document.querySelector(`#${appName}-root`)
  )
}

function applyProps(props: any) {
  useAccount.data?.setAccount(props?.account)
  useAppConfig?.data?.setLocale(props?.locale)
}

renderWithQiankun({
  bootstrap() {
    console.log(`[${appName}] bootstrap`)
  },
  mount(props: any) {
    console.log(`[${appName}] mount`, props)
    applyProps(props)
    start(props)
  },
  update(props: any) {
    console.log(`[${appName}] update`, props)
    applyProps(props?.props ?? props)
  },
  unmount(props: any) {
    console.log(`[${appName}] unmount`)
    const { container } = props
    ReactDOM.unmountComponentAtNode(
      container
        ? container.querySelector(`#${appName}-root`)
        : document.querySelector(`#${appName}-root`)
    )
  },
})

// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  start()
}

// @ts-ignore
if (process.env.NODE_ENV === 'development') {
  import('@/hmr.fix')
}
