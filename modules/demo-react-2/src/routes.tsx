import React, { Suspense } from 'react'
import { HashRouter, useRoutes } from 'react-router-dom'
import { Spin } from 'antd'
import Lazy from '@packages/shared/components/Lazy'
import BlankLayout from '@packages/shared/layouts/Blank'

function Routes() {
  const elements = useRoutes([
    {
      element: <BlankLayout />,
      children: [
        {
          path: '/',
          element: <Lazy entry={() => import('@/pages/home')} />,
        },
      ],
    },
    {
      path: '*',
      element: <div>404</div>,
    },
  ])

  return (
    <>
      <Suspense fallback={<Spin />}>{elements}</Suspense>
    </>
  )
}

export default () => (
  <HashRouter>
    <Routes />
  </HashRouter>
)
