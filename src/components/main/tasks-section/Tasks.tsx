import { useState } from "react";

import { cn } from "@/lib/utils";
import { type TaskType, type TaskId, type TaskText, type FilterValue } from "@/types";

import { Separator } from '@/components/ui/separator';

import Task from "./Task";
import TaskFilters from "./TaskFilters";

import { FaPlus } from "react-icons/fa";


interface Props {
    tasks: TaskType[];
    /* Add and remove */
    handleAdd: ({ text }: TaskText) => void;
    handleRemove: ({ id }: TaskId) => void;
    handleComplete: ({ id, completed }: Pick<TaskType, 'id' | 'completed' >) => void;
    /* Filters */
    filterSelected: FilterValue;
    handleFilterChange: (filter: FilterValue) => void;
    /* Background color */
    isRedPalette: boolean;
}

const Tasks: React.FC<Props> = ({ tasks, handleAdd, handleRemove, handleComplete, filterSelected, handleFilterChange, isRedPalette }) => {

    /* --- Handling user input --- */
    const [userInputText, setUserInputText] = useState('');
    const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        setUserInputText(event.target.value);
    };
    /* --- End of handling user input --- */

    /* --- Add task --- */
    const addTaskAndCleanInput = (): void => {
        if (userInputText.trim() !== '') {
            handleAdd({ text: userInputText });
            setUserInputText(''); /* Clean the input */
        }
    }
    const handleInputSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        addTaskAndCleanInput();
    }
    /* --- End of add task --- */

    /* Main div must be the same as Timer */
    return (
        <div className={cn(
            "min-w-[448px] min-h-[260px] max-w-[448px] max-h-[260px]", 
            "flex flex-col rounded-lg", 
            "bg-white bg-opacity-10"
        )}>
            {/* Add task section */}
            <div className={cn(
                "flex items-center justify-between",
                "mx-1 h-10", /* h-[40px] */
                ""
            )}>
                <form onSubmit={handleInputSubmit}>
                    <input type="text"
                        value={userInputText}
                        onChange={handleUserInput}
                        placeholder="Add a task..."
                        className={cn(
                            "mt-0.5 px-2 py-1 h-full w-5/6",
                            "bg-transparent text-xl font-medium", 
                            isRedPalette ? "placeholder-my-red-900 text-my-red-950" : "placeholder-my-green-900 text-my-green-950",
                            "focus:outline-none focus:border-none focus:ring-0",
                            "placeholder:translate-y-0.5 placeholder:translate-x-0.5",
                        )} 
                    />
                </form>
                {/* Botó d'afegir task */}
                <button onClick={addTaskAndCleanInput}
                    className={cn(
                        "flex items-center justify-center",
                        "w-8 h-8 rounded-md", 
                        "font-medium text-xl", isRedPalette ? "text-my-red-900" : "text-my-green-900",
                        "transition duration-300",
                        "hover:scale-105", isRedPalette ? "hover:text-my-red-950" : "hover:text-my-green-950"
                )}>
                    <FaPlus />
                </button>
            </div>

            <Separator className={cn(isRedPalette ? "bg-my-red-950" : "bg-my-green-950")}/>

            {/* Tasks list */}
            <div className={cn(
                "flex flex-col h-[220px]",
                "py-1",
                "overflow-y-auto no-scrollbar"
            )}>
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <Task 
                                key={task.id}
                                id={task.id}
                                text={task.text}
                                completed={task.completed}
                                handleRemove={handleRemove}
                                handleComplete={handleComplete}
                                isRedPalette={isRedPalette}
                            />
                        </li>
                    ))}
                </ul>
            </div>

            <Separator className={cn(isRedPalette ? "bg-my-red-950" : "bg-my-green-950")}/>

            {/* Filters section */}
            <div className={cn(
                "flex items-center justify-between",
                "mx-1 h-[36px]", /* h-[32px] */
                ""
            )}>
                <TaskFilters
                    activeCount={tasks.filter(task => !task.completed).length}
                    completedCount={tasks.filter(task => task.completed).length}
                    filterSelected={filterSelected}
                    onFilterChange={handleFilterChange}
                    isRedPalette={isRedPalette}
                />
                <span className="font-medium text-lg px-2">
                    <strong>{tasks.filter(task => !task.completed).length}</strong> tareas pendientes
                </span>
            </div>
        </div>
    );
};

export default Tasks;