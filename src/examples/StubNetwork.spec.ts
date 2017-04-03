//import { expect } from 'chai';
//import { forEach } from 'ramda';
//import { ApiOperation, StubNetwork } from '.';
//import Stub_User from './stubs/User';
//import Stub_AdvertList from './stubs/AdvertList';
//import Stub_ApplicantList from './stubs/ApplicantList';
//import Stub_Applicant from './stubs/Applicant';
//import Stub_AdvertContents from './stubs/AdvertContents';
//import Stub_PublishAdvert from './stubs/PublishAdvert';
//import Stub_UpdateApplicantStatus from './stubs/UpdateApplicantStatus';
//import Stub_ApplicantCv from './stubs/ApplicantCv';
//import Stub_CreditPriceList from './stubs/CreditPriceList';
//import Stub_StripeKey from './stubs/StripeKey';
//import Stub_SignOut from './stubs/SignOut';
//import Stub_ReferenceCode from './stubs/ReferenceCode';
//import Stub_ApproveAdvert from './stubs/ApproveAdvert';
//import Stub_Advert from './stubs/Advert';
//import Stub_UserList from './stubs/UserList';
//
//describe('Utils/Api/StubNetwork', () => {
//    describe('getSampleData', () => {
//        interface IScenario {
//            config:StubNetwork;
//            operation:ApiOperation;
//            expected:Object | null;
//        }
//
//        const scenarios:IScenario[] = [
//            {config: new StubNetwork(), operation: ApiOperation.Unknown, expected: null},
//            {config: new StubNetwork(), operation: ApiOperation.SignUp, expected: Stub_User},
//            {config: new StubNetwork(), operation: ApiOperation.SignIn, expected: Stub_User},
//            {config: new StubNetwork(), operation: ApiOperation.SignedIn, expected: Stub_User},
//            {config: new StubNetwork(), operation: ApiOperation.UpdateUser, expected: Stub_User},
//            {config: new StubNetwork(), operation: ApiOperation.VerifyEmail, expected: Stub_User},
//            {config: new StubNetwork(), operation: ApiOperation.ListAdverts, expected: Stub_AdvertList},
//            {config: new StubNetwork(), operation: ApiOperation.ListApplicants, expected: Stub_ApplicantList},
//            {config: new StubNetwork(), operation: ApiOperation.Applicant, expected: Stub_Applicant},
//            {config: new StubNetwork(), operation: ApiOperation.GetApplicantCv, expected: Stub_ApplicantCv},
//            {config: new StubNetwork(), operation: ApiOperation.UpdateApplicantStatus, expected: Stub_UpdateApplicantStatus},
//            {config: new StubNetwork(), operation: ApiOperation.AdvertContents, expected: Stub_AdvertContents},
//            {config: new StubNetwork(), operation: ApiOperation.CreateAdvert, expected: Stub_AdvertContents},
//            {config: new StubNetwork(), operation: ApiOperation.UpdateAdvert, expected: Stub_AdvertContents},
//            {config: new StubNetwork(), operation: ApiOperation.PublishAdvert, expected: Stub_PublishAdvert},
//            {config: new StubNetwork(), operation: ApiOperation.CreditPriceList, expected: Stub_CreditPriceList},
//            {config: new StubNetwork(), operation: ApiOperation.StripeKey, expected: Stub_StripeKey},
//            {config: new StubNetwork(), operation: ApiOperation.PurchaseCredit, expected: Stub_User},
//            {config: new StubNetwork(), operation: ApiOperation.SignOut, expected: Stub_SignOut},
//            {config: new StubNetwork(), operation: ApiOperation.GenerateCode, expected: Stub_ReferenceCode},
//            {config: new StubNetwork(), operation: ApiOperation.ApproveAdvert, expected: Stub_ApproveAdvert},
//            {config: new StubNetwork(), operation: ApiOperation.GetAdvert, expected: Stub_Advert},
//            {config: new StubNetwork(), operation: ApiOperation.ListUsers, expected: Stub_UserList},
//        ];
//
//        const functor = (scenario:IScenario) => {
//            it('should correctly return getSampleData for ' + ApiOperation[scenario.operation], () => {
//                expect(scenario.config.getSampleData(scenario.operation)).to.deep.equal(scenario.expected);
//            });
//        };
//
//        forEach(functor, scenarios);
//    });
//});
