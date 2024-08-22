import { TaskStatus } from '@Types';

export const getBadgeSeverity = (status: TaskStatus) => {
    switch (status) {
        case TaskStatus.NOT_STARTED:
            return 'danger';
        case TaskStatus.IN_PROGRESS:
            return 'info';
        default:
            return 'success';
    }
};
