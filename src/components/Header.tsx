import { Dispatch, SetStateAction, useState } from 'react';

import { cn } from "@/lib/utils";

import { GiTomato } from "react-icons/gi";
import { RiSettings5Fill } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";

import Settings from "./Settings";

interface HeaderProps {
    pomodoroTime: number;
    setPomodoroTime: Dispatch<SetStateAction<number>>;
    shortBreakTime: number;
    setShortBreakTime: Dispatch<SetStateAction<number>>;
    longBreakTime: number;
    setLongBreakTime: Dispatch<SetStateAction<number>>;
    handleSaveButton: (pom: number, short: number, long: number) => void;
}

const Header: React.FC<HeaderProps> = ({pomodoroTime, setPomodoroTime, shortBreakTime, setShortBreakTime, longBreakTime, setLongBreakTime, handleSaveButton}) => {    

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
        "h-8 my-2",
        "text-my-red-950",
        )}> {/* REVIEW: ¿¿text-my-red-950 or text-my-red-50?? */}
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