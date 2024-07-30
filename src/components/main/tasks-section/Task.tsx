

import { cn } from "@/lib/utils";
import { type TaskType, type TaskId } from "@/types";

import StyledCheckbox from "./StyledCheckbox";

import { FaTrashCan } from "react-icons/fa6";



interface Props extends TaskType {
    /* Task */
    handleRemove: ({ id }: TaskId) => void;
    handleComplete: ({ id, completed }: Pick<TaskType, 'id' | 'completed' >) => void;
    /* Background color */
    isRedPalette: boolean;
}

const Task: React.FC<Props> = ({ id, text, completed, handleRemove, handleComplete, isRedPalette }) => {


    /* TODO: Gestionar les tasques amb un text massa llarg */
    /* (solució: posar un maxim de caracters o anar fent la lletra mes petita segons el numero de caracters també amb un límit) */
    return (
        <div className={cn(
            "flex items-center justify-between",
            "h-8 mx-1" /* h-[32px] */
        )}>
            <div className="flex items-center gap-x-1 mx-0.5">
                {/* Task CHECKBOX */}
                <StyledCheckbox
                    key={id}
                    id={id}
                    text={text}
                    completed={completed}
                    handleComplete={handleComplete}
                />

                {/* Task TEXT (line-through animació) */}
                <span className={cn(
                        "relative flex items-center text-lg font-medium",
                        isRedPalette ? `${completed ? 'text-my-red-900' : 'text-my-red-950'}` : `${completed ? 'text-my-green-900' : 'text-my-green-950'}`,
                    )}
                    style={{ display: "inline-block" }}
                >
                    {text}
                    {/* Span de la linea que tacha */}
                    <span className={cn(
                            "absolute left-0 top-1/2 h-[2px]",
                            isRedPalette ? "bg-my-red-900" : "bg-my-green-900",
                            `${completed ? 'w-full' : 'w-0'}`
                        )}
                        style={{
                            transition: 'width 0.5s ease, top 0.5s ease',
                            transform: 'translateY(-50%)'
                        }}
                    />
                </span>
            </div>
            <div>
                <button onClick={() => handleRemove({ id })}
                    className={cn(
                        "flex items-center justify-center",
                        "w-8 h-8 rounded-md", 
                        "font-medium text-xl", isRedPalette ? "text-my-red-900" : "text-my-green-900",
                        "transition duration-300",
                        "hover:scale-105", isRedPalette ? "hover:text-my-red-950" : "hover:text-my-green-950"
                    )}
                >
                    <FaTrashCan />
                </button>
            </div>
        </div>
    );
};

export default Task;