import { useState } from "react";

import { cn } from "@/lib/utils";
import { type TaskType, type TaskId } from "@/types";

import { Separator } from '@/components/ui/separator';

import Task from "./Task";

import { FaPlus } from "react-icons/fa";


interface Props {
    tasks: TaskType[];
    handleAdd: (text: string) => void;
    handleRemove: ({ id }: TaskId) => void;
    handleComplete: ({ id, completed }: Pick<TaskType, 'id' | 'completed' >) => void;
}

const Tasks: React.FC<Props> = ({ tasks, handleAdd, handleRemove, handleComplete }) => {

    /* Handling user input */
    const [userInputText, setUserInputText] = useState<string>('');

    const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUserInputText(event.target.value);
    };
    /* End of handling user input */

    const addTaskAndCleanInput = () => {
        if (userInputText.trim() !== '') {
            handleAdd(userInputText);
            setUserInputText(''); /* Clean the input */
        }
    }

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
                <input type="text"
                    value={userInputText}
                    onChange={handleUserInput}
                    placeholder="Add a task..."
                    className={cn(
                        "mt-0.5 px-2 py-1 h-full w-5/6",
                        "bg-transparent placeholder-my-red-900 text-my-red-950 text-xl font-medium",
                        "focus:outline-none focus:border-none focus:ring-0",
                        "placeholder:translate-y-0.5 placeholder:translate-x-0.5",
                    )} 
                />
                {/* Botó d'afegir task */}
                <button onClick={addTaskAndCleanInput}
                    className={cn(
                        "flex items-center justify-center", /* bg-white per fer proves */
                        "w-8 h-8 rounded-md", 
                        "font-medium text-xl text-my-red-900",
                        "transition duration-300",
                        "hover:scale-105 hover:text-my-red-950" /* hover:bg-my-red-400 */
                )}>
                    <FaPlus />
                </button>
            </div>

            <Separator className="bg-my-red-950"/>

            {/* Tasks list */}
            <div className={cn(
                "flex flex-col h-[220px]",
                "py-1",
                "overflow-y-auto no-scrollbar"
            )}>
                <ul className="">
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <Task 
                                key={task.id}
                                id={task.id}
                                text={task.text}
                                completed={task.completed}
                                handleRemove={handleRemove}
                                handleComplete={handleComplete}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Tasks;