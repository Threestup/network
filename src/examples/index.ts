import { MyApiOperation } from './MyApi';
import { MyNetwork } from './MyNetwork';

export type IResponse<T> = {[P in keyof T]: T[P]};

class User {
  id: number;

  constructor(d: IResponse<User>) {
    this.id    = d.id;
  }
}

class ErrorResponse {
  constructor(err: IResponse<ErrorResponse>) {
    console.log(err);
  }
}

const req = (source = new MyNetwork()) => {

  source
    .request({
      operation: MyApiOperation.Default,
    })
    .then(res => res.match({
      ok: _ => new User(_),
      err: _ => new ErrorResponse(_)
    }))
    .then(_ => console.info(_))
    .catch(_ => console.error(_))
};

req();
