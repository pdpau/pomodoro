import { useState } from 'react';

import { cn } from '@/lib/utils';

import { type TaskType, type TaskId } from '@/types';

import Timer from './timer-section/Timer';
import Tasks from './tasks-section/Tasks';

/* Mock TODOs */
const mockTasks = [
    { id: 1, text: 'Learn React', completed: true }, /* ajksbikauncoancnclkaliclkcmlskvlvnkislovnlzkdnakjcknlneldicmesklksmld fmslivkmslvejfilik */
    { id: 2, text: 'Learn Recoil', completed: false },
    { id: 3, text: 'Build a cool app', completed: false },
    { id: 4, text: 'Learn Tailwind', completed: false },
    { id: 5, text: 'Learn Recoil', completed: false }
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

    const handleAddTask = (text: string) => {
        const newTask = {
            id: tasks.length + 1,
            text,
            completed: false
        };
        setTasks([...tasks, newTask]);
    };
    const handleRemoveTask = ({ id }: TaskId) => {
        const newTasks = tasks.filter(task => task.id !== id);
        setTasks(newTasks);
    };
    const handleCompleteTask = ({ id, completed }: Pick<TaskType, 'id' | 'completed' >) => {
        const newTasks = tasks.map(task => {
            if (task.id === id) {
                return {
                    ...task,
                    completed
                }
            }
            return task;
        });
        setTasks(newTasks);
    };
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
                    handleAdd={handleAddTask}
                    handleRemove={handleRemoveTask}
                    handleComplete={handleCompleteTask}
                />
            </div>
            <div className={cn("gap-x-4 mt-2", "flex items-center justify-center")}>
                {/* EXTRA SECTION (¿textarea for notes?) */}
                <div className={cn(
                "min-w-[912px] min-h-[240px] max-w-[912px] max-h-[240px]", /* TODO: Adaptar height a la pantalla (nomes si deixo fixes el Timer i el Tasks) */
                "flex flex-col rounded-lg", 
                "bg-white bg-opacity-10"
                )}>
                    <div className="m-2">
                        <h1 className="font-bold">Next steps</h1>
                        <p>Seguir amb el video de Midu (53:15)</p>
                        <p>Afegir una forma de filtrar</p>
                        <p>Que aquesta secció sigui com una llibreta o pissarra</p>
                        <p>Comptador que indiqui quants pomodoros hem completat avui</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Pomodoro;