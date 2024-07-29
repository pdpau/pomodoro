import { cn } from '@/lib/utils';
import { ModeType } from '@/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const formatTime = (minutesInput: number, setDisplay: Dispatch<SetStateAction<string>>) => {
    const totalSeconds = Math.floor(minutesInput * 60);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const strMinutes = minutes.toString().padStart(2, '0');
    const strSeconds = seconds.toString().padStart(2, '0');

    setDisplay(`${strMinutes}:${strSeconds}`);
}

interface TimerProps {
    /* Pomodoro */
    pomodoroTime: number;
    shortBreakTime: number;
    longBreakTime: number;
}

const Timer: React.FC<TimerProps> = ({pomodoroTime, shortBreakTime, longBreakTime}) => {
    const [temporalPomodoroTime, setTemporalPomodoroTime] = useState<number>(pomodoroTime);
    const [temporalShortBreakTime, setTemporalShortBreakTime] = useState<number>(shortBreakTime);
    const [temporalLongBreakTime, setTemporalLongBreakTime] = useState<number>(longBreakTime);
    const handleReset = (fromResetButton: boolean) => {
        setTemporalPomodoroTime(pomodoroTime);
        setTemporalShortBreakTime(shortBreakTime);
        setTemporalLongBreakTime(longBreakTime);
        if (fromResetButton) {
            setMode('work'); /* Returns to the pomodoro start */
            formatTime(temporalPomodoroTime, setDisplay);
        }
    }


    const [mode, setMode] = useState<ModeType>('work');

    /* ---------- Playing or not playing time ---------- */
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const handleIsPlaying = () => {
        setIsPlaying(!isPlaying);
    }
    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(() => {
            if (mode === 'work') {
                setTemporalPomodoroTime(temporalPomodoroTime => temporalPomodoroTime - (1/60));
                if (temporalPomodoroTime <= (1/60)) {
                    setMode('rest');
                    handleReset(false);
                }
            } else if (mode === 'rest') {
                setTemporalShortBreakTime(temporalShortBreakTime => temporalShortBreakTime - (1/60));
                if (temporalShortBreakTime <= (1/60)) {
                    setMode('work');
                    handleReset(false);
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [isPlaying, mode, temporalPomodoroTime, temporalShortBreakTime])
    /* ---------- End of playing or not playing time ---------- */

    /* ---------- Time display ---------- */
    const [display, setDisplay] = useState<string>('00:00');
    useEffect(() => {
        if (mode !== 'work') return;
        formatTime(temporalPomodoroTime, setDisplay); /* TODO: Falta que quan li doni a SAVE es mostri els nous minuts al timer */
    }, [temporalPomodoroTime]);
    useEffect(() => {
        if (mode !== 'rest') return;
        formatTime(temporalShortBreakTime, setDisplay);
    }, [temporalShortBreakTime]);
    /* ---------- End of time display ---------- */

    /* ---------- Handle WORK and BREAK buttons ---------- */
    const handleMode = (newMode: ModeType) => {
        setMode(newMode); /* TODO: Segueix el mateix problema al canviar de modes */
        handleReset(false);
    }
    /* ---------- End of handle WORK and BREAK buttons ---------- */


    return (
        <div className={cn(
            "min-w-[448px] min-h-[260px] max-w-[448px] max-h-[260px]", 
            "flex flex-col items-center justify-evenly rounded-lg", 
            "bg-white bg-opacity-10"
        )}>
            <span className="text-4xl font-bold mt-4 pb-4">{mode === 'work' ? 'Working' : 'Break time !!'}</span>
            <span className="flex justify-center w-80 text-9xl font-bold">{display}</span> {/* TODO: Que quan baixi els numeros es quedin quiets */}
            <div id="start-stop-buttons" className="flex gap-2">
                {isPlaying ? (
                    <div className="mb-4">
                        <button className={cn("w-24 h-12 rounded-sm", 
                            "font-medium text-2xl text-my-red-900",
                            "transition duration-300",
                            "hover:scale-105 hover:text-my-red-950")}
                            onClick={handleIsPlaying}
                        >Stop</button>
                    </div>
                ) : (
                    <div className="space-x-4 mb-4">
                        <button className={cn("w-24 h-12 rounded-sm", 
                            "font-medium text-2xl text-my-red-900",
                            "transition duration-300",
                            "hover:scale-105 hover:text-my-red-950")}
                            onClick={handleIsPlaying}
                        >Start</button>
                        <button className={cn("w-24 h-12 rounded-sm", 
                            "font-medium text-2xl text-my-red-900",
                            "transition duration-300",
                            "hover:scale-105 hover:text-my-red-950")}
                            onClick={() => handleReset(true)}
                        >Reset</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Timer;