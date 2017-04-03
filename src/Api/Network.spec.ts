import { expect } from 'chai';
import * as sinon from 'sinon';
import { is_ok, is_err } from 'tsp-monads';

import { BaseNetwork, ConfigureFakeProvider } from './Network';

describe('Api/Network', () => {
    let sandbox:any;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('eval', () => {
        it('should correctly evaluate a request and return parsed JSON wrapped in Ok', () => {
            const provider = ConfigureFakeProvider('{"a": 1}');

            const subject = new BaseNetwork(provider)
                .eval(new Request('/url'));

            subject.then(_ => {
                expect(_.is_ok()).to.equal(true);
                expect(is_ok(_) ? _ : null).to.deep.equal({a: 1});
            }).catch(err => {
                expect.fail('Has to be a Result!');
            });
        });

        it('should correctly evaluate a request and return parsed JSON wrapped in Err', () => {
            const provider = ConfigureFakeProvider('{"error": "Object not found"}', 404);

            const subject = new BaseNetwork(provider)
                .eval(new Request('/url'));

            subject.then(_ => {
                expect(_.is_err()).to.equal(true);
                expect(is_err(_) ? _ : null).to.deep.equal({error: "Object not found"});
            }).catch(err => {
                expect.fail('Has to be a Result!');
            });
        });

        it('should correctly evaluate a request and reject with parse error if content malformed', () => {
            const provider = ConfigureFakeProvider('{null}');

            const subject = new BaseNetwork(provider)
                .eval(new Request('/url'));

            subject.then(_ => {
                expect.fail('Has to fail!');
            }).catch(err => {
                expect(err instanceof Error).to.equal(true);
                expect(err.name).to.equal('SyntaxError');

            });
        });
    });
});
