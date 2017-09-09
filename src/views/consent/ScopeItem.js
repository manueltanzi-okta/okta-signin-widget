/*!
 * Copyright (c) 2015-2016, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

define([
  'okta',
  'util/FactorUtil',
  'util/RouterUtil'
], function (Okta, FactorUtil, RouterUtil) {

  var _ = Okta._;

  return Okta.View.extend({
    className: 'scope-item', //clearfix?
    template: '\
      <div class="scope-item-wrapper">\
          <div class="scan-instructions-details">\
              TEST\
          </div>\
      </div>\
    ',
    // '\
    //   <div class="scan-instructions-details-wrapper">\
    //       <div class="scan-instructions-details">\
    //           <p>{{instructions}}</p>\
    //           {{#if params.innerTooltip}}\
    //         <span class="input-tooltip icon form-help-16"></span>\
    //     {{/if}}\
    //       </div>\
    //   </div>\
    // ',

    events: {
    },

    initialize: function () {
      console.log('here bitches');
      this.render();
    },

    // getTemplateData: function () {
    //   var factorName = FactorUtil.getFactorLabel(this.model.get('__provider__'), this.model.get('__factorType__'));
    //   var instructions;
    //   if (this.model.get('__provider__') === 'GOOGLE') {
    //     instructions = Okta.loc('enroll.totp.setupGoogleAuthApp', 'login', [factorName]);
    //   } else {
    //     instructions = Okta.loc('enroll.totp.setupApp', 'login', [factorName]);
    //   }
    //   return {
    //     instructions: instructions,
    //     qrcode: this.options.appState.get('qrcode')
    //   };
    // }
  });

});
