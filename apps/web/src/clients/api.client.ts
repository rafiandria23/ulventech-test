import axios, { AxiosInstance } from 'axios';

import {
  IDynamicFormField,
  DynamicFormPayload,
} from '../types/dynamic-form.type';

class ApiClient {
  private readonly client: AxiosInstance;

  constructor() {
    if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
      throw new Error('NEXT_PUBLIC_API_BASE_URL env has to be set!');
    }

    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });
  }

  public async fetchFields(): Promise<IDynamicFormField[]> {
    const {
      data: { data: result },
    } = await this.client.get<{ data: IDynamicFormField[] }>('/');

    return result;
  }

  public async submitFields(payload: DynamicFormPayload): Promise<string> {
    const { data } = await this.client.post('/', payload);

    return data.message;
  }
}

export default ApiClient;
