import { TASK_FILTERS } from './consts';


export type ModeType = 'work' | 'rest';

export type TaskType = {
    id: string;
    text: string;
    completed: boolean;
};
export type TaskId = Pick<TaskType, 'id'>;
export type TaskText = Pick<TaskType, 'text'>;
export type TaskCompleted = Pick<TaskType, 'completed'>;

export type FilterValue = typeof TASK_FILTERS[keyof typeof TASK_FILTERS];