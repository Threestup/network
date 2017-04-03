import 'isomorphic-fetch';
import { Result, None } from 'tsp-monads';

import { MyApi, MyApiOperation } from './MyApi';

import { ApiMethod, IApiConfig } from '../Api/Api';
import { BaseNetwork, INetwork } from '../Api/Network';

class MyNetwork extends BaseNetwork<MyApiOperation> implements INetwork<MyApiOperation> {

    private static defaultConfig = {
        operation: MyApiOperation.Unknown,
        params: None,
        data: None,
        urlReplace: None,
    };

    request(ApiConfigOverride:Partial<IApiConfig<MyApiOperation>>):Promise<Result<any, any>> {
        this.config = new MyApi({...MyNetwork.defaultConfig, ApiConfigOverride});

        let method  = ApiMethod[this.config.getMethod()],
            headers = new Headers();

        if (this.config.isProtected())
            headers.append('Authorization', `Bearer ${'token'}`);

        switch (this.config.getMethod()) {
            case ApiMethod.POST:
                headers.append('Content-Type', 'application/json');
                break;
            case ApiMethod.PUT:
                headers.append('Content-Type', 'application/json');
                break;
            case ApiMethod.DELETE:
                break;
            default:
                break;
        }

        const url = this.config.getBaseUrl() + this.config.getUrl();

        return this.init(new Request(url, {
            method,
            headers,
            body: this.config.getData().match({
                some: _ => JSON.stringify(_),
                none: () => undefined
            })
        }));
    }
}

export default MyNetwork;
export { MyNetwork };
