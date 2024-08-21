import { useLocalStorage } from 'usehooks-ts';
import { DataTable } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { Formik, Form, ErrorMessage } from 'formik';
import { MainLayout } from '@Layouts';
import { Button, InputText, InputTextarea } from '@UI';
import { Badge } from 'primereact/badge';
import { Dropdown } from 'primereact/dropdown';
import {
    DotsThree,
    Trash,
    Pen,
    X,
    DotsThreeVertical,
    Plus,
} from '@phosphor-icons/react';
import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '@Types';

import validationSchema from './data';
import randomTasks from './mock';

import {
    getBaseClassNames,
    getSizeClassNames,
    getVariantClassNames,
} from '@/UI/Button/utils';

const TaskStatusTag = ({ status }: { status: Task['status'] }) => (
    <Badge
        severity={
            status === 'In Progress'
                ? 'info'
                : status === 'Not Started'
                  ? 'danger'
                  : 'success'
        }
        value={status}
    />
);

const TaskStatusFilter = (options: ColumnFilterElementTemplateOptions) => {
    return (
        <Dropdown
            value={options.value}
            options={['Not Started', 'In Progress', 'Finished']}
            onChange={(e) => options.filterApplyCallback(e.value)}
            itemTemplate={(option) => <TaskStatusTag status={option} />}
            placeholder="Select Status"
            showClear
        />
    );
};

const taskStatuses = [
    { label: 'Not Started', value: 'Not Started' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Finished', value: 'Finished' },
];

const Tasks = () => {
    const [tasks, setTasks] = useLocalStorage('digital-hub-tasks', randomTasks);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    useEffect(() => {
        if (!tasks?.length)
            localStorage.setItem(
                'digital-hub-tasks',
                JSON.stringify(randomTasks)
            );
    }, []);

    const TaskActionBody = (data: Task) => {
        return (
            <Button
                variant="ghost"
                size="sm"
                menu={[
                    {
                        label: 'Edit',
                        icon: (
                            <Pen
                                size="1.5rem"
                                className="text-secondary"
                                weight="fill"
                            />
                        ),
                        command: () => {
                            setSelectedTask(data);
                            setShowEditModal(true);
                        },
                    },
                    {
                        label: 'Remove',
                        icon: (
                            <Trash
                                size="1.5rem"
                                className="text-red-600"
                                weight="fill"
                            />
                        ),
                        command: () => {
                            setSelectedTask(data);
                            setShowRemoveModal(true);
                        },
                    },
                ]}
                menuProps={{
                    pt: {
                        root: { className: /*tw*/ 'max-w-40' },
                    },
                }}
                iconOnly
            >
                <DotsThree size="1.5rem" weight="bold" />
            </Button>
        );
    };

    const taskAddHandler = (task: Task) => {
        setTasks((prevTasks) => [task, ...prevTasks]);
        setShowAddModal(false);
    };

    const taskEditHandler = (task: Task) => {
        setTasks((prevTasks) =>
            prevTasks.map((prevTask) =>
                prevTask.id === task.id ? task : prevTask
            )
        );
        setShowEditModal(false);
    };

    const taskRemoveHandler = (task: Task) => {
        setTasks((prevTasks) => prevTasks.filter(({ id }) => id !== task.id));
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
            <div className="inline-block min-w-full overflow-hidden rounded-lg align-middle">
                <DataTable
                    value={tasks}
                    paginator
                    rows={8}
                    tableClassName="min-w-full max-w-max"
                    filterDisplay="row"
                    emptyMessage="No tasks found."
                >
                    <Column
                        field="name"
                        header="Name"
                        headerClassName="text-sm font-bold whitespace-nowrap"
                        bodyClassName="text-secondary text-sm font-normal whitespace-nowrap"
                        sortable
                        filter
                    />
                    <Column
                        field="description"
                        header="Description"
                        headerClassName="text-sm font-bold whitespace-nowrap"
                        bodyClassName="text-secondary text-sm font-normal"
                        sortable
                        filter
                    />
                    <Column
                        field="status"
                        header="Status"
                        headerClassName="text-sm font-bold whitespace-nowrap"
                        bodyClassName="text-secondary text-sm font-normal whitespace-nowrap"
                        align="center"
                        body={TaskStatusTag}
                        sortable
                        filter
                        filterElement={TaskStatusFilter}
                    />
                    <Column
                        header="Action"
                        headerClassName="text-sm font-bold whitespace-nowrap"
                        bodyClassName="text-secondary text-sm font-normal whitespace-nowrap"
                        body={TaskActionBody}
                    />
                </DataTable>
            </div>
            <Dialog
                header={
                    <h3 className="text-xl font-bold text-secondary">
                        Add Task
                    </h3>
                }
                closeIcon={<X size="1.5rem" />}
                className="mx-6 max-w-xl flex-1 basis-96"
                contentClassName="scrollbar-thin"
                visible={showAddModal}
                onHide={() => setShowAddModal(false)}
                draggable={false}
                resizable={false}
                pt={{
                    header: {
                        className:
                            /*tw*/ 'p-6 border-b border-solid border-[#d1d5db] gap-x-12',
                    },
                    closeButton: {
                        className: /*tw*/ `${getBaseClassNames(false)} ${getSizeClassNames('sm', true)} ${getVariantClassNames('ghost')} w-auto h-auto`,
                    },
                    content: {
                        className: /*tw*/ 'p-0',
                    },
                }}
            >
                <Formik
                    initialValues={{
                        id: uuidv4(),
                        name: '',
                        description: '',
                        status: null,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={taskAddHandler}
                >
                    {({ values, handleChange, setFieldValue }) => (
                        <Form>
                            <div className="flex flex-col items-stretch justify-start gap-y-4 p-6">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm">Name</label>
                                    <InputText
                                        className="w-full"
                                        placeholder="Enter task name"
                                        name="name"
                                        values={values}
                                        onChange={handleChange}
                                    />
                                    <ErrorMessage name="name" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm">
                                        Description
                                    </label>
                                    <InputTextarea
                                        className="w-full"
                                        placeholder="Enter task description"
                                        name="description"
                                        values={values}
                                        onChange={handleChange}
                                    />
                                    <ErrorMessage name="description" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm">Status</label>
                                    <Dropdown
                                        name="status"
                                        value={values.status}
                                        onChange={(e) =>
                                            setFieldValue('status', e.value)
                                        }
                                        options={taskStatuses}
                                        optionLabel="label"
                                        optionValue="value"
                                        placeholder="Choose task status"
                                        pt={{
                                            root: {
                                                className:
                                                    'hover:border-secondary focus:border-secondary focus:ring-2 focus:ring-secondary/40 shadow-none',
                                            },
                                            input: {
                                                className:
                                                    'py-1.5 px-2 text-sm text-secondary',
                                            },
                                            trigger: {
                                                className:
                                                    'text-secondary-light w-auto py-1.5 px-2',
                                            },
                                            item: {
                                                className:
                                                    'text-secondary aria-selected:bg-primary-light p-2',
                                            },
                                            list: {
                                                className: 'py-2',
                                            },
                                        }}
                                    />
                                    <ErrorMessage name="status" />
                                </div>
                            </div>
                            <div className="flex gap-x-6 border-t border-solid border-[#d1d5db] p-6">
                                <Button
                                    size="lg"
                                    fullWidth
                                    onClick={() => setShowAddModal(false)}
                                    variant="outlined"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" size="lg" fullWidth>
                                    Add
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Dialog>
            <Dialog
                header={
                    <h3 className="text-xl font-bold text-secondary">
                        Edit Task
                    </h3>
                }
                closeIcon={<X size="1.5rem" />}
                className="mx-6 max-w-xl flex-1 basis-96"
                contentClassName="scrollbar-thin"
                visible={showEditModal && !!selectedTask}
                onHide={() => setShowEditModal(false)}
                draggable={false}
                resizable={false}
                pt={{
                    header: {
                        className:
                            /*tw*/ 'p-6 border-b border-solid border-[#d1d5db] gap-x-12',
                    },
                    closeButton: {
                        className: /*tw*/ `${getBaseClassNames(false)} ${getSizeClassNames('sm', true)} ${getVariantClassNames('ghost')} w-auto h-auto`,
                    },
                    content: {
                        className: /*tw*/ 'p-0',
                    },
                }}
            >
                <Formik
                    initialValues={selectedTask!}
                    validationSchema={validationSchema}
                    onSubmit={taskEditHandler}
                >
                    {({ values, handleChange, setFieldValue }) => (
                        <Form>
                            <div className="flex flex-col items-stretch justify-start gap-y-4 p-6">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm">Name</label>
                                    <InputText
                                        className="w-full"
                                        placeholder="Enter task name"
                                        name="name"
                                        values={values}
                                        onChange={handleChange}
                                    />
                                    <ErrorMessage name="name" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm">
                                        Description
                                    </label>
                                    <InputTextarea
                                        className="w-full"
                                        placeholder="Enter task description"
                                        name="description"
                                        values={values}
                                        onChange={handleChange}
                                    />
                                    <ErrorMessage name="description" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm">Status</label>
                                    <Dropdown
                                        name="status"
                                        value={values.status}
                                        onChange={(e) =>
                                            setFieldValue('status', e.value)
                                        }
                                        options={taskStatuses}
                                        optionLabel="label"
                                        optionValue="value"
                                        placeholder="Choose task status"
                                        pt={{
                                            root: {
                                                className:
                                                    'hover:border-secondary focus:border-secondary focus:ring-2 focus:ring-secondary/40 shadow-none',
                                            },
                                            input: {
                                                className:
                                                    'py-1.5 px-2 text-sm text-secondary',
                                            },
                                            trigger: {
                                                className:
                                                    'text-secondary-light w-auto py-1.5 px-2',
                                            },
                                            item: {
                                                className:
                                                    'text-secondary aria-selected:bg-primary-light p-2',
                                            },
                                            list: {
                                                className: 'py-2',
                                            },
                                        }}
                                    />
                                    <ErrorMessage name="status" />
                                </div>
                            </div>
                            <div className="flex gap-x-6 border-t border-solid border-[#d1d5db] p-6">
                                <Button
                                    size="lg"
                                    fullWidth
                                    onClick={() => setShowEditModal(false)}
                                    variant="outlined"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" size="lg" fullWidth>
                                    Update
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Dialog>
            <Dialog
                header={
                    <h3 className="text-xl font-bold text-secondary">
                        Remove Task
                    </h3>
                }
                closeIcon={<X size="1.5rem" />}
                className="mx-6 max-w-xl flex-1 basis-96"
                visible={showRemoveModal && !!selectedTask}
                onHide={() => setShowRemoveModal(false)}
                draggable={false}
                resizable={false}
                pt={{
                    header: {
                        className:
                            /*tw*/ 'p-6 border-b border-solid border-[#d1d5db] gap-x-12',
                    },
                    closeButton: {
                        className: /*tw*/ `${getBaseClassNames(false)} ${getSizeClassNames('sm', true)} ${getVariantClassNames('ghost')} w-auto h-auto`,
                    },
                    content: {
                        className: /*tw*/ 'p-0',
                    },
                }}
            >
                <p className="p-6">
                    Are you sure you want to remove{' '}
                    <span className="font-semibold">
                        "{selectedTask?.name}"
                    </span>{' '}
                    task?
                </p>
                <div className="flex gap-x-6 border-t border-solid border-[#d1d5db] p-6">
                    <Button
                        size="lg"
                        fullWidth
                        onClick={() => setShowRemoveModal(false)}
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => taskRemoveHandler(selectedTask!)}
                        variant="ghost"
                        className="bg-red-500 hover:bg-red-600 hover:text-white focus:ring-2 focus:ring-red-600/50"
                        size="lg"
                        fullWidth
                    >
                        Remove
                    </Button>
                </div>
            </Dialog>
        </MainLayout>
    );
};

export default Tasks;
