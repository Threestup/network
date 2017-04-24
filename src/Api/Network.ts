import 'isomorphic-fetch';
import { Promise } from 'es6-promise';
import { Err, Ok, Result } from 'tsp-monads';

import { IApi, IApiConfig } from './Api';

export type Fetch = (input: Request | string, init?: RequestInit) => Promise<Response>;

export interface IBaseNetwork {
  init(provider: Fetch, request: Request): Promise<Result<any, any>>;
}

export interface INetwork<O> extends IBaseNetwork {
  config: IApi<O>;
  request(cO: Partial<IApiConfig<O>>): Promise<Result<any, any>>;
  getProvider(): Fetch;
}

export interface IStubNetwork<O> extends INetwork<O> {
  getSampleData(operation: O, isOk: boolean): any;
}

export class BaseNetwork implements IBaseNetwork {
  init(provider: Fetch, request: Request): Promise<Result<any, any>> {
    return provider(request)
      .then((response: Response) => {
        let val: Promise<Result<any, any>>;

        val = response
          .json()
          .then(_ => response.ok ? Ok(_) : Err(_));

        return val;
      });
  }
}

export const ConfigureFakeProvider = (retBody: string, status: number = 200, delay = 0): Fetch => {
  return (req: Request | string, init?: RequestInit) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(new Response(retBody, {
        status: status,
        headers: typeof req === 'string' ? undefined : req.headers,
      })), delay);
    });
  };
};
