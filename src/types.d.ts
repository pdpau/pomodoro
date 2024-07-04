export type ModeType = 'work' | 'rest';

export type TaskType = {
    id: number;
    text: string;
    completed: boolean;
};
export type TaskId = Pick<TaskType, 'id'>;
export type TaskText = Pick<TaskType, 'text'>;
export type TaskCompleted = Pick<TaskType, 'completed'>;

