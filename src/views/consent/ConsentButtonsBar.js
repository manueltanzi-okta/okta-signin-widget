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

  return Okta.View.extend({
    className: 'consent-button-bar',
    template: '\
      <input type="button" class="consent-button" value="{{consentValue}}" />\
      <input type="button" class="cancel-button" value="{{cancelValue}}" />\
    ',

    events: {
      'click input.consent-button': 'consent',
      'click input.cancel-button': 'cancel'
    },

    consent: function () {
      this.model.save();
    },

    cancel: function () {
      this.model.cancel();
    },

    getTemplateData: function () {
      return {
        'consentValue': Okta.loc('consent.required.consentButton', 'login'),
        'cancelValue': Okta.loc('consent.required.cancelButton', 'login')
      };
    }
  });

});
