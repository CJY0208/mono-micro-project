import React, { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div>{{ name }} Home</div>
      <div>count: {count}</div>
      <button
        className="py-2 px-3 text-white rounded-sm bg-slate-500 hover:bg-slate-600 active:bg-slate-700 focus:outline-none focus:ring focus:ring-slate-300"
        onClick={() => setCount(count + 1)}
      >
        +
      </button>
    </div>
  )
}
