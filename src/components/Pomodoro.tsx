import { useState } from 'react';

import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import Timer from './Timer';
import Tasks from './Tasks';

/* Mock TODOs */
const mockTasks = [
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Learn Recoil', completed: false },
    { id: 3, text: 'Build a cool app', completed: false },
];



interface PomodoroProps {
    pomodoroTime: number;
    /* setPomodoroTime: Dispatch<SetStateAction<number>>; */
    shortBreakTime: number;
    /* setShortBreakTime: Dispatch<SetStateAction<number>>; */
    longBreakTime: number;
    /* setLongBreakTime: Dispatch<SetStateAction<number>>; */
}

const Pomodoro: React.FC<PomodoroProps> = ({pomodoroTime, shortBreakTime, longBreakTime}) => {
    const [tasks, setTasks] = useState(mockTasks);

    return (
        <section className={cn("flex flex-col justify-center", "w-full h-full", "text-my-red-950")}>
            <div className={cn("gap-x-4 mb-2", "flex items-center justify-center", "")}>
                {/* Timer */}
                <Timer pomodoroTime={pomodoroTime} shortBreakTime={shortBreakTime} longBreakTime={longBreakTime}/>

                {/* <Separator orientation='vertical' className='bg-white' /> */}

                {/* Tasks */}
                <Tasks tasks={tasks} />
            </div>

            <div className={cn("gap-x-4 mt-2", "flex items-center justify-center")}>
                <div className={cn(
                "min-w-[912px] min-h-[240px] max-w-[912px] max-h-[240px]", /* TODO: Adaptar height a la pantalla (nomes si deixo fixes el Timer i el Tasks) */
                "flex flex-col rounded-lg", 
                "bg-white bg-opacity-10"
                )}></div>
            </div>

        </section>
    )
}

export default Pomodoro;