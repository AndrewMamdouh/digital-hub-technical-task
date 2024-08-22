import { DataTable } from 'primereact/datatable';
import {
    Column,
    ColumnBodyOptions,
    ColumnFilterElementTemplateOptions,
} from 'primereact/column';
import { Badge } from 'primereact/badge';
import { Dropdown } from 'primereact/dropdown';
import { Pen, Trash, DotsThree } from '@phosphor-icons/react';

import { Task, TaskStatus } from '@Types';
import { InputText, Button } from '@/UI';

import { getBadgeSeverity } from './utils';

export type TableProps = {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onRemove: (task: Task) => void;
};

const TaskStatusTag = ({ status }: { status: TaskStatus }) => (
    <Badge severity={getBadgeSeverity(status)} value={status} />
);

const TaskStatusFilter = (options: ColumnFilterElementTemplateOptions) => (
    <Dropdown
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.value)}
        options={Object.values(TaskStatus)}
        optionLabel="label"
        optionValue="value"
        placeholder="Choose status"
        pt={{
            root: {
                className:
                    /*tw*/ 'hover:border-secondary focus:border-secondary focus:ring-2 focus:ring-secondary/40 shadow-none items-center w-40',
            },
            input: {
                className: /*tw*/ 'py-1.5 px-2 text-sm text-secondary',
            },
            trigger: {
                className: /*tw*/ 'text-secondary-light w-auto py-1.5 px-2',
            },
            item: {
                className:
                    /*tw*/ 'text-secondary aria-selected:bg-primary-light p-2',
            },
            list: {
                className: /*tw*/ 'py-2',
            },
            clearIcon: {
                className: /*tw*/ 'static m-0 py-1.5 h-8',
            },
        }}
        showClear
    />
);

const TaskDescriptionFilter = (options: ColumnFilterElementTemplateOptions) => (
    <InputText
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.target.value)}
        placeholder="Search for description..."
    />
);
const TaskNameFilter = (options: ColumnFilterElementTemplateOptions) => (
    <InputText
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.target.value)}
        placeholder="Search for name..."
    />
);

const TaskActionBody = (data: Task, { props }: ColumnBodyOptions) => {
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
                    command: () => props.onEdit(data),
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
                    command: () => props.onRemove(data),
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

const Table = ({ tasks, onEdit, onRemove }: TableProps) => (
    <div className="inline-block w-full rounded-lg align-middle">
        <DataTable
            value={tasks}
            rows={8}
            tableClassName="min-w-full scrollbar-thin"
            filterDisplay="row"
            emptyMessage="No tasks found."
            pt={{
                wrapper: { className: /*tw*/ 'scrollbar-thin' },
            }}
            removableSort
            paginator
        >
            <Column
                field="name"
                header="Name"
                headerClassName="text-sm font-bold whitespace-nowrap"
                bodyClassName="text-secondary text-sm font-normal whitespace-nowrap"
                sortable
                filter
                filterElement={TaskNameFilter}
            />
            <Column
                field="description"
                header="Description"
                headerClassName="text-sm font-bold whitespace-nowrap min-w-80"
                bodyClassName="text-secondary text-sm font-normal"
                sortable
                filter
                filterElement={TaskDescriptionFilter}
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
                body={(data, options) =>
                    TaskActionBody(data, {
                        ...options,
                        props: { onEdit, onRemove },
                    })
                }
            />
        </DataTable>
    </div>
);

export default Table;
