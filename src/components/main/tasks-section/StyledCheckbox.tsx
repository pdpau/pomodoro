
import { type TaskType } from "@/types";

interface StyledCheckboxProps extends TaskType {
    /* handleCheckbox: () => void; */
    handleComplete: ({ id, completed }: Pick<TaskType, 'id' | 'completed' >) => void;
}

const StyledCheckbox: React.FC<StyledCheckboxProps> = ({ id, text, completed, handleComplete }) => {

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        handleComplete({
            id,
            completed: event.target.checked 
        });
    };

    return (
        <div className="checkbox-wrapper-61 relative block overflow-hidden">
            <style>
                {`
                .checkbox-wrapper-61 input[type="checkbox"] {
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    margin: 0;
                    padding: 0;
                    opacity: 0;
                    z-index: 1; /* Ensures input is on top for clicking */
                    cursor: pointer;
                }
                .checkbox-wrapper-61 input[type="checkbox"] + label {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    cursor: pointer;
                }

                .checkbox-wrapper-61 *,
                .checkbox-wrapper-61 ::after,
                .checkbox-wrapper-61 ::before {
                    box-sizing: border-box;
                }

                .checkbox-wrapper-61 .check {
                    width: 40px;
                    height: 40px;
                    position: absolute;
                    opacity: 0;
                }
                .checkbox-wrapper-61 .label svg {
                    vertical-align: middle;
                }
                .checkbox-wrapper-61 .path1 {
                    stroke-dasharray: 350;
                    stroke-dashoffset: 350;
                    transition: 0.5s stroke-dashoffset, 0.5s opacity;
                }
                .checkbox-wrapper-61 .check:checked + label svg g path {
                    stroke-dashoffset: 0;
                    opacity: 1;
                }
                `}
            </style>
            <input
                type="checkbox"
                checked={completed}
                className="check absolute w-10 h-10 opacity-0"
                onChange={handleCheckboxChange}
            />
            <label className="flex items-center justify-center space-x-2 cursor-pointer">
                <svg width="40" height="40" viewBox="0 0 90 90">
                    <rect x="20" y="20" width="45" height="45" stroke="#400f0f" strokeWidth="2.5" fill="none"/>
                    <g transform="translate(0,-940)">
                        <path
                            d="m 50,950 c -75,95 5,7 6,7 12,-4 -50,60 -30,45 95,-65 -5,10 15,3 23,-9 35,-35 18,-4 "
                            stroke="#400f0f"
                            strokeWidth="2.5"
                            fill="none"
                            className={`path1 transition-all duration-500 stroke-dasharray-350 ${completed ? 'stroke-dashoffset-0 opacity-100' : 'stroke-dashoffset-350 opacity-0'}`}
                        />
                    </g>
                </svg>
            </label>
        </div>
    );
};

export default StyledCheckbox;
