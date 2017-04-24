import { BaseApi, IApi, ApiMethod } from '../Api/Api';

export enum MyApiOperation { Default = 0, GetSomething, PostSomething }

class MyApi extends BaseApi<MyApiOperation> implements IApi<MyApiOperation> {

  getMethod(): ApiMethod {
    switch (this.operation) {
      case MyApiOperation.GetSomething:
        return ApiMethod.GET;
      case MyApiOperation.PostSomething:
        return ApiMethod.POST;
      default:
        return ApiMethod.GET; // @TODO not sure what the default should be..
    }
  }

  getUrl(): string {
    switch (this.operation) {
      case MyApiOperation.GetSomething:
      case MyApiOperation.PostSomething:
        return '/something';
      default:
        return '/';
    }
  }

  isProtected(): boolean {
    switch (this.operation) {
      case MyApiOperation.GetSomething:
        return false;
      case MyApiOperation.PostSomething:
        return true;
      default:
        return false;
    }
  }
}

export default MyApi;
export { MyApi };
