import React, { useState, useRef, useEffect, memo, lazy } from 'react'
import { loadMicroApp, FrameworkConfiguration, initGlobalState } from 'qiankun'
import { useLocation } from 'react-router-dom'

const Lazy = lazy(() => new Promise(() => null))

const microAppEntryCache: any = {}
const actions = initGlobalState({ hash: '' })

function run(fn: any, ...params: any[]) {
  if (typeof fn === 'function') {
    return fn(...params)
  }

  return undefined
}

interface MicroAppProps extends FrameworkConfiguration {
  name: string
  entry?: string
  props?: any
  [key: string]: any
}

let prevAppUnmountPromise: Promise<any> = Promise.resolve()

// https://qiankun.umijs.org/zh/api#loadmicroappapp-configuration
const MicroApp = memo(function MicroApp({
  name,
  entry,
  sandbox = true,
  props = {},
}: MicroAppProps) {
  const location = useLocation()
  const [ready, setReady] = useState(false)
  const microApp = useRef<any>()
  const container = useRef<any>()

  // const { account } = useAccount()
  // const { locale } = useAppConfig()

  useEffect(() => {
    // debugger
    async function mount() {
      // debugger
      await prevAppUnmountPromise
      // debugger
      window[name as any] = microAppEntryCache[name] ?? window[name as any]

      microApp.current = loadMicroApp(
        {
          name,
          entry: entry!,
          container: container.current,
          props,
        },
        {
          sandbox,
        }
      )

      microApp.current.mountPromise.then(() => {
        if (window[name as any]) {
          microAppEntryCache[name] = window[name as any]
        }

        setReady(true)
      })
    }
    mount()

    return () => {
      // debugger
      prevAppUnmountPromise = Promise.resolve(run(microApp.current?.unmount)).then(
        () => {
          // debugger
        }
      )
    }
  }, [])

  useEffect(() => {
    if (!microApp.current) {
      return
    }
    run(microApp.current?.update, {
      container: container.current,
      props: {
        ...props,
        location,
      },
    })
  }, [location, Object.values(props)])

  useEffect(() => {
    actions.setGlobalState(location)
  }, [location])

  return (
    <>
      <div className="micro-wrapper" ref={container} />
      {!ready && <Lazy />}
    </>
  )
})

export default function MicroAppWrapper(props: MicroAppProps) {
  return <MicroApp key={props.name} entry={`/${props.name}/`} {...props} />
}
