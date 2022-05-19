import React, { Suspense, useMemo, lazy } from 'react'

export default function Lazy({ entry }: any) {
  const Comp = useMemo(() => lazy(entry), [])

  return (
    <Suspense fallback={null}>
      <Comp />
    </Suspense>
  )
}
