import { Option, Some } from 'tsp-monads';

import { MyApiOperation } from './MyApi';
import { MyNetwork } from './MyNetwork';

export type IResponse<T> = {[P in keyof T]: T[P]};

class User {
  id: number;
  email: string;
  name: string;

  constructor(d: IResponse<User>) {
    this.id    = d.id;
    this.email = d.email;
    this.name  = d.name;

    let a: Option<number>;
    a = Some(1);
  }
}

class ErrorResponse {
  a: string;

  constructor(err: IResponse<ErrorResponse>) {
    console.log(err);
  }
}

const a = (source = new MyNetwork()) => {

  source
    .request({
      operation: MyApiOperation.Default,
    })
    .then(res => res.match({
      ok: _ => new User(_),
      err: _ => new ErrorResponse(_)
    }))

    .catch()
};

console.log(a);
