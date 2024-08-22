import { Dialog as PrimeDialog } from 'primereact/dialog';
import { Dispatch, SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { X } from '@phosphor-icons/react';
import { ErrorMessage, Form, Formik } from 'formik';
import { Dropdown } from 'primereact/dropdown';

import { Button, InputText, InputTextarea } from '@UI';
import { Task, TaskStatus } from '@Types';
import {
    getBaseClassNames,
    getSizeClassNames,
    getVariantClassNames,
} from '@/UI/Button/utils';

import validationSchema from './data';

export type DialogProps = {
    type: 'add' | 'edit' | 'remove';
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    task?: Task;
    onSubmit: (values: Task) => void;
};

const Dialog = ({
    type,
    showModal,
    setShowModal,
    task,
    onSubmit,
}: DialogProps) => {
    const isRemoveDialog = type === 'remove';
    return isRemoveDialog ? (
        <PrimeDialog
            header={
                <h3 className="text-xl font-bold text-secondary">
                    Remove Task
                </h3>
            }
            closeIcon={<X size="1.5rem" />}
            className="mx-6 max-w-xl flex-1 basis-96"
            visible={showModal && !!task}
            onHide={() => setShowModal(false)}
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
                <span className="font-semibold">"{task?.name}"</span> task?
            </p>
            <div className="flex gap-x-6 border-t border-solid border-[#d1d5db] p-6">
                <Button
                    size="lg"
                    fullWidth
                    onClick={() => setShowModal(false)}
                    variant="outlined"
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => task && onSubmit(task)}
                    variant="ghost"
                    className="bg-red-500 hover:bg-red-600 hover:text-white focus:ring-2 focus:ring-red-600/50"
                    size="lg"
                    fullWidth
                >
                    Remove
                </Button>
            </div>
        </PrimeDialog>
    ) : (
        <PrimeDialog
            header={
                <h3 className="text-xl font-bold text-secondary">Add Task</h3>
            }
            closeIcon={<X size="1.5rem" />}
            className="mx-6 max-w-xl flex-1 basis-96"
            contentClassName="scrollbar-thin"
            visible={showModal}
            onHide={() => setShowModal(false)}
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
                initialValues={
                    task ?? {
                        id: uuidv4(),
                        name: '',
                        description: '',
                        status: null,
                    }
                }
                validationSchema={validationSchema}
                onSubmit={onSubmit}
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
                                <label className="text-sm">Description</label>
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
                                    options={Object.values(TaskStatus)}
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
                                onClick={() => setShowModal(false)}
                                variant="outlined"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" size="lg" fullWidth>
                                {task ? 'Update' : 'Add'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </PrimeDialog>
    );
};

export default Dialog;
