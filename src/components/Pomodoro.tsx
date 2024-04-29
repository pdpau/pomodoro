import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ModeType, PomodoroOptionsType } from '@/types';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const PomodoroOptions = {
    '25/5': {
        work: 3, // in seconds
        rest: 5
    },
    '50/10': {
        work: 50 * 60,
        rest: 10 * 60
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
    /* Options */
    const [option, setOption] = useState<PomodoroOptionsType>('25/5');
    const [work, setWork] = useState<number>(PomodoroOptions[option].work);
    const [rest, setRest] = useState<number>(PomodoroOptions[option].rest);
    const [mode, setMode] = useState<ModeType>('work');
    const handleOption = (newOption: PomodoroOptionsType) => {
        setOption(newOption);
        setWork(PomodoroOptions[newOption].work);
        setRest(PomodoroOptions[newOption].rest);
        setMode('work'); // siempre que se pulsa el boton del modo, empieza un periodo de trabajo
    }
    /* End of options */

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
                    setMode('rest');
                    setRest(PomodoroOptions[option].rest);
                    formatTime(rest, setDisplay); // para que se actualice el display a los minutos antes de empezar la cuenta atras
                }
            } else if (mode === 'rest') {
                setRest(rest => rest - 1);
                if (rest <= 0) {
                    setMode('work');
                    setWork(PomodoroOptions[option].work);
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
            <div id="options" className="flex gap-4"> {/* TODO: Deixar aquest */}
                <Button variant={'secondary'} className="hover:bg-slate-200">Work</Button>
                <Button variant={'default'}>Break</Button>
            </div>
            <div className="flex gap-4"> {/* TODO: Eliminar aquest tipus d'opcions */}
                <Button onClick={() => handleOption("25/5")} variant={'default'}>25/5</Button>
                <Button onClick={() => handleOption("50/10")} variant={'secondary'} className="hover:bg-slate-200">50/10</Button>
            </div>
            <span className="text-3xl font-bold">{mode === 'work' ? 'Working' : 'Break time !!'}</span>
            <span className="text-8xl font-bold">{display}</span>
            <div id="start-stop-buttons" className="flex gap-2">
                {/* TODO: hacer mis botones con mis estilos */}
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