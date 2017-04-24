import { expect } from 'chai';
import * as sinon from 'sinon';
import { is_ok } from 'tsp-monads';

import { MyApiOperation } from './MyApi';
import { MyStubNetwork } from './MyStubNetwork';

describe(__filename, () => {
  let sandbox: any;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('constructor', () => {
    it('correctly assigns delay and status onto its instance', () => {
      let subject = new MyStubNetwork(500, 201);
      expect(subject.delay).to.equal(500);
      expect(subject.status).to.equal(201);

      subject = new MyStubNetwork(0, 500);
      expect(subject.delay).to.equal(0);
      expect(subject.status).to.equal(500);
    });
  });

  describe('getProvider', () => {
  });

  describe('getSampleData', () => {
  });

  describe('examples', () => {
    it('correctly evaluates a request', () => {
      const provider = new MyStubNetwork(0, 200);

      let subject = provider.request({operation: MyApiOperation.GetSomething});

      subject.then(_ => {
        expect(_.is_ok()).to.equal(true);
        expect(is_ok(_) ? _.unwrap() : null).to.deep.equal(provider.getSampleData(MyApiOperation.GetSomething));
      }).catch(err => {
        expect.fail('Has to be a Result!');
      });
    });
  });
});
