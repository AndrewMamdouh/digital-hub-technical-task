import {
    FormikErrors,
    FormikHelpers,
    FormikTouched,
    FormikValues,
} from 'formik';

export type FormikProps = {
    values?: FormikValues;
    errors?: FormikErrors<FormikValues>;
    touched?: FormikTouched<FormikValues>;
    setFieldValue?: FormikHelpers<FormikValues>['setFieldValue'];
};
