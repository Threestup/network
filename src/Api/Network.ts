import 'isomorphic-fetch';
import { Promise } from 'es6-promise';
import { Err, Ok, Result } from 'tsp-monads';

import { IApi, IApiConfig } from './Api';

export type Fetch = (input: Request | string, init?: RequestInit) => Promise<Response>;

export interface IBaseNetwork<O> {
  config: IApi<O>;
  provider: Fetch;
  //configureProvider(): Fetch;
  eval(req: Request): Promise<Result<any, any>>;
}

export interface INetwork<O> extends IBaseNetwork<O> {
  request(cO: Partial<IApiConfig<O>>): Promise<Result<any, any>>;
}

export interface IStubNetwork<O> extends INetwork<O> {
  getSampleData(operation: O, isOk: boolean): any;
}

export class BaseNetwork<O> implements IBaseNetwork<O> {
  config: IApi<O>;
  provider: Fetch;

  constructor(p = fetch) {
    this.provider = p;
  }

  //configureProvider(): Fetch {
  //  return this.provider;
  //}

  eval(req: Request): Promise<Result<any, any>> {
    //const provider = this.configureProvider();

    return this.provider(req)
      .then((response: Response) => {
        let val: Promise<Result<any, any>>;

        val = response
          .json()
          .then(_ => Promise.resolve(response.ok ? Ok(_) : Err(_)));

        return val;
      });
  }
}

export const ConfigureFakeProvider = (retBody: string, status: number = 200, delay = 0): Fetch => {
  return (req: Request | string, init?: RequestInit) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(new Response(retBody, {
        status: status,
        headers: req instanceof Request ? req.headers : undefined
      })), delay);
    });
  };
};
