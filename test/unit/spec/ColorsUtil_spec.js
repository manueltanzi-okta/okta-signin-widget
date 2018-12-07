define([
  'okta',
  'helpers/util/Expect',
  'util/ColorsUtil'
],
function (Okta, Expect, ColorsUtil) {
  var $ = Okta.$;

  var normalize = function (text) {
    return text.replace(/\s+/g, ' ');
  }

  Expect.describe('ColorsUtil', function () {
    afterEach(function () {
      $('#config-colors').remove();
    });

    Expect.describe('addStyle', function () {
      it('appends the correct style to head', function () {
        var colors = {
          brand: '#008000'
        };
        var expectedStyle = `
          #okta-sign-in.auth-container .button-primary,
          #okta-sign-in.auth-container .button-primary:active,
          #okta-sign-in.auth-container .button-primary:focus { background: #008000; }
          #okta-sign-in.auth-container .button-primary:hover { background: #008600; }
          #okta-sign-in.auth-container .button.button-primary.link-button-disabled {
            background: #008000;
            opacity: 0.5;
          }
        `;

        ColorsUtil.addStyle(colors);
        expect($('#config-colors')).toBeDefined();
        expect(normalize($('#config-colors').text())).toBe(normalize(expectedStyle));
      });
    });

    Expect.describe('isLoaded', function () {
      it('returns false if no config-color style was added', function () {
        expect(ColorsUtil.isLoaded()).toBe(false);
      });
      it('returns true if config-color style was added', function () {
        var colors = {
          brand: '#008000'
        };
        ColorsUtil.addStyle(colors);
        expect(ColorsUtil.isLoaded()).toBe(true);
      });
    });
  });
});
