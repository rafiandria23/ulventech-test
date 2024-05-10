import axios, { AxiosInstance } from 'axios';

import type { DynamicFormPayload } from '../types/dynamic-form';
import type { DynamicFormField } from '../interfaces/dynamic-form';

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

  public async fetchFields(): Promise<DynamicFormField[]> {
    const {
      data: { data: result },
    } = await this.client.get<{ data: DynamicFormField[] }>('/');

    return result;
  }

  public async submitFields(payload: DynamicFormPayload): Promise<string> {
    const { data } = await this.client.post('/', payload);

    return data.message;
  }
}

export default ApiClient;
