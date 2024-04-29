import { useState } from 'react'

import { Separator } from '@/components/ui/separator'

import Header from './components/Header'
import Pomodoro from './components/Pomodoro'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />

      <Separator />

      <Pomodoro />
    </>
  )
}

export default App
