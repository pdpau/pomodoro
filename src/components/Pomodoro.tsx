
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ModeType } from '@/types';
import { format } from 'path';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const formatTime = (minutesInput: number, setDisplay: Dispatch<SetStateAction<string>>) => {
    const totalSeconds = Math.floor(minutesInput * 60);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const strMinutes = minutes.toString().padStart(2, '0');
    const strSeconds = seconds.toString().padStart(2, '0');

    setDisplay(`${strMinutes}:${strSeconds}`);
}

interface PomodoroProps {
    pomodoroTime: number;
    setPomodoroTime: Dispatch<SetStateAction<number>>;
    shortBreakTime: number;
    setShortBreakTime: Dispatch<SetStateAction<number>>;
    longBreakTime: number;
    setLongBreakTime: Dispatch<SetStateAction<number>>;
}

const Pomodoro: React.FC<PomodoroProps> = ({pomodoroTime, setPomodoroTime, shortBreakTime, setShortBreakTime, longBreakTime, setLongBreakTime}) => {
    const [temporalPomodoroTime, setTemporalPomodoroTime] = useState<number>(pomodoroTime);
    const [temporalShortBreakTime, setTemporalShortBreakTime] = useState<number>(shortBreakTime);
    const [temporalLongBreakTime, setTemporalLongBreakTime] = useState<number>(longBreakTime);
    const handleRestart = () => {
        setTemporalPomodoroTime(pomodoroTime);
        setTemporalShortBreakTime(shortBreakTime);
        setTemporalLongBreakTime(longBreakTime);
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
                    handleRestart();
                }
            } else if (mode === 'rest') {
                setTemporalShortBreakTime(temporalShortBreakTime => temporalShortBreakTime - (1/60));
                if (temporalShortBreakTime <= (1/60)) {
                    setMode('work');
                    handleRestart();
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
        if (newMode === 'work' && mode === 'rest') {
            setTemporalPomodoroTime(pomodoroTime);
            setTemporalShortBreakTime(shortBreakTime);
            setTemporalLongBreakTime(longBreakTime);
        }
        if (newMode === 'rest' && mode === 'work') {
            setTemporalPomodoroTime(pomodoroTime);
            setTemporalShortBreakTime(shortBreakTime);
            setTemporalLongBreakTime(longBreakTime);
        }
        setMode(newMode); /* TODO: Segueix el mateix problema al canviar de modes */
    }
    /* ---------- End of handle WORK and BREAK buttons ---------- */





    return (
        <section className={cn("w-full h-full p-8", "flex items-center justify-between", "text-my-red-950")}>
            {/* Time */}
            <div className={cn("min-w-80 min-h-56 max-w-80 max-h-80", 
                "flex flex-col items-center justify-center rounded-lg", 
                "bg-white bg-opacity-10"
            )}>
                <div id="options" className="flex gap-4">
                    <button className={cn()} onClick={() => handleMode('work')}>Work</button>
                    <button className={cn()} onClick={() => handleMode('rest')}>Break</button>
                </div>
                <span className="text-xl font-bold">{mode === 'work' ? 'Working' : 'Break time !!'}</span>
                <span className="text-8xl font-bold">{display}</span>
                <div id="start-stop-buttons" className="flex gap-2">
                    {/* TODO: Donar estils als botons */}
                    {isPlaying ? (
                        <button className={cn("w-16 h-8 p-1.5 rounded-sm", 
                            "bg-my-red-400",
                            "transition duration-300",
                            "hover:bg-my-red-500 hover:scale-105")}
                            onClick={handleIsPlaying}
                        >Stop</button>
                    ) : (
                        <div>
                            <button className={cn("w-16 h-8 p-1.5 rounded-sm", 
                                "bg-my-red-400",
                                "transition duration-300",
                                "hover:bg-my-red-500 hover:scale-105")}
                                onClick={handleIsPlaying}
                            >Start</button>
                            <button className={cn("w-16 h-8 p-1.5 rounded-sm", 
                                "bg-my-red-400",
                                "transition duration-300",
                                "hover:bg-my-red-500 hover:scale-105")}
                                onClick={handleRestart}
                            >Restart</button>
                        </div>
                    )}
                </div>
            </div>

            <Separator orientation='vertical' className='bg-white' />

            {/* Tasks */}
            <div className={cn("min-w-80 min-h-56 max-w-80 max-h-80", 
                "flex flex-col items-center justify-center rounded-lg", 
                "bg-white bg-opacity-10"
            )}>
                <div className="flex justify-center items-center pb-1">
                    <h3 className="text-sm text-black font-playfair font-bold border-b border-black">THIS WILL BE A TASKS SECTION THAT WILL ALLOW THE USER TO CREATE A TODO LIST FOR HIS/HER WORK SESSION</h3>
                </div>
                <div className="flex justify-center">
                    <button>TODO</button>
                </div>
            </div>
        </section>
    )
}

export default Pomodoro;