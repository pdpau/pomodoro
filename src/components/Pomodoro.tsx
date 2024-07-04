import { useState } from 'react';

import { cn } from '@/lib/utils';

import Timer from './Timer';
import Tasks from './Tasks';

/* Mock TODOs */
const mockTasks = [
    { id: 1, text: 'Learn React', completed: true }, /* ajksbikauncoancnclkaliclkcmlskvlvnkislovnlzkdnakjcknlneldicmesklksmld fmslivkmslvejfilik */
    { id: 2, text: 'Learn Recoil', completed: false },
    { id: 3, text: 'Build a cool app', completed: false },
    { id: 4, text: 'Learn Tailwind', completed: false },
    { id: 5, text: 'Learn Recoil', completed: false },
    { id: 6, text: 'Build a cool app', completed: false },
    { id: 7, text: 'Learn Tailwind', completed: false },
    { id: 8, text: 'Learn Recoil', completed: false },
    { id: 9, text: 'Build a cool app', completed: false },
    { id: 10, text: 'Learn Tailwind', completed: false },
    { id: 11, text: 'Learn Recoil', completed: false },
    { id: 12, text: 'Build a cool app', completed: false },
    { id: 13, text: 'Learn Tailwind', completed: false },
    { id: 14, text: 'Learn Recoil', completed: false },
    { id: 15, text: 'Build a cool app', completed: false },
    { id: 16, text: 'Learn Tailwind', completed: false },
    { id: 17, text: 'Learn Recoil', completed: false },
    { id: 18, text: 'Build a cool app', completed: false },
    { id: 19, text: 'Learn Tailwind', completed: false },
    { id: 20, text: 'Learn Recoil', completed: false },
    { id: 21, text: 'Build a cool app', completed: false },
    { id: 22, text: 'Learn Tailwind', completed: false },
    { id: 23, text: 'Learn Recoil', completed: false },
    { id: 24, text: 'Build a cool app', completed: false },
    { id: 25, text: 'Learn Tailwind', completed: false },
    { id: 26, text: 'Learn Recoil', completed: false },
    { id: 27, text: 'Build a cool app', completed: false },
    { id: 28, text: 'Learn Tailwind', completed: false },
    { id: 29, text: 'Learn Recoil', completed: false },
    { id: 30, text: 'Build a cool app', completed: false }
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
    
    /* Tasks functions */
    const [tasks, setTasks] = useState(mockTasks);

    const handleRemoveTask = (id: number) => {
        /* Remove task from tasks */
        const newTasks = tasks.filter(task => task.id !== id);
        setTasks(newTasks);
    }

    /* End of tasks functions */

    return (
        <section className={cn("flex flex-col justify-center", "w-full h-full", "text-my-red-950")}>
            <div className={cn("gap-x-4 mb-2", "flex items-center justify-center", "")}>
                {/* Timer */}
                <Timer
                    pomodoroTime={pomodoroTime}
                    shortBreakTime={shortBreakTime}
                    longBreakTime={longBreakTime}
                />
                {/* Tasks */}
                <Tasks
                    tasks={tasks}
                    handleRemove={handleRemoveTask}
                />
            </div>
            <div className={cn("gap-x-4 mt-2", "flex items-center justify-center")}>
                {/* Extra section */}
                <div className={cn(
                "min-w-[912px] min-h-[240px] max-w-[912px] max-h-[240px]", /* TODO: Adaptar height a la pantalla (nomes si deixo fixes el Timer i el Tasks) */
                "flex flex-col rounded-lg", 
                "bg-white bg-opacity-10"
                )}>
                    <div className="m-2">
                        <h1 className="font-bold">Next steps</h1>
                        <p>Line through</p>
                        <p>Seguir amb el video de Midu</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Pomodoro;