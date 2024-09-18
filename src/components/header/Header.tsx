import { Dispatch, SetStateAction, useState } from 'react';

import { cn } from "@/lib/utils";

import { GiTomato } from "react-icons/gi";
import { RiSettings5Fill } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";

import Settings from "./Settings";

interface HeaderProps {
    /* Timer */
    pomodoroTime: number;
    setPomodoroTime: Dispatch<SetStateAction<number>>;
    shortBreakTime: number;
    setShortBreakTime: Dispatch<SetStateAction<number>>;
    longBreakTime: number;
    setLongBreakTime: Dispatch<SetStateAction<number>>;
    /* Completed pomodoros */
    completedPomodoros: number;

    handleSaveButton: (pom: number, short: number, long: number) => void;
    isRedPalette: boolean;
}

const Header: React.FC<HeaderProps> = ({ pomodoroTime, setPomodoroTime, shortBreakTime, setShortBreakTime, longBreakTime, setLongBreakTime, completedPomodoros, handleSaveButton, isRedPalette }) => {    

    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const handleConfig = () => {
        setIsConfigOpen(!isConfigOpen);
    }
    const auxHandleSaveButton = (pom: number, short: number, long: number) => {
        handleSaveButton(pom, short, long);
        handleConfig();
    }


    return (
        <header className={cn(
            "flex items-center justify-between",
            isRedPalette ? "text-my-red-950" : "text-my-green-950",
        )}>
            {/* Logo */}
            <span className="flex cursor-pointer"> {/* TODO: Redirigir a la pagina de inicio */}
                <GiTomato className="text-2xl mr-1"/>
                <h1 className="text-2xl font-schoolbell">My Pomodoro</h1>
            </span>

            {/* Completed pomodoros */}
            <span className="flex items-center justify-center">
                {/* TODO: Revisar els estils i si això realment ha de colocar-se aqui */}
                <p className="text-xl font-medium mt-[6px] mr-4">You have completed <strong>{completedPomodoros}</strong> pomodoros today</p>
            </span>

            {/* Stats and Settings */}
            <div className="flex">
                <button className={cn("flex justify-center items-center bg-white bg-opacity-10", "mr-1 p-1 w-14 rounded-sm")}>
                    <IoStatsChart className="text-xl"/> {/* LATER: PopUp for STATS */}
                </button>
                <button onClick={handleConfig} className={cn("flex justify-center items-center bg-white bg-opacity-10", "ml-1 p-1 w-14 rounded-sm")}>
                    <RiSettings5Fill className="text-2xl"/>
                </button>
            </div>

            {/* Config PopUp */}
            {isConfigOpen && (
                <Settings 
                    isConfigOpen={isConfigOpen}
                    handleConfig={handleConfig}
                    auxHandleSaveButton={auxHandleSaveButton}
                    pomodoroTime={pomodoroTime}
                    setPomodoroTime={setPomodoroTime}
                    shortBreakTime={shortBreakTime}
                    setShortBreakTime={setShortBreakTime}
                    longBreakTime={longBreakTime}
                    setLongBreakTime={setLongBreakTime}
                />
            )}
        </header>
    );
}

export default Header;