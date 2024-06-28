import { useState } from 'react'

import { Separator } from '@/components/ui/separator'

import Header from './components/Header'
import Pomodoro from './components/Pomodoro'

function App() {
  const [count, setCount] = useState(0)

  /* Timers */
  const [pomodoroTimerValue, setPomodoroTimerValue] = useState(25);
  const [shortBreakTimerValue, setShortBreakTimerValue] = useState(5);
  const [longBreakTimerValue, setLongBreakTimerValue] = useState(10);
  const handleSaveButton = (pom: number, short: number, long: number) => {
    setPomodoroTimerValue(pom);
    setShortBreakTimerValue(short);
    setLongBreakTimerValue(long);
  }

  return (
    <>
      <body className="flex justify-center items-center"> {/* ¿¿Mejor usar div?? */}
        <main className="w-[750px]">
          <Header 
            pomodoroTime={pomodoroTimerValue} setPomodoroTime={setPomodoroTimerValue}
            shortBreakTime={shortBreakTimerValue} setShortBreakTime={setShortBreakTimerValue}
            longBreakTime={longBreakTimerValue} setLongBreakTime={setLongBreakTimerValue}
            handleSaveButton={handleSaveButton}
          />

          <Separator className="bg-my-red-950"/>

          <Pomodoro 
            pomodoroTime={pomodoroTimerValue} /* setPomodoroTime={setPomodoroTimerValue} ES POT BORRAR */
            shortBreakTime={shortBreakTimerValue} /* setShortBreakTime={setShortBreakTimerValue} */
            longBreakTime={longBreakTimerValue} /* setLongBreakTime={setLongBreakTimerValue} */
          />

          <Separator className="bg-my-red-950"/>

          {/* Here goes the footer */}
          {/* TODO: Header i footer fixes + secció central ajustable a la mida de la pantalla */}
        </main>
      </body>
    </>
  )
}

export default App
