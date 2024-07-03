import { useState } from 'react'

import { Separator } from '@/components/ui/separator'

import Header from './components/Header'
import Pomodoro from './components/Pomodoro'
import Footer from './components/Footer'

function App() {

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
        <main className="flex flex-col justify-between w-[912px] h-screen"> {/* Header i footer fixes + secció central ajustable a la mida de la pantalla */}
          <div id="header-section" className="min-h-10 max-h-10 my-1 mx-1 flex flex-col justify-center">
            <Header
              pomodoroTime={pomodoroTimerValue} setPomodoroTime={setPomodoroTimerValue}
              shortBreakTime={shortBreakTimerValue} setShortBreakTime={setShortBreakTimerValue}
              longBreakTime={longBreakTimerValue} setLongBreakTime={setLongBreakTimerValue}
              handleSaveButton={handleSaveButton}
            />
          </div>

          <Separator className="bg-my-red-950"/>

          <div id="main-section" className="my-2">
            <Pomodoro
              pomodoroTime={pomodoroTimerValue} /* setPomodoroTime={setPomodoroTimerValue} ES POT BORRAR */
              shortBreakTime={shortBreakTimerValue} /* setShortBreakTime={setShortBreakTimerValue} */
              longBreakTime={longBreakTimerValue} /* setLongBreakTime={setLongBreakTimerValue} */
            />
          </div>

          <Separator className="bg-my-red-950"/>

          <div id="footer-section" className="min-h-10 max-h-10 my-1 mx-1 flex flex-col justify-center">
            <Footer />
          </div>
        </main>
      </body>
    </>
  )
};

export default App;