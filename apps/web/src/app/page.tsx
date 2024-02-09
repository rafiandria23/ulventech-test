'use client';

import _ from 'lodash';
import { FC, useCallback, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Stack, Container } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Send as SendIcon } from '@mui/icons-material';

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

  const handleFetchFields = useCallback(async () => {
    await dispatch(fetchFields()).unwrap();
  }, [dispatch]);

  const handleSubmitFields = useCallback<
    (payload: DynamicFormPayload) => Promise<void>
  >(
    async (payload) => {
      await dispatch(submitFields(payload)).unwrap();
    },
    [dispatch],
  );

  useEffect(() => {
    handleFetchFields();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fields.length) {
      form.reset(_.chain(fields).keyBy('fieldName').mapValues('value').value());
    }
  }, [fields, form]);

  return (
    <FormProvider {...form}>
      <Layout>
        <form
          name='dynamic-form'
          onSubmit={form.handleSubmit(handleSubmitFields)}
        >
          <Stack component={Container} spacing={8}>
            {fields.length && (
              <>
                <DynamicForm loading={loading} fields={fields} />

                <LoadingButton
                  type='submit'
                  variant='contained'
                  size='large'
                  loading={loading}
                  endIcon={<SendIcon />}
                >
                  Submit
                </LoadingButton>
              </>
            )}
          </Stack>
        </form>
      </Layout>
    </FormProvider>
  );
};

export default HomePage;
