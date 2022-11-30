import { createContext, ReactNode, useContext } from 'react';

import { UseFormReturnType } from '@mantine/form';
import Joi from 'joi';

interface FormContextProps<T extends object> {
  form: UseFormReturnType<T> | null;
  initialValues: T | null;
  schema?: Joi.Schema<T> | null;
}

interface FormProviderProps<T extends object> {
  children: ReactNode;
  value: FormContextProps<T>;
}

const createFormContext = <T extends object>() => {
  return createContext<FormContextProps<T>>({
    form: null,
    initialValues: null,
    schema: null,
  });
};

export const FormContext = createFormContext<any>();
export const FormContextProvider = FormContext.Provider;
export const FormContextConsumer = FormContext.Consumer;

// Provider component for FormContext
export const FormProvider = <T extends object>({
  children,
  value,
}: FormProviderProps<T>) => {
  return <FormContextProvider value={value}>{children}</FormContextProvider>;
};

// Form Hooks
export const useFormContext = () => {
  return useContext(FormContext);
};
