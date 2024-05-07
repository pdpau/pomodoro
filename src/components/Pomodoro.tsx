import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ModeType, PomodoroOptionsType } from '@/types';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const PomodoroOptions = {
    '25/5': {
        /* work: 3, // in seconds
        rest: 5 */
        initWork: 25 * 60,
        initRest: 5 * 60
    },
    '50/10': {
        initWork: 50 * 60,
        initRest: 10 * 60
    }
}

const formatTime = (time: number, setDisplay: Dispatch<SetStateAction<string>>) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const strMinutes = minutes.toString().padStart(2, '0');
    const strSeconds = seconds.toString().padStart(2, '0');

    setDisplay(`${strMinutes}:${strSeconds}`);
}


const Pomodoro = () => {
    /* Options and modes */
    const [option, setOption] = useState<PomodoroOptionsType>('25/5');
    const [work, setWork] = useState<number>(PomodoroOptions[option].initWork);
    const [rest, setRest] = useState<number>(PomodoroOptions[option].initRest);
    const [mode, setMode] = useState<ModeType>('work');
    /* const handleOption = (newOption: PomodoroOptionsType) => {
        if (mode === 'work') setWork(PomodoroOptions[newOption].initWork);
        if (mode === 'rest') setRest(PomodoroOptions[newOption].initRest);
        setOption(newOption);
    }
    const handleMode = (newMode: ModeType) => {
        if (newMode === 'work') setWork(PomodoroOptions[option].initWork);
        if (newMode === 'rest') setRest(PomodoroOptions[option].initRest);
        setMode(newMode);
    } */
    const handleOptionMode = (newOption: PomodoroOptionsType, newMode: ModeType) => {
        setOption(newOption);
        setMode(newMode);
        setWork(PomodoroOptions[newOption].initWork);
        setRest(PomodoroOptions[newOption].initRest);
    }
    /* End of options and modes */

    /* Playing or not playing time */
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const handleIsPlaying = () => {
        setIsPlaying(!isPlaying);
    }
    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(() => {
            if (mode === 'work') {
                setWork(work => work - 1);
                if (work <= 0) {
                    handleOptionMode(option, 'rest');
                    formatTime(rest, setDisplay); // para que se actualice el display a los minutos antes de empezar la cuenta atras
                }
            } else if (mode === 'rest') {
                setRest(rest => rest - 1);
                if (rest <= 0) {
                    handleOptionMode(option, 'work');
                    formatTime(work, setDisplay);
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [isPlaying, work, rest, mode]);
    /*  End of playing or not playing time */

    /* Time display */
    const [display, setDisplay] = useState<string>('00:00');
    useEffect(() => {
        if (mode !== 'work') return;
        formatTime(work, setDisplay);
    }, [work]);
    useEffect(() => {
        if (mode !== 'rest') return;
        formatTime(rest, setDisplay);
    }, [rest]);
    /* End of time display */

    return (
        <section className={cn("w-full h-full",
        "gap-8 p-8",
        "flex flex-col items-center justify-center"
        )}>
            <div className="flex gap-4"> {/* TODO: Passar al header */}
                <Button onClick={() => handleOptionMode("25/5", mode)} variant={'default'}>25/5</Button>
                <Button onClick={() => handleOptionMode("50/10", mode)} variant={'secondary'} className="hover:bg-slate-200">50/10</Button>
            </div>
            <div id="options" className="flex gap-4">
                <Button onClick={() => handleOptionMode(option, "work")} variant={'secondary'} className="hover:bg-slate-200">Work</Button>
                <Button onClick={() => handleOptionMode(option, "rest")} variant={'default'}>Break</Button>
            </div>
            <span className="text-3xl font-bold">{mode === 'work' ? 'Working' : 'Break time !!'}</span>
            <span className="text-8xl font-bold">{display}</span>
            <div id="start-stop-buttons" className="flex gap-2">
                {/* TODO: Donar estils als botons */}
                {isPlaying ? (
                    <Button onClick={handleIsPlaying} variant={'destructive'}>Stop</Button>
                ) : (
                    <Button onClick={handleIsPlaying} variant={'default'}>Start</Button>
                )}
            </div>
        </section>
    )
}

export default Pomodoro;