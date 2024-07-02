import { TaskType } from "@/types";


/* interface Props {
    id: number;
    text: string;
    completed: boolean;
} */

const Task: React.FC<TaskType> = ({ id, text, completed }) => {

    return (
        <div className="bg-white">
            <input 
                type="checkbox"
                checked={completed}
                onChange={() => {}}
            />
            <label>{text}</label>
            <button /> {/* ¿¿¿??? */}
        </div>
    );
};

export default Task;