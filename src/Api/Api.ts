import { gt } from 'ramda';
import { Err, Ok, Option, Result, Some } from 'tsp-monads';

export enum ApiMethod { UNKNOWN = 1, GET, POST, PUT, DELETE }

export interface IApiConfig<T> {
    operation:T;
    params?:Object;
    data?:Object;
    urlKeys?:Object;
}

export interface IBaseApi<T> {
    operation:T;
    params:Option<Object>;
    data:Option<Object>;
    urlKeys:Option<Object>;
    getBaseUrl():Result<string, string>;
    getParams():Option<Object>;
    getData():Option<Object>;
    getUrlKeyValue(key:string):Option<string>;
}

export interface IApi<T> extends IBaseApi<T> {
    getMethod():ApiMethod;
    getUrl():string;
    isProtected():boolean;
}

export class BaseApi<T> implements IBaseApi<T> {
    operation:T;
    params:Option<Object>;
    data:Option<Object>;
    urlKeys:Option<Object>;

    constructor(config:IApiConfig<T>) {
        this.operation = config.operation;
        this.params    = Some(config.params);
        this.data      = Some(config.data);
        this.urlKeys   = Some(config.urlKeys);
    }

    getBaseUrl(env = process.env):Result<string, string> {
        const url = env.API_URL;

        return url && gt(url.length, 0)
            ? Ok(url) : Err('API_URL not found in process.env');
    }

    getParams():Option<Object> {
        return this.params;
    }

    getData():Option<Object> {
        return this.data;
    }

    getUrlKeyValue(key:string, fallback = ''):Option<string> {
        return this.urlKeys
                   .map(_ => (_ as any)[key]
                       .toString())
    }
}
