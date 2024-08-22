import { object, string, mixed } from 'yup';

import { Message } from '@UI';

const validationSchema = object().shape({
    name: string().required(() => (
        <Message severity="error" text="Name is required" />
    )),
    description: string().required(() => (
        <Message severity="error" text="Description is required" />
    )),
    status: mixed()
        .oneOf(['Not Started', 'In Progress', 'Finished'])
        .required(() => <Message severity="error" text="Status is required" />),
});

export default validationSchema;
