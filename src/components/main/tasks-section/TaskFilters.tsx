
import { cn } from '@/lib/utils';

import { FILTER_BUTTONS } from '@/consts';
import { type FilterValue } from '@/types';

interface Props {
    activeCount: number;
    completedCount: number;
    filterSelected: FilterValue;
    onFilterChange: (filter: FilterValue) => void;
}

const TaskFilters: React.FC<Props> = ({ activeCount, completedCount, filterSelected, onFilterChange }) => {
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
                    const styles = isSelected ? 'text-my-red-950' : 'text-my-red-900';

                    return (
                        <li key={filter} className="rounded-md border-my-red-950">
                            {/* S'ha d'utilitzar inline-block o block amb els elements <a> a tailwind per poder fer un "hover:scale-105" */}
                            <a 
                                href={href}
                                className={cn(
                                    "bg-transparent",
                                    "font-medium text-lg",
                                    "transition duration-300 inline-block",
                                    "hover:scale-105 hover:text-my-red-950",
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