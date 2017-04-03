import { Promise } from 'es6-promise';
import { Result, Ok, Err } from 'tsp-monads';

import { MyApiOperation } from './MyApi';
import { MyNetwork } from './MyNetwork';
import { IStubNetwork } from '../Network';

class MyStubNetwork extends MyNetwork implements IStubNetwork<MyApiOperation> {

    constructor(private delay = 250, private status = 200) {
        super();
    }

    getSampleData(operation:MyApiOperation, isOk:boolean):Result<any, any> {
        switch (operation) {
            default:
                return isOk ? Ok(null) : Err(null);
        }
    }

    init(req:Request):Promise<Result<any, any>> {
        const isOk = this.status >= 200 && this.status < 300;

        const body = this.getSampleData(this.config.operation, isOk);

        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(new Response(body, {
                status: this.status,
                headers: req.headers
            })), this.delay);
        });
    }
}

export default MyStubNetwork;
export { MyStubNetwork };
