'use client';

import { FC, useCallback, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Container } from '@mui/material';

import { DynamicFormPayload } from '../types/dynamic-form.type';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import { fetchFields, submitFields } from '../redux/thunks/dynamic-form.thunk';
import Layout from '../components/Layout.component';
import DynamicForm from '../components/DynamicForm.component';

const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const { loading, fields } = useAppSelector((state) => state.dynamicForm);
  const form = useForm<DynamicFormPayload>({
    mode: 'onBlur',
  });

  const handleSubmitFields = useCallback<
    (payload: DynamicFormPayload) => Promise<void>
  >(
    async (payload) => {
      await dispatch(submitFields(payload)).unwrap();
    },
    [dispatch],
  );

  useEffect(() => {
    if (!fields.length) {
      dispatch(fetchFields());
    }
  }, [fields, dispatch]);

  return (
    <FormProvider {...form}>
      <Layout>
        <Container>
          {fields.length && <DynamicForm loading={loading} fields={fields} />}
        </Container>
      </Layout>
    </FormProvider>
  );
};

export default HomePage;
