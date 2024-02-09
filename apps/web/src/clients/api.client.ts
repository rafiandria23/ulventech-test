import axios, { AxiosInstance } from 'axios';

import {
  IDynamicFormField,
  DynamicFormPayload,
} from '../types/dynamic-form.type';

class ApiClient {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://ulventech-react-exam.netlify.app/api/form',
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
