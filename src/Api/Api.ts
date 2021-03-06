import { Option, Some, Result, Err, Ok } from 'tsp-monads';

export enum ApiMethod { GET = 1, POST, PUT, DELETE }

export interface IApiConfig<T> {
  operation: T;
  params?: Object;
  data?: Object;
  urlKeys?: Object;
}

export interface IBaseApi<T> {
  operation: T;
  params: Option<Object>;
  data: Option<Object>;
  urlKeys: Option<Object>;
  getBaseUrl(): Option<string>;
  getParams(): Option<Object>;
  getData(): Option<Object>;
  getUrlKeyValue(key: string): Result<string, string>;
}

export interface IApi<T> extends IBaseApi<T> {
  getMethod(): ApiMethod;
  getUrl(): string;
  isProtected(): boolean;
}

export class BaseApi<T> implements IBaseApi<T> {
  operation: T;
  params: Option<Object>;
  data: Option<Object>;
  urlKeys: Option<Object>;

  constructor(config: IApiConfig<T>) {
    this.operation = config.operation;
    this.params    = Some(config.params);
    this.data      = Some(config.data);
    this.urlKeys   = Some(config.urlKeys);
  }

  getBaseUrl(env = process.env): Option<string> {
    return Some(env.API_URL);
  }

  getParams(): Option<Object> {
    return this.params;
  }

  getData(): Option<Object> {
    return this.data;
  }

  getUrlKeyValue(key: string, fallback = ''): Result<string, string> {
    return this.urlKeys.match({
      some: _ => {
        try {
          return Ok((_ as any)[key].toString())
        } catch (e) {
          return Err(e)
        }
      },
      none: Err('No Url Keys found')
    });
  }
}
