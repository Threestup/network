import { Ok, Err } from 'tsp-monads';

import { MyApiOperation } from './MyApi';
import { MyNetwork } from './MyNetwork';

import { IStubNetwork, ConfigureFakeProvider, Fetch } from '../Api/Network';

class MyStubNetwork extends MyNetwork implements IStubNetwork<MyApiOperation> {

  constructor(private delay = 250, private status = 200) {
    super();

    this.provider = this.configureProvider();
  }

  private configureProvider(): Fetch {
    const isOk = this.status >= 200 && this.status < 300,
          body = this.getSampleData(this.config.operation, isOk);

    return ConfigureFakeProvider(body.toString(), this.status, this.delay);
  }

  getSampleData(operation: MyApiOperation, isOk: boolean): any {
    switch (operation) {
      default:
        return isOk ? Ok(null) : Err(null);
    }
  }
}

export default MyStubNetwork;
export { MyStubNetwork };
