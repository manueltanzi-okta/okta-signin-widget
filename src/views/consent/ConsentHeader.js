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
  'okta'
], function (Okta) {

  var _ = Okta._;

  return Okta.View.extend({
    className: 'consent-header', // decide if to keep clearfix or not
    template: '\
      <div class="header-wrapper">\
        <div class="logo-wrapper">\
          <img class="client-logo" src="http://rain.okta1.com:1802/assets/img/logos/okta-logo.00b28e552573899e15fa6e77278759d5.png"/>\
        </div>\
        <div class="username-wrapper">{{userName}} {{userLastName}}</div>\
      </div>\
    ',

    events: {
    },

    postRender: function () {
      // console.log('modelinscoeplist', this.model);
      // // console.log('scopes', this.get('scopes'));
      // console.log('scopes', this.model.get('expiresAt'));
      // // setTimeout(() => {
      // this.model.get('scopes').forEach(scope => { // do with ES6 or _.
      //   console.log('scope', scope);
      //   var item = new ScopeItem({
      //     name: scope.name
      //   });
      //   this.$('.scope-list-wrapper').append(item.$el);
      // });
      // // }, 3000);
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
