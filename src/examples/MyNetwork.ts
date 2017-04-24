import 'isomorphic-fetch';
import { Result } from 'tsp-monads';

import { MyApi, MyApiOperation } from './MyApi';

import { ApiMethod, IApi, IApiConfig } from '../Api/Api';
import { BaseNetwork, Fetch, INetwork } from '../Api/Network';

class MyNetwork extends BaseNetwork implements INetwork<MyApiOperation> {

  config: IApi<MyApiOperation>;

  private static defaultConfig: IApiConfig<MyApiOperation> = {
    operation: MyApiOperation.Default,
  };

  request(ApiConfigOverride: Partial<IApiConfig<MyApiOperation>>): Promise<Result<any, any>> {
    this.config = new MyApi(Object.assign({}, MyNetwork.defaultConfig, ApiConfigOverride));

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

    const url = this.config.getBaseUrl().unwrap_or('http://localhost') + this.config.getUrl();

    return this.init(this.getProvider(), new Request(url, {
      method,
      headers,
      body: this.config.getData().match({
        some: _ => JSON.stringify(_),
        none: () => undefined
      })
    }));
  }

  getProvider(): Fetch {
    return fetch;
  }
}

export default MyNetwork;
export { MyNetwork };
