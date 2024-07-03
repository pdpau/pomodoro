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
        <section className={cn("w-full h-full gap-x-4", "flex items-center justify-center", "text-my-red-950")}>
            {/* Timer */}
            <Timer pomodoroTime={pomodoroTime} shortBreakTime={shortBreakTime} longBreakTime={longBreakTime}/>

            {/* <Separator orientation='vertical' className='bg-white' /> */}

            {/* Tasks */}
            <Tasks tasks={tasks} />

        </section>
    )
}

export default Pomodoro;