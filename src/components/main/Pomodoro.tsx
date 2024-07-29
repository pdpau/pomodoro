import { useState } from 'react';

import { cn } from '@/lib/utils';

import { type TaskType, type TaskId, type TaskText, type FilterValue } from '@/types';
import { TASK_FILTERS } from '@/consts';

import Timer from './timer-section/Timer';
import Tasks from './tasks-section/Tasks';
import Notebook from './Notebook';

/* Mock TODOs */
const mockTasks = [
    { id: "1", text: 'Complete a pomodoro', completed: true }, /* ajksbikauncoancnclkaliclkcmlskvlvnkislovnlzkdnakjcknlneldicmesklksmld fmslivkmslvejfilik */
    { id: "2", text: 'Answer 10 emails', completed: false },
    { id: "3", text: 'Call grandma', completed: false }
];



interface Props {
    pomodoroTime: number;
    shortBreakTime: number;
    longBreakTime: number;
}

const Pomodoro: React.FC<Props> = ({pomodoroTime, shortBreakTime, longBreakTime}) => {

    /* --- Add and remove tasks functions --- */
    const [tasks, setTasks] = useState(mockTasks);
    const handleAddTask = ({ text }: TaskText) => {
        const newTask = {
            id: crypto.randomUUID(),
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
            <div className={cn("gap-x-4 mb-2", "flex items-center justify-center")}>
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
                <Notebook />
            </div>
        </section>
    )
}

export default Pomodoro;