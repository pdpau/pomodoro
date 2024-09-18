import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { ModeType } from '@/types';

const formatTime = (minutesInput: number): string => {
    const totalSeconds = Math.floor(minutesInput * 60);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const strMinutes = minutes.toString().padStart(2, '0');
    const strSeconds = seconds.toString().padStart(2, '0');

    return `${strMinutes}:${strSeconds}`;
}

interface TimerProps {
    /* Pomodoro */
    pomodoroTime: number;
    shortBreakTime: number;
    longBreakTime: number;
    /* Completed pomodoros */
    completedPomodoros: number;
    setCompletedPomodoros: Dispatch<SetStateAction<number>>;

    /* Background color */
    isRedPalette: boolean;
    togglePalette: () => void;
}

const Timer: React.FC<TimerProps> = ({ pomodoroTime, shortBreakTime, longBreakTime, completedPomodoros, setCompletedPomodoros, isRedPalette, togglePalette }) => {

    const [temporalPomodoroTime, setTemporalPomodoroTime] = useState<number>(pomodoroTime);
    const [temporalShortBreakTime, setTemporalShortBreakTime] = useState<number>(shortBreakTime);
    const [temporalLongBreakTime, setTemporalLongBreakTime] = useState<number>(longBreakTime);


    const [mode, setMode] = useState<ModeType>('work');
    const handleMode = (newMode: ModeType) => {
        /* Change mode */
        setMode(newMode);
        /* Reset values for the timers */
        setTemporalPomodoroTime(pomodoroTime);
        setTemporalShortBreakTime(shortBreakTime);
        setTemporalLongBreakTime(longBreakTime);
        /* Update display immediately */
        if (newMode === 'work') {
            setDisplay(formatTime(temporalPomodoroTime));
        } else if (newMode === 'rest') {
            setDisplay(formatTime(temporalShortBreakTime));
        }
        /* Change palette (red or green) */
        togglePalette();
    }

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
                    handleMode('rest');
                }
            } else if (mode === 'rest') {
                setTemporalShortBreakTime(temporalShortBreakTime => temporalShortBreakTime - (1/60));
                if (temporalShortBreakTime <= (1/60)) {
                    handleMode('work');
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
        setDisplay(formatTime(temporalPomodoroTime));
    }, [temporalPomodoroTime]);
    useEffect(() => {
        if (mode !== 'rest') return;
        setDisplay(formatTime(temporalShortBreakTime));
    }, [temporalShortBreakTime]);
    /* ---------- End of time display ---------- */

    /* ---------- Handle DONE button ---------- */
    const handleDoneButton = () => {
        /* Add one to the pomodoros complete counter */
        if (mode === 'work') {
            setCompletedPomodoros(completedPomodoros + 1);
        }
        /* Jump to next mode */
        if (mode === 'work') {
            handleMode('rest');
        } else if (mode === 'rest') {
            handleMode('work');
        }
    }
    /* ---------- End of handle DONE button ---------- */


    return (
        <div className={cn(
            "min-w-[448px] min-h-[260px] max-w-[448px] max-h-[260px]", 
            "flex flex-col items-center justify-evenly rounded-lg", 
            "bg-white bg-opacity-10"
        )}>
            <span className="text-4xl font-bold mt-3">{mode === 'work' ? 'Working' : 'Break time !!'}</span>

            {/* <span className="text-lg font-bold">Completed pomodoros (change this): {completedPomodoros}</span> */}

            {/* TODO: Quadrats centrals queden una mica desplaçats */}
            <span className="flex justify-center w-80 h-28 text-9xl font-bold">{display}</span>
            {/* <span className="absolute top-1/5 text-9xl font-bold leading-none">{display}</span> */}

            <div id="start-stop-buttons" className="gap-x-2">
                {/* TODO: El codi seguent segur que es optimitzable */}
                {isPlaying ? (
                    <div className="space-x-4">
                        <button className={cn("w-24 h-12 rounded-sm", 
                            "font-medium text-2xl", isRedPalette ? "text-my-red-900" : "text-my-green-900",
                            "transition duration-300",
                            "hover:scale-105", isRedPalette ? "hover:text-my-red-950" : "hover:text-my-green-950")}
                            onClick={handleIsPlaying}
                        >Stop</button>
                        <button className={cn("w-24 h-12 rounded-sm", 
                            "font-medium text-2xl", isRedPalette ? "text-my-red-900" : "text-my-green-900",
                            "transition duration-300",
                            "hover:scale-105", isRedPalette ? "hover:text-my-red-950" : "hover:text-my-green-950")}
                            onClick={handleDoneButton}
                        >Done</button>
                    </div>
                ) : (
                    <div className="space-x-4">
                        <button className={cn("w-24 h-12 rounded-sm", 
                            "font-medium text-2xl", isRedPalette ? "text-my-red-900" : "text-my-green-900",
                            "transition duration-300",
                            "hover:scale-105", isRedPalette ? "hover:text-my-red-950" : "hover:text-my-green-950")}
                            onClick={handleIsPlaying}
                        >Start</button>
                        <button className={cn("w-24 h-12 rounded-sm", 
                            "font-medium text-2xl", isRedPalette ? "text-my-red-900" : "text-my-green-900",
                            "transition duration-300",
                            "hover:scale-105", isRedPalette ? "hover:text-my-red-950" : "hover:text-my-green-950")}
                            onClick={handleDoneButton}
                        >Done</button>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Timer;