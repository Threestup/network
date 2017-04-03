import 'isomorphic-fetch';
import { Promise } from 'es6-promise';
import { Ok, Err, Result } from 'tsp-monads';

import { IApi, IApiConfig } from './Api';

export interface IBaseNetwork<O> {
    config:IApi<O>;
    init(req:Request):Promise<Result<any, any>>;
}

export interface INetwork<O> extends IBaseNetwork<O> {
    request(cO:Partial<IApiConfig<O>>):Promise<Result<any, any>>;
}

export interface IStubNetwork<O> extends INetwork<O> {
    getSampleData(operation:O, isOk:boolean):any;
}

export class BaseNetwork<O> implements IBaseNetwork<O> {
    config:IApi<O>;

    init(req:Request, provider = fetch):Promise<Result<any, any>> {
        return provider(req)
            .then((response:Response) => {
                let val:Promise<Result<any, any>>;

                val = response
                    .json()
                    .then(_ => Promise.resolve(response.ok ? Ok(_) : Err(_)));

                return val;
            });
    }
}
