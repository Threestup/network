import { expect } from 'chai';
import * as sinon from 'sinon';

import { BaseNetwork, ConfigureFakeProvider } from './Network';

describe(__filename, () => {
  let sandbox: any;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('init', () => {
    it('should correctly evaluate a request and return parsed JSON wrapped in Ok', done => {
      const provider = ConfigureFakeProvider('{"a": 1}');

      const subject = new BaseNetwork()
        .init(provider, new Request('/url'));

      subject.then(_ => {
        expect(_.is_ok()).to.equal(true);
        expect(_.unwrap()).to.deep.equal({"a": 1});

        done();
      }).catch(err => {
        expect.fail('Has to be a Result!');

        done();
      });
    });

    it('should correctly evaluate a request and return parsed JSON wrapped in Err', done => {
      const provider = ConfigureFakeProvider('{"error": "Object not found"}', 404);

      const subject = new BaseNetwork()
        .init(provider, new Request('/url'));

      subject.then(_ => {
        expect(_.is_err()).to.equal(true);
        expect(_.unwrap_err()).to.deep.equal({
          data: {"error": "Object not found"},
          status: 404,
          statusText: 'Not Found'
        });

        done();
      }).catch(err => {
        expect.fail('Has to be a Result!');

        done();
      });
    });

    it('should correctly evaluate a request and reject with parse error if content malformed', done => {
      const provider = ConfigureFakeProvider('{null}');

      const subject = new BaseNetwork()
        .init(provider, new Request('/url'));

      subject.then(_ => {
        expect.fail('Has to fail!');

        done();
      }).catch(err => {
        expect(err instanceof Error).to.equal(true);
        expect(err.name).to.equal('SyntaxError');

        done();
      });
    });
  });
});
