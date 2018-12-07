/*!
 * Copyright (c) 2018-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

define(function () {
  var fn = {};

  var lighten = function (hex, lum) {
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    var newHex = '#';
    for (var i = 0; i < 3; i++) {
      var c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      newHex += ('00' + c).substr(c.length);
    }
    return newHex;
  };

  var template = function (colors) {
    return `
      #okta-sign-in.auth-container .button-primary,
      #okta-sign-in.auth-container .button-primary:active,
      #okta-sign-in.auth-container .button-primary:focus { background: ${colors.brand}; }
      #okta-sign-in.auth-container .button-primary:hover { background: ${lighten(colors.brand, 0.05)}; }
      #okta-sign-in.auth-container .button.button-primary.link-button-disabled {
        background: ${colors.brand};
        opacity: 0.5;
      }
    `;
  };

  fn.addStyle = function (colors) {
    var css = template(colors);
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

    style.id = 'config-colors';
    style.type = 'text/css';

    if (style.styleSheet) {
      // IE8 and below.
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
  };

  fn.isLoaded = function () {
    return !!document.getElementById('config-colors');
  };

  return fn;
});
