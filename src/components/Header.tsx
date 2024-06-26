import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Dialog, DialogOverlay, DialogContent } from '@/components/ui/dialog';

import { GiTomato } from "react-icons/gi";
import { RiSettings5Fill } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import { MdOutlineTimer } from "react-icons/md";

const Header = () => {
    const [isConfigOpen, setIsConfigOpen] = useState(false);

    const handleConfig = () => {
        setIsConfigOpen(!isConfigOpen);
    }

    /* --- Timer values (user input) --- */
    const [pomodoroTimerValue, setPomodoroTimerValue] = useState(25);
    const handlePomodoroTimerValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPomodoroTimerValue(Number(e.target.value));
    }
    const [shortBreakTimerValue, setShortBreakTimerValue] = useState(5);
    const handleShortBreakTimerValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShortBreakTimerValue(Number(e.target.value));
    }
    const [longBreakTimerValue, setLongBreakTimerValue] = useState(10);
    const handleLongBreakTimerValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLongBreakTimerValue(Number(e.target.value));
    }

    const handleQuickButtonTimerValue = (pomodoro: number, shortBreak: number, longBreak: number) => () => {
        setPomodoroTimerValue(pomodoro);
        setShortBreakTimerValue(shortBreak);
        setLongBreakTimerValue(longBreak);
    }

    /* --- End of timer values (user input) --- */

    return (
        <header className={cn(
        "flex",
        "items-center justify-between",
        "my-2",
        "text-my-red-50",
        )}>
            <span className="flex cursor-pointer"> {/* TODO: Redirigir a la pagina de inicio */}
                <GiTomato className="text-2xl mr-1"/>
                <h1 className="text-xl font-schoolbell">My Pomodoro</h1>
            </span>
            <div className="flex">
                <button className={cn("flex justify-center items-center bg-white bg-opacity-10", "mr-1 p-1 w-12 rounded-sm")}>
                    <IoStatsChart className="text-lg"/> {/* LATER: PopUp for STATS */}
                </button>
                <button onClick={handleConfig} className={cn("flex justify-center items-center bg-white bg-opacity-10", "ml-1 p-1 w-12 rounded-sm")}>
                    <RiSettings5Fill className="text-xl"/>
                </button>
            </div>

            {/* Config PopUp */}
            {isConfigOpen && (
                <Dialog open={Boolean(isConfigOpen)} onOpenChange={handleConfig} >
                <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" /> {/* REVIEW: Lo del scrollbar */}
                <DialogContent className="bg-my-red-50 rounded-lg overflow-hidden shadow-lg max-w-sm w-full max-h-[calc(100vh-2rem)] overflow-y-auto no-scrollbar">
                    {/* TODO: ... */}
                    <div>
                        {/* Title */}
                        <div className="flex justify-center items-center border-b border-black pb-1">
                            <h2 className="text-md text-black font-playfair font-black">SETTINGS</h2>
                        </div>
                        {/* Content */}
                        <div>
                            {/* --- Timer --- */} {/* TODO: ... */}
                            <div className="flex-col py-2">
                                <div className="flex justify-center items-center pb-1">
                                    {/* <MdOutlineTimer className="text-xl" /> */}
                                    <h3 className="text-sm text-black font-playfair font-bold border-b border-black">TIMER</h3>
                                </div>
                                {/* Timer values */}
                                <div className="flex justify-between">
                                    {/* Pomodoro time */}
                                    <div className="flex flex-col justify-center items-center">
                                        <label htmlFor="pomodoro" className="text-[10px] text-black font-playfair">POMODORO</label>
                                        <input type="number" id="pomodoro" 
                                            value={pomodoroTimerValue} min={0} max={60} onChange={handlePomodoroTimerValue} 
                                            className="w-20 h-8 p-1 rounded-sm bg-slate-200" 
                                        />
                                    </div>
                                    {/* Short Break time */}
                                    <div className="flex flex-col justify-center items-center">
                                        <label htmlFor="short-break" className="text-[10px] text-black font-playfair">SHORT BREAK</label>
                                        <input type="number" id="short-break" 
                                            value={shortBreakTimerValue} min={0} max={60} onChange={handleShortBreakTimerValue}
                                            className="w-20 h-8 p-1 rounded-sm bg-slate-200" 
                                        />
                                    </div>
                                    {/* Long Break time */}
                                    <div className="flex flex-col justify-center items-center">
                                        <label htmlFor="long-break" className="text-[10px] text-black font-playfair">LONG BREAK</label>
                                        <input type="number" id="long-break" 
                                            value={longBreakTimerValue} min={0} max={60} onChange={handleLongBreakTimerValue}
                                            className="w-20 h-8 p-1 rounded-sm bg-slate-200" 
                                        />
                                    </div>
                                </div>
                                {/* Quick buttons */}
                                {/* TODO: Canviar els estils de tots els botons (fer-ne uns per dins de config i uns altres per la pagina prncipal) */}
                                <div className="flex justify-evenly mt-4">
                                    <Button variant={'default'} onClick={handleQuickButtonTimerValue(25, 5, 0)}>25/5</Button>
                                    <Button variant={'secondary'} onClick={handleQuickButtonTimerValue(50, 10, 0)}>50/10</Button>
                                </div>
                            </div>
                        </div>
                        {/* Footer */}
                        <div className="flex justify-end border-t border-black pt-4">
                            {/* TODO: ... */}
                            <Button onClick={handleConfig} variant={'default'}>Save</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            )}
        </header>
    );
}

export default Header;