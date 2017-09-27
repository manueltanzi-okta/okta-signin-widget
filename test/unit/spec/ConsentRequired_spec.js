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
      features: { securityImage: true }, // probably remove TODO try remove when complete
      authClient: authClient,
      globalSuccessFn: successSpy,
      processCreds: settings.processCreds // probably remove TODO try remove when complete
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


  // function submitNewPass(test, oldPass, newPass, confirmPass) {
  //   test.form.setOldPass(oldPass);
  //   test.form.setNewPass(newPass);
  //   test.form.setConfirmPass(confirmPass);
  //   test.form.submit();
  // }

  Expect.describe('ConsentRequired', function () {

    Expect.describe('PasswordExpired', function () {
      itp('has the correct title', function () {
        return setup().then(function (test) {
          console.log(test.form.consentButton());
          expect(test.form.consentButton().val()).toBe('Allow Access');
        });
      });
      itp('has the correct title', function () {
        return setup().then(function (test) {
          console.log(test.form.consentButton());
          expect(test.form.consentButton().val()).toBe('Allow Access');
        });
      });
      // itp('has a valid subtitle', function () {
      //   return setup().then(function (test) {
      //     expect(test.form.subtitleText()).toEqual('Your password must have at least 8 characters,' +
      //       ' a lowercase letter, an uppercase letter, a number, a symbol, no parts of your username.');
      //   });
      // });
      // itp('has an old password field', function () {
      //   return setup().then(function (test) {
      //     Expect.isPasswordField(test.form.oldPassField());
      //   });
      // });
      // itp('has a new password field', function () {
      //   return setup().then(function (test) {
      //     Expect.isPasswordField(test.form.newPassField());
      //   });
      // });
      // itp('has a confirm password field', function () {
      //   return setup().then(function (test) {
      //     Expect.isPasswordField(test.form.confirmPassField());
      //   });
      // });
      // itp('has a change password button', function () {
      //   return setup().then(function (test) {
      //     expect(test.form.submitButton().length).toBe(1);
      //   });
      // });
      // itp('has a sign out link', function () {
      //   return setup().then(function (test) {
      //     Expect.isVisible(test.form.signoutLink());
      //   });
      // });
      // itp('does not have a skip link', function () {
      //   return setup().then(function (test) {
      //     expect(test.form.skipLink().length).toBe(0);
      //   });
      // });
      // itp('has a signout link which cancels the current stateToken and navigates to primaryAuth', function () {
      //   return setup().then(function (test) {
      //     spyOn(SharedUtil, 'redirect');
      //     $.ajax.calls.reset();
      //     test.setNextResponse(resSuccess);
      //     test.form.signout();
      //     return tick(test);
      //   })
      //   .then(function (test) {
      //     expect($.ajax.calls.count()).toBe(1);
      //     Expect.isJsonPost($.ajax.calls.argsFor(0), {
      //       url: 'https://foo.com/api/v1/authn/cancel',
      //       data: {
      //         stateToken: 'testStateToken'
      //       }
      //     });
      //     Expect.isPrimaryAuth(test.router.controller);
      //   });
      // });
      // itp('has a signout link which cancels the current stateToken and redirects to the provided signout url',
      // function () {
      //   return setup({ signOutLink: 'http://www.goodbye.com' }).then(function (test) {
      //     spyOn(SharedUtil, 'redirect');
      //     $.ajax.calls.reset();
      //     test.setNextResponse(resSuccess);
      //     test.form.signout();
      //     return tick();
      //   })
      //   .then(function () {
      //     expect($.ajax.calls.count()).toBe(1);
      //     Expect.isJsonPost($.ajax.calls.argsFor(0), {
      //       url: 'https://foo.com/api/v1/authn/cancel',
      //       data: {
      //         stateToken: 'testStateToken'
      //       }
      //     });
      //     expect(SharedUtil.redirect).toHaveBeenCalledWith('http://www.goodbye.com');
      //   });
      // });
      // itp('calls processCreds function before saving a model', function () {
      //   var processCredsSpy = jasmine.createSpy('processCredsSpy');
      //   return setup({ processCreds: processCredsSpy })
      //   .then(function (test) {
      //     $.ajax.calls.reset();
      //     test.setNextResponse(resSuccess);
      //     submitNewPass(test, 'oldpwd', 'newpwd', 'newpwd');
      //     return Expect.waitForSpyCall(test.successSpy);
      //   })
      //   .then(function() {
      //     expect(processCredsSpy.calls.count()).toBe(1);
      //     expect(processCredsSpy).toHaveBeenCalledWith({
      //       username: 'inca@clouditude.net',
      //       password: 'newpwd'
      //     });
      //     expect($.ajax.calls.count()).toBe(1);
      //   });
      // });
      // itp('calls async processCreds function before saving a model', function () {
      //   var processCredsSpy = jasmine.createSpy('processCredsSpy');
      //   return setup({
      //     processCreds: function (creds, callback) {
      //       processCredsSpy(creds, callback);
      //       callback();
      //     }
      //   })
      //   .then(function (test) {
      //     $.ajax.calls.reset();
      //     test.setNextResponse(resSuccess);
      //     submitNewPass(test, 'oldpwd', 'newpwd', 'newpwd');
      //     return Expect.waitForSpyCall(test.successSpy);
      //   })
      //   .then(function() {
      //     expect(processCredsSpy.calls.count()).toBe(1);
      //     expect(processCredsSpy).toHaveBeenCalledWith({
      //       username: 'inca@clouditude.net',
      //       password: 'newpwd'
      //     }, jasmine.any(Function));
      //     expect($.ajax.calls.count()).toBe(1);
      //   });
      // });
      // itp('calls async processCreds function and can prevent saving a model', function () {
      //   var processCredsSpy = jasmine.createSpy('processCredsSpy');
      //   return setup({
      //     processCreds: function (creds, callback) {
      //       processCredsSpy(creds, callback);
      //     }
      //   })
      //   .then(function (test) {
      //     $.ajax.calls.reset();
      //     test.setNextResponse(resSuccess);
      //     submitNewPass(test, 'oldpwd', 'newpwd', 'newpwd');
      //     return tick();
      //   })
      //   .then(function() {
      //     expect(processCredsSpy.calls.count()).toBe(1);
      //     expect(processCredsSpy).toHaveBeenCalledWith({
      //       username: 'inca@clouditude.net',
      //       password: 'newpwd'
      //     }, jasmine.any(Function));
      //     expect($.ajax.calls.count()).toBe(0);
      //   });
      // });
      // itp('saves the new password successfully', function () {
      //   return setup().then(function (test) {
      //     $.ajax.calls.reset();
      //     test.setNextResponse(resSuccess);
      //     submitNewPass(test, 'oldpassyo', 'boopity', 'boopity');
      //     return Expect.waitForSpyCall(test.successSpy);
      //   })
      //   .then(function() {
      //     expect($.ajax.calls.count()).toBe(1);
      //     Expect.isJsonPost($.ajax.calls.argsFor(0), {
      //       url: 'https://foo.com/api/v1/authn/credentials/change_password',
      //       data: {
      //         oldPassword: 'oldpassyo',
      //         newPassword: 'boopity',
      //         stateToken: 'testStateToken'
      //       }
      //     });
      //   });
      // });
      // itp('shows an error if the server returns a wrong old pass error', function () {
      //   return setup()
      //   .then(function (test) {
      //     test.setNextResponse(resErrorOldPass);
      //     submitNewPass(test, 'wrongoldpass', 'boo', 'boo');
      //     return tick(test);
      //   })
      //   .then(function (test) {
      //     expect(test.form.hasErrors()).toBe(true);
      //     expect(test.form.errorMessage()).toBe(
      //       'We found some errors. Please review the form and make corrections.'
      //     );
      //   });
      // });
      // itp('shows an error if the server returns a complexity error', function () {
      //   return setup()
      //   .then(function (test) {
      //     test.setNextResponse(resErrorComplexity);
      //     submitNewPass(test, 'oldpassyo', 'badpass', 'badpass');
      //     return tick(test);
      //   })
      //   .then(function (test) {
      //     expect(test.form.hasErrors()).toBe(true);
      //     expect(test.form.errorMessage()).toBe(
      //       'Passwords must have at least 8 characters, a lowercase letter, ' +
      //       'an uppercase letter, a number, no parts of your username'
      //     );
      //   });
      // });
      // itp('validates that fields are not empty', function () {
      //   return setup().then(function (test) {
      //     $.ajax.calls.reset();
      //     test.form.submit();
      //     expect($.ajax).not.toHaveBeenCalled();
      //     expect(test.form.hasErrors()).toBe(true);
      //     Expect.isEmptyFieldError(test.form.oldPassFieldError());
      //     Expect.isEmptyFieldError(test.form.newPassFieldError());
      //     Expect.isEmptyFieldError(test.form.confirmPassFieldError());
      //   });
      // });
      //
      // itp('validates that new password is equal to confirm password', function () {
      //   return setup().then(function (test) {
      //     $.ajax.calls.reset();
      //     submitNewPass(test, 'newpass', 'differentnewpass');
      //     expect($.ajax).not.toHaveBeenCalled();
      //     expect(test.form.hasErrors()).toBe(true);
      //     expect(test.form.confirmPassFieldError().text())
      //       .toBe('New passwords must match');
      //   });
      // });

    });

    // Expect.describe('CustomPasswordExpired', function () {
    //
    //   itp('has the correct title', function () {
    //     return setupCustomExpiredPassword().then(function (test) {
    //       expect(test.form.titleText()).toBe('Your Okta password has expired');
    //     });
    //   });
    //   itp('has a valid subtitle', function () {
    //     return setupCustomExpiredPassword().then(function (test) {
    //       expect(test.form.subtitleText()).toEqual('This password is set on another website. ' +
    //           'Click the button below to go there and set a new password.');
    //     });
    //   });
    //   itp('has a custom change password button', function () {
    //     return setupCustomExpiredPassword().then(function (test) {
    //       expect(test.form.customButton().length).toBe(1);
    //     });
    //   });
    //   itp('has a valid custom button text', function () {
    //     return setupCustomExpiredPassword().then(function (test) {
    //       expect(test.form.customButtonText()).toEqual('Go to Twitter');
    //     });
    //   });
    //   itp('has a sign out link', function () {
    //     return setupCustomExpiredPassword().then(function (test) {
    //       Expect.isVisible(test.form.signoutLink());
    //     });
    //   });
    //   itp('does not have a skip link', function () {
    //     return setupCustomExpiredPassword().then(function (test) {
    //       expect(test.form.skipLink().length).toBe(0);
    //     });
    //   });
    //   itp('redirect is called with the correct arg on custom button click', function () {
    //     spyOn(SharedUtil, 'redirect');
    //     return setupCustomExpiredPassword().then(function (test) {
    //       test.form.clickCustomButton();
    //       expect(SharedUtil.redirect).toHaveBeenCalledWith('https://www.twitter.com');
    //     });
    //   });
    //
    // });

  });
});
