import 'isomorphic-fetch';
import * as sinon from 'sinon';
import { expect } from 'chai';

import { MyApiOperation } from './MyApi';
import { MyNetwork } from './MyNetwork';

import { ApiMethod } from '../Api/Api';
import { BaseNetwork, ConfigureFakeProvider } from '../Api/Network';

describe(__filename, () => {
  let sandbox: any;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('request', () => {
    it('should correctly configure a GET request and call init', () => {
      const provider = ConfigureFakeProvider('{"a": 1}');

      const init = sandbox.spy(BaseNetwork.prototype, 'init'),
            getProvider = sandbox.stub(MyNetwork.prototype, 'getProvider').returns(provider);

      const subject = new MyNetwork().request({operation: MyApiOperation.GetSomething});

      subject
        .then(_ => {
          const { args } = init.getCall(0);

          const provider = args[0], request = args[1];

          expect(provider).to.equal(getProvider());

          expect(request instanceof Request).to.equal(true);
          expect(request.method).to.equal(ApiMethod[ApiMethod.GET]);
          expect(request.headers instanceof Headers).to.equal(true);
          expect(request.url).to.equal('http://localhost/');
          expect(request.path).to.equal('/something');
          expect(request.body).to.be.undefined;
        })
        .catch(err => {
          expect.fail('Has to succeed!');
        });
    });

    it('should correctly configure a POST request and call init', () => {
      const provider = ConfigureFakeProvider('{"a": 1}');

      const init = sandbox.spy(BaseNetwork.prototype, 'init'),
            getProvider = sandbox.stub(MyNetwork.prototype, 'getProvider').returns(provider);

      const subject = new MyNetwork().request({operation: MyApiOperation.PostSomething, data: {a: 1}});

      subject
        .then(_ => {
          const { args } = init.getCall(0);

          const provider = args[0], request = args[1];

          expect(provider).to.equal(getProvider());

          expect(request instanceof Request).to.equal(true);
          expect(request.method).to.equal(ApiMethod[ApiMethod.POST]);
          expect(request.headers instanceof Headers).to.equal(true);
          expect(typeof request.headers._headers['authorization']).to.equal('object');
          expect(typeof request.headers._headers['content-type']).to.equal('object');
          expect(request.url).to.equal('http://localhost/');
          expect(request.path).to.equal('/something');
          expect(request.body).to.equal('{"a": 1}');
        })
        .catch(err => {
          expect.fail('Has to succeed!');
        });
    });
  });

  describe('getProvider', () => {
    it('should return an instance of "fetch"', () => {
      const subject = new MyNetwork().getProvider();

      subject('http://host/url')
        .then(_ => {
          expect.fail('Has to fail!');
        })
        .catch(err => {
          expect(err.name).to.equal('FetchError');
        });
    });
  });
});
