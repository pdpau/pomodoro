import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import Timer from './Timer';


interface PomodoroProps {
    pomodoroTime: number;
    /* setPomodoroTime: Dispatch<SetStateAction<number>>; */
    shortBreakTime: number;
    /* setShortBreakTime: Dispatch<SetStateAction<number>>; */
    longBreakTime: number;
    /* setLongBreakTime: Dispatch<SetStateAction<number>>; */
}

const Pomodoro: React.FC<PomodoroProps> = ({pomodoroTime, shortBreakTime, longBreakTime}) => {

    return (
        <section className={cn("w-full h-full p-8", "flex items-center justify-between", "text-my-red-950")}>
            {/* Timer */}
            <Timer pomodoroTime={pomodoroTime} shortBreakTime={shortBreakTime} longBreakTime={longBreakTime}/>

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