import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';

import { GiTomato } from "react-icons/gi";
import { RiSettings5Fill } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";

const Header = () => {

    
    return (
        <header className={cn(
        "flex",
        "items-center justify-between",
        "my-2",
        "text-my-red-50",
        )}>
            <span className="flex cursor-pointer"> {/* TODO: Redirigir a la pagina de inicio */}
                <GiTomato className="text-2xl mr-1"/>
                <h1 className="text-xl font-semibold">My Pomodoro</h1>
            </span>
            <div className="flex">
                <button className={cn("flex justify-center items-center bg-white bg-opacity-10",
                    "mr-1 p-1 w-12 rounded-sm",
                    )}>
                    <IoStatsChart className="text-lg"/> {/* LATER: PopUp for STATS */}
                </button>
                <button className={cn("flex justify-center items-center bg-white bg-opacity-10",
                    "ml-1 p-1 w-12 rounded-sm",
                    )}>
                    <RiSettings5Fill className="text-xl"/> {/* TODO: PopUp for CONFIG */}
                </button>
            </div>
        </header>
    );
}

export default Header;