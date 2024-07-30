import { useState } from 'react'

import { cn } from "@/lib/utils";
import { Separator } from '@/components/ui/separator'

import Header from './components/header/Header'
import Pomodoro from './components/main/Pomodoro'
import Footer from './components/footer/Footer'

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

  /* Background color */
  const [isRedPalette, setIsRedPalette] = useState(true);
  const togglePalette = () => {
    setIsRedPalette(!isRedPalette);
  }

  return (
    <>
      <body className={cn("flex justify-center items-center", isRedPalette ? "bg-my-red-800" : "bg-my-green-800")}>
        <main className="flex flex-col justify-between w-[912px] h-screen"> {/* Header i footer fixes + secció central ajustable a la mida de la pantalla */}
          <div id="header-section" className="min-h-10 max-h-10 my-1 mx-1 flex flex-col justify-center">
            <Header
              pomodoroTime={pomodoroTimerValue} setPomodoroTime={setPomodoroTimerValue}
              shortBreakTime={shortBreakTimerValue} setShortBreakTime={setShortBreakTimerValue}
              longBreakTime={longBreakTimerValue} setLongBreakTime={setLongBreakTimerValue}
              handleSaveButton={handleSaveButton}
              isRedPalette={isRedPalette}
            />
          </div>

          <Separator className={cn(isRedPalette ? "bg-my-red-950" : "bg-my-green-950")}/>

          <div id="main-section" className="my-2">
            <Pomodoro
              pomodoroTime={pomodoroTimerValue}
              shortBreakTime={shortBreakTimerValue}
              longBreakTime={longBreakTimerValue}
              isRedPalette={isRedPalette}
              togglePalette={togglePalette}
            />
          </div>

          <Separator className={cn(isRedPalette ? "bg-my-red-950" : "bg-my-green-950")}/>

          <div id="footer-section" className="min-h-10 max-h-10 my-1 mx-1 flex flex-col justify-center">
            <Footer
              isRedPalette={isRedPalette}
            />
          </div>
        </main>
      </body>
    </>
  )
};

export default App;