

import { cn } from "@/lib/utils";
import { type TaskType } from "@/types";

import Task from "./Task";


interface Props {
    tasks: TaskType[];
}

const Tasks: React.FC<Props> = ({ tasks }) => {


    {/* Main div must be the same as Timer */}
    return (
        <div className={cn("min-w-80 min-h-56 max-w-80 max-h-80", 
            "flex flex-col items-center justify-center rounded-lg", 
            "bg-white bg-opacity-10"
        )}>
            <ul className=""> {/* TODO: Styles */}
                {tasks.map((task) => (
                    <li key={task.id}>
                        <Task 
                            key={task.id}
                            id={task.id}
                            text={task.text}
                            completed={task.completed}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;