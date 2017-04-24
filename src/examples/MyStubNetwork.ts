import { MyApiOperation } from './MyApi';
import { MyNetwork } from './MyNetwork';

import { IStubNetwork, ConfigureFakeProvider, Fetch } from '../Api/Network';

class MyStubNetwork extends MyNetwork implements IStubNetwork<MyApiOperation> {

  constructor(public delay = 250, public status = 200) {
    super();
  }

  getProvider(): Fetch {
    const isOk = this.status >= 200 && this.status < 300,
          body = this.getSampleData(this.config.operation, isOk);

    return ConfigureFakeProvider(JSON.stringify(body), this.status, this.delay);
  }

  getSampleData(operation: MyApiOperation, isOk: boolean = true): any {
    switch (operation) {
      default:
        return isOk ? {ok: 1, err: 0} : {ok: 0, err: 1};
    }
  }
}

export default MyStubNetwork;
export { MyStubNetwork };
