'use client';

import _ from 'lodash';
import { FC, useCallback, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Stack, Container } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';

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
  const { enqueueSnackbar } = useSnackbar();

  const handleFetchFields = useCallback(async () => {
    try {
      await dispatch(fetchFields()).unwrap();
    } catch (err) {
      enqueueSnackbar({
        variant: 'error',
        message: (err as Error).message,
      });
    }
  }, [dispatch, enqueueSnackbar]);

  const handleSubmitFields = useCallback<
    (payload: DynamicFormPayload) => Promise<void>
  >(
    async (payload) => {
      try {
        const message = await dispatch(submitFields(payload)).unwrap();

        enqueueSnackbar({
          variant: 'success',
          message,
        });
      } catch (err) {
        enqueueSnackbar({
          variant: 'error',
          message: (err as Error).message,
        });
      }
    },
    [dispatch, enqueueSnackbar],
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
      <Layout loading={loading && !fields.length}>
        <form
          name='dynamic-form'
          onSubmit={form.handleSubmit(handleSubmitFields)}
        >
          <Stack component={Container} spacing={8}>
            {!!fields.length && (
              <>
                <DynamicForm loading={loading} fields={fields} />

                <LoadingButton
                  type='submit'
                  variant='contained'
                  size='large'
                  loading={loading}
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
