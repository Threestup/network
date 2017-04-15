import { expect } from 'chai';

import { BaseApi } from './Api';

enum TestApiOperation { Default }

describe('Api/Api', () => {
  describe('getBaseUrl', () => {
    it('correctly returns baseUrl wrapped in Ok if found in process.env', () => {
      const process_stub = {
        env: {API_URL: 'http://localhost'}
      };

      const subject = new BaseApi({operation: TestApiOperation.Default})
        .getBaseUrl(process_stub.env);

      expect(subject.is_some()).to.equal(true);
      expect(subject.unwrap_or(''))
        .to.equal(process_stub.env.API_URL);
    });

    it('correctly returns Err if not found in process.env', () => {
      const process_stub = {
        env: {}
      };

      const subject = new BaseApi({operation: TestApiOperation.Default})
        .getBaseUrl(process_stub.env);

      expect(subject.is_none()).to.equal(true);
      expect(subject.unwrap_or('http://someOtherHost'))
        .to.equal('http://someOtherHost');
    });
  });

  describe('getParams', () => {
    it('correctly returns params provided to config', () => {
      const params = {id: 123};

      const subject = new BaseApi({
        operation: TestApiOperation.Default,
        params: params
      }).getParams();

      expect(subject.unwrap_or({})).to.deep.equal(params);
    });

    it('correctly returns None when no params provided to config', () => {
      const subject = new BaseApi({
        operation: TestApiOperation.Default
      }).getParams();

      expect(subject.is_some()).to.equal(false);
    });
  });

  describe('getData', () => {
    it('correctly returns data provided to config', () => {
      const data = {id: 123};

      const subject = new BaseApi({
        operation: TestApiOperation.Default,
        data: data
      }).getData();

      expect(subject.unwrap_or({})).to.deep.equal(data);
    });

    it('correctly returns None when no params provided to config', () => {
      const subject = new BaseApi({
        operation: TestApiOperation.Default
      }).getData();

      expect(subject.is_some()).to.equal(false);
    });
  });

  describe('getUrlKeyValue', () => {
    it('correctly returns Option of value cast to string when key found in urlKeys config', () => {
      const urlKeys = {id: 123};

      const subject = new BaseApi({
        operation: TestApiOperation.Default,
        urlKeys
      }).getUrlKeyValue('id');

      expect(subject.is_some()).to.equal(true);
      expect(subject.unwrap_or('')).to.equal('123');
    });

    it('correctly returns None when key found in urlKeys config', () => {
      const urlKeys = {name: 'John Doe'};

      const subject = new BaseApi({
        operation: TestApiOperation.Default,
        urlKeys
      }).getUrlKeyValue('id');

      expect(subject.is_none()).to.equal(true);
    });
  });
});
