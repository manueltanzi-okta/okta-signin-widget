/* eslint max-params: [2, 19] */ //TODO try remove when complete
define([
  'vendor/lib/q',
  'okta/underscore',
  'okta/jquery',
  '@okta/okta-auth-js/jquery',
  'util/Util',
  'shared/util/Util',
  'helpers/mocks/Util',
  'helpers/dom/ConsentRequiredForm',
  'helpers/util/Expect',
  'LoginRouter',
  'sandbox',
  'helpers/xhr/CONSENT_REQUIRED',
  'helpers/xhr/SUCCESS'
],
function (Q, _, $, OktaAuth, LoginUtil, SharedUtil, Util, ConsentRequiredForm, Expect, Router,
          $sandbox, resConsentRequired, resSuccess) {

  var itp = Expect.itp;
  var tick = Expect.tick;

  function setup(settings, res) {
    settings || (settings = {});
    var successSpy = jasmine.createSpy('successSpy');
    var setNextResponse = Util.mockAjax();
    var baseUrl = 'https://foo.com';
    var authClient = new OktaAuth({url: baseUrl, transformErrorXHR: LoginUtil.transformErrorXHR});
    var router = new Router(_.extend({
      el: $sandbox,
      baseUrl: baseUrl,
      authClient: authClient,
      globalSuccessFn: successSpy
    }, settings));
    Util.registerRouter(router);
    Util.mockRouterNavigate(router);
    Util.mockJqueryCss();
    setNextResponse(res || resConsentRequired);
    router.refreshAuthState('dummy-token');
    settings = {
      router: router,
      successSpy: successSpy,
      form: new ConsentRequiredForm($sandbox),
      ac: authClient,
      setNextResponse: setNextResponse
    };
    return Expect.waitForConsentRequired(settings);
  }

  Expect.describe('ConsentRequired', function () {

    Expect.describe('ConsentHeader', function () {
      itp('has the correct org logo', function () {
        return setup().then(function (test) {
          expect(test.form.orgLogo()).toHaveAttr('src', 'http://rain.okta1.com:1802/assets/img/logos/okta-logo.00b28e552573899e15fa6e77278759d5.png');
        });
      });
      itp('has the correct username', function () {
        return setup().then(function (test) {
          expect(test.form.username().text()).toContain('Add-Min');
          expect(test.form.username().text()).toContain('O\'Cloudy Tud');
        });
      });
    });

    Expect.describe('ConsentBeacon', function () {
      itp('has the correct user logo', function () {
        return setup().then(function (test) {
          expect(test.form.userLogo()).toHaveClass('person-16-gray');
        });
      });
      itp('has the correct client logo', function () {
        return setup().then(function (test) {
          expect(test.form.clientLogo()).toHaveAttr('src', 'https://example.com/logo.png');
        });
      });
    });

    Expect.describe('ScopeList', function () {
      itp('has the correct number of scopes', function () {
        return setup().then(function (test) {
          expect(test.form.scopeList().children()).toHaveLength(2);
        });
      });
    });

    Expect.describe('ConsentForm', function () {
      itp('has the correct app name in the title', function () {
        return setup().then(function (test) {
          expect(test.form.consentTitle().text()).toContain('Janky App');
        });
      });
      itp('has the correct term of services link', function () {
        return setup().then(function (test) {
          expect(test.form.termsOfService()).toHaveAttr('href', 'https://example.com/tos.html');
        });
      });
      itp('has the correct privacy policy link', function () {
        return setup().then(function (test) {
          expect(test.form.privacyPolicy()).toHaveAttr('href', 'https://example.com/policy.html');
        });
      });
      itp('has the correct consent button', function () {
        return setup().then(function (test) {
          expect(test.form.consentButton().val()).toBe('Allow Access');
        });
      });
      itp('has the cancel button', function () {
        return setup().then(function (test) {
          expect(test.form.cancelButton().val()).toBe('Don\'t Allow');
        });
      });
    });

  });
});
