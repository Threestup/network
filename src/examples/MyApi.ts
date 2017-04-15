import { BaseApi, IApi, IApiConfig, ApiMethod } from '../Api/Api';

export enum MyApiOperation { Default = 0, SignIn, SignOut }

class MyApi extends BaseApi<MyApiOperation> implements IApi<MyApiOperation> {

  constructor(config: IApiConfig<MyApiOperation>) {
    super(config);
  }

  getMethod(): ApiMethod {
    switch (this.operation) {
      case MyApiOperation.SignIn:
        return ApiMethod.POST;
      case MyApiOperation.SignOut:
        return ApiMethod.DELETE;
      default:
        return ApiMethod.GET;
    }
  }

  getUrl(): string {
    switch (this.operation) {
      case MyApiOperation.SignIn:
        return '/user/sign-in';
      case MyApiOperation.SignOut:
        return '/user/sign-out';
      default:
        return '/';
    }
  }

  isProtected(): boolean {
    switch (this.operation) {
      case MyApiOperation.SignOut:
        return true;
      case MyApiOperation.SignIn:
        return false;
      default:
        return false;
    }
  }
}

export default MyApi;
export { MyApi };
