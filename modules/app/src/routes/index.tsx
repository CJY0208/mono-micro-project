import React from 'react'
import { useRoutes } from 'react-router-dom'

import useRoutesConfig from './config'

export default function Routes() {
  const config = useRoutesConfig()
  const elements = useRoutes(config)

  return <>{elements}</>
}
