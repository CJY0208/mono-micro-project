import React from 'react'
import BlankLayout from '@packages/shared/layouts/Blank'
import Lazy from '@packages/shared/components/Lazy'
import useAccount from '@packages/shared/hooks/useAccount'
import useAppConfig from '@packages/shared/hooks/useAppConfig'

import MicroApp from '@/components/MicroApp'
import CommonLayout from '@/layouts/Common'
import Home from '@/pages/home'
import { Navigate } from 'react-router-dom'

export default function useRoutesConfig() {
  const { account } = useAccount()
  const { locale } = useAppConfig()

  const configs: any[] = [
    {
      element: <CommonLayout />,
      children: [
        {
          children: [
            {
              index: true,
              title: '首页',
              element: <Home />,
              menu: true,
            },
            {
              path: 'any',
              title: '404 页',
              element: <Navigate replace to={`/random-${Math.random()}`} />,
              menu: true,
            },
            { path: '*', element: '404' },
          ],
        },
        {
          path: 'micro',
          children: [
            {
              menu: true,
              title: 'demo-react-1',
              path: 'demo-react-1',
              element: (
                <MicroApp
                  name="demo-react-1"
                  sandbox={{
                    experimentalStyleIsolation: true,
                  }}
                  props={{
                    account,
                    locale,
                  }}
                />
              ),
            },
            {
              menu: true,
              title: 'demo-vue-1',
              path: 'demo-vue-1',
              element: (
                <MicroApp
                  name="demo-vue-1"
                  sandbox={{
                    experimentalStyleIsolation: true,
                  }}
                  props={{
                    account,
                    locale,
                  }}
                />
              ),
            },
            {
              menu: true,
              title: 'demo-react-2',
              path: 'demo-react-2',
              element: (
                <MicroApp
                  name="demo-react-2"
                  sandbox={{
                    experimentalStyleIsolation: true,
                  }}
                  props={{
                    account,
                    locale,
                  }}
                />
              ),
            },
            {
              menu: true,
              title: 'demo-vue-2',
              path: 'demo-vue-2',
              element: (
                <MicroApp
                  name="demo-vue-2"
                  sandbox={{
                    experimentalStyleIsolation: true,
                  }}
                  props={{
                    account,
                    locale,
                  }}
                />
              ),
            },
          ],
        },
      ],
    },
    {
      element: <BlankLayout />,
      children: [
        {
          path: 'login',
          element: <Lazy entry={() => import('@/pages/login')} />,
        },
        { path: '*', element: '404' },
      ],
    },
  ]
  return configs
}
