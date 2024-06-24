import { useState } from 'react'

import { Separator } from '@/components/ui/separator'

import Header from './components/Header'
import Pomodoro from './components/Pomodoro'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <body className="flex justify-center items-center"> {/* ¿¿Mejor usar div?? */}
        <main className="w-[450px]">
          <Header />

          <Separator className="bg-my-red-50"/>

          <Pomodoro />

          <Separator className="bg-my-red-50"/>

          {/* Here goes the todo list */}
        </main>
      </body>
    </>
  )
}

export default App
