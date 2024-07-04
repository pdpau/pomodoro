import { useState } from "react";

import { cn } from "@/lib/utils";
import { type TaskType, type TaskId } from "@/types";

import StyledCheckbox from "./StyledCheckbox";

import { FaTrashCan } from "react-icons/fa6";



interface Props extends TaskType{
    handleRemove: ({ id }: TaskId) => void;
}

const Task: React.FC<Props> = ({ id, text, completed, handleRemove }) => {

    /* Checkbox functions */
    const [isChecked, setIsChecked] = useState(completed);
    const handleCheckbox = () => {
        setIsChecked(!isChecked);
    }
    /* End of checkbox functions */


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
                    isChecked={isChecked}
                    handleCheckbox={handleCheckbox}
                />
                
                {/* Task TEXT (line-through animació) */}
                <span className={cn(
                        "relative flex items-center text-lg font-medium",
                        `${isChecked ? 'text-my-red-900' : 'text-my-red-950'}`
                    )}
                    style={{ display: "inline-block" }}
                >
                    {text}
                    {/* Span de la linea que tacha */}
                    <span className={cn(
                            "absolute left-0 top-1/2 h-[2px] bg-my-red-900",
                            `${isChecked ? 'w-full' : 'w-0'}`
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
                        "flex items-center justify-center", /* bg-white per fer proves */
                        "w-8 h-8 rounded-md", 
                        "font-medium text-xl text-my-red-900",
                        "transition duration-300",
                        "hover:scale-105 hover:text-my-red-950" /* hover:bg-my-red-400 */
                    )}
                >
                    <FaTrashCan />
                </button>
            </div>
        </div>
    );
};

export default Task;





{/* Task TEXT (line-through cutre) */}
{/* <span className={cn(
        "flex items-center text-lg font-medium",
        "relative h-8 w-[360px]",
        `${isChecked ? 'line-through text-my-red-900' : 'text-my-red-950'}`
    )}
>
    {text}
</span> */}