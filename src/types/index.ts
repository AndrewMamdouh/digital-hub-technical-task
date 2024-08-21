export type Task = {
    id: string;
    name: string;
    description: string;
    status: 'Not Started' | 'In Progress' | 'Finished' | null;
};
