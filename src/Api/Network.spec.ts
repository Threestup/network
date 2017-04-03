import { expect } from 'chai';
import { Promise } from 'es6-promise';
import * as sinon from 'sinon';
import { is_ok, is_err } from 'tsp-monads';

import { BaseNetwork } from './Network';

type Fetch = (input:Request | string, init?:RequestInit) => Promise<Response>;

const configureProvider = (retBody:string, status:number = 200):Fetch => {
    return (req:Request | string, init?:RequestInit):Promise<Response> => {
        return new Promise((resolve, reject) => {
            resolve(new Response(retBody, {
                status,
            }));
        });
    };
};

describe('Api/Network', () => {
    let sandbox:any;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('init', () => {
        it('should correctly configure a request and return parsed JSON wrapped in Ok', () => {
            const provider = configureProvider('{"a": 1}');

            const subject = new BaseNetwork()
                .init(new Request(''), provider);

            subject.then(_ => {
                expect(_.is_ok()).to.equal(true);
                expect(is_ok(_) ? _ : null).to.deep.equal({a: 1});
            }).catch(_ => {
                expect.fail('Has to be an Ok!');
            });
        });

        it('should correctly configure a request and return parsed JSON wrapped in Err', () => {
            const provider = configureProvider('{"error": "Object not found"}', 404);

            const subject = new BaseNetwork()
                .init(new Request(''), provider);

            subject.then(_ => {
                expect(_.is_err()).to.equal(true);
                expect(is_err(_) ? _ : null).to.deep.equal({error: "Object not found"});
            }).catch(_ => {
                expect.fail('Has to be an Ok!');
            });
        });
    });
});
