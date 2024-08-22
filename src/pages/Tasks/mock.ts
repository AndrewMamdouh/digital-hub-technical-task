import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

import { Task } from '@Types';

const createRandomTask = (): Task => ({
    id: uuidv4(),
    name: faker.lorem.words({ min: 2, max: 6 }),
    description: faker.lorem.sentences({ min: 1, max: 5 }),
    status: faker.helpers.arrayElement([
        'Not Started',
        'In Progress',
        'Finished',
    ]),
});

const randomTasks: Task[] = faker.helpers.multiple(createRandomTask, {
    count: 20,
});

export default randomTasks;
