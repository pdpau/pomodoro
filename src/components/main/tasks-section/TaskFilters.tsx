
import { cn } from '@/lib/utils';

import { FILTER_BUTTONS } from '@/consts';
import { type FilterValue } from '@/types';

interface Props {
    activeCount: number;
    completedCount: number;
    filterSelected: FilterValue;
    onFilterChange: (filter: FilterValue) => void;
    /* Background color */
    isRedPalette: boolean;
}

const TaskFilters: React.FC<Props> = ({ activeCount, completedCount, filterSelected, onFilterChange, isRedPalette }) => {
    return (
        <ul className={cn(
            "flex items-center justify-between", 
            "mt-0.5 px-2 w-[150px]",
            "bg-transparent",
            ""
        )}>
            {
                Object.entries(FILTER_BUTTONS).map(([filter, { literal, href }]) => {
                    const isSelected = filter === filterSelected;
                    const styles = isRedPalette ? (isSelected ? 'text-my-red-950' : 'text-my-red-900') : (isSelected ? 'text-my-green-950' : 'text-my-green-900');

                    return (
                        <li key={filter} className={cn("rounded-md", isRedPalette ? "border-my-red-950" : "border-my-green-950")}>
                            {/* S'ha d'utilitzar inline-block o block amb els elements <a> a tailwind per poder fer un "hover:scale-105" */}
                            <a 
                                href={href}
                                className={cn(
                                    "bg-transparent",
                                    "font-medium text-lg",
                                    "transition duration-300 inline-block",
                                    "hover:scale-105", isRedPalette ? "hover:text-my-red-950" : "hover:text-my-green-950",
                                    styles
                                )}
                                onClick={(event) => {
                                    event.preventDefault() 
                                    onFilterChange(filter as FilterValue)
                                }}
                            >
                                {literal}
                            </a>
                        </li>
                    );
                })
            }
        </ul>
    );
};

export default TaskFilters;