export enum TaskStatus {
    NOT_STARTED = 'Not Started',
    IN_PROGRESS = 'In Progress',
    FINISHED = 'Finished',
}

export type Task = {
    id: string;
    name: string;
    description: string;
    status: TaskStatus | null;
};
