import { DotsThreeVertical, Plus } from '@phosphor-icons/react';
import { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { useAuth } from '@clerk/clerk-react';
import { ProgressSpinner } from 'primereact/progressspinner';

import { Button } from '@UI';
import { Task } from '@Types';
import { MainLayout } from '@Layouts';

import { Table, Dialog } from './components';
import randomTasks from './mockData';

const Tasks = () => {
    const { userId } = useAuth();
    const [tasks, setTasks] = useLocalStorage<Record<string, Task[]> | Task[]>(
        'digital-hub-tasks',
        randomTasks
    );
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task>();

    useEffect(() => {
        if (userId) {
            const localStorageTasks: Record<string, Task[]> = JSON.parse(
                localStorage.getItem('digital-hub-tasks') ?? '{}'
            );
            if (!localStorageTasks[userId])
                localStorage.setItem(
                    'digital-hub-tasks',
                    JSON.stringify({
                        ...localStorageTasks,
                        [userId]: randomTasks,
                    })
                );
        }
    }, [userId]);

    if (!userId) return <ProgressSpinner />;

    const onEdit = useCallback((task: Task) => {
        setSelectedTask(task);
        setShowEditModal(true);
    }, []);

    const onRemove = useCallback((task: Task) => {
        setSelectedTask(task);
        setShowRemoveModal(true);
    }, []);

    const taskAddHandler = (task: Task) => {
        setTasks((prevTasks) =>
            Array.isArray(prevTasks)
                ? [task, ...prevTasks]
                : {
                      ...prevTasks,
                      [userId]: [task, ...prevTasks[userId]],
                  }
        );
        setShowAddModal(false);
    };

    const taskEditHandler = (task: Task) => {
        setTasks((prevTasks) =>
            Array.isArray(prevTasks)
                ? prevTasks.map((prevTask) =>
                      prevTask.id === task.id ? task : prevTask
                  )
                : {
                      ...prevTasks,
                      [userId]: prevTasks[userId].map((prevTask) =>
                          prevTask.id === task.id ? task : prevTask
                      ),
                  }
        );
        setShowEditModal(false);
    };

    const taskRemoveHandler = (task: Task) => {
        setTasks((prevTasks) =>
            Array.isArray(prevTasks)
                ? prevTasks.filter(({ id }) => id !== task.id)
                : {
                      ...prevTasks,
                      [userId]: prevTasks[userId].filter(
                          ({ id }) => id !== task.id
                      ),
                  }
        );
        setShowRemoveModal(false);
    };

    return (
        <MainLayout>
            <div className="flex items-center justify-between gap-x-12">
                <h2 className="mb-8 text-4xl font-bold">My Tasks</h2>
                <Button
                    variant="outlined"
                    menu={[
                        {
                            label: 'Add',
                            icon: (
                                <Plus
                                    size="1.5rem"
                                    className="text-secondary"
                                />
                            ),
                            command: () => setShowAddModal(true),
                        },
                    ]}
                    menuProps={{
                        pt: {
                            root: { className: /*tw*/ 'max-w-40' },
                        },
                    }}
                    iconOnly
                >
                    <DotsThreeVertical size="1.5rem" weight="bold" />
                </Button>
            </div>
            <Table
                tasks={Array.isArray(tasks) ? tasks : tasks[userId]}
                onEdit={onEdit}
                onRemove={onRemove}
            />
            <Dialog
                type="add"
                showModal={showAddModal}
                setShowModal={setShowAddModal}
                onSubmit={taskAddHandler}
            />
            <Dialog
                type="edit"
                task={selectedTask}
                showModal={showEditModal}
                setShowModal={setShowEditModal}
                onSubmit={taskEditHandler}
            />
            <Dialog
                type="remove"
                task={selectedTask}
                showModal={showRemoveModal}
                setShowModal={setShowRemoveModal}
                onSubmit={taskRemoveHandler}
            />
        </MainLayout>
    );
};

export default Tasks;
