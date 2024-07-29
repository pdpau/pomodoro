import { useState } from 'react';

import { cn } from '@/lib/utils';

import { type TaskType, type TaskId, type TaskText, type FilterValue } from '@/types';
import { TASK_FILTERS } from '@/consts';

import Timer from './timer-section/Timer';
import Tasks from './tasks-section/Tasks';

/* Mock TODOs */
const mockTasks = [
    { id: "1", text: 'Learn React', completed: true }, /* ajksbikauncoancnclkaliclkcmlskvlvnkislovnlzkdnakjcknlneldicmesklksmld fmslivkmslvejfilik */
    { id: "2", text: 'Learn Recoil', completed: false },
    { id: "3", text: 'Build a cool app', completed: false },
    { id: "4", text: 'Learn Tailwind', completed: false },
    { id: "5", text: 'Learn Recoil', completed: false }
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

    /* --- Add and remove tasks functions --- */
    const [tasks, setTasks] = useState(mockTasks);
    const handleAddTask = ({ text }: TaskText) => {
        const newTask = {
            id: crypto.randomUUID(),
            /* id: tasks.length + 1, */
            text,
            completed: false
        };
        console.log(newTask);
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
    /* --- End of add and remove tasks functions --- */

    /* --- Filter task functions --- */
    const [filterSelected, setFilterSelected] = useState<FilterValue>(TASK_FILTERS.ALL); /* Empieza mostrando todos */
    const handleFilterChange = (filter: FilterValue): void => {
        setFilterSelected(filter);
    };
    const filteredTasks = tasks.filter(task => {
        if (filterSelected === TASK_FILTERS.ACTIVE) return !task.completed;
        if (filterSelected === TASK_FILTERS.COMPLETED) return task.completed;
        return task;
    });
    /* --- End of filter task functions --- */


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
                    tasks={filteredTasks}
                    handleAdd={handleAddTask}
                    handleRemove={handleRemoveTask}
                    handleComplete={handleCompleteTask}
                    filterSelected={filterSelected}
                    handleFilterChange={handleFilterChange}
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
                        <p>Que aquesta secció sigui com una llibreta o pissarra</p>
                        <p>Comptador que indiqui quants pomodoros hem completat avui</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Pomodoro;