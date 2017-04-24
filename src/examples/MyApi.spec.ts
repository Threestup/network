import * as sinon from 'sinon';

describe(__filename, () => {
  let sandbox: any;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getMethod', () => {
  });

  describe('getUrl', () => {
  });

  describe('isProtected', () => {
  });
});
