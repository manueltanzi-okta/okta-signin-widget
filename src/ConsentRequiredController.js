/*!
 * Copyright (c) 2017, Okta, Inc. and/or its affiliates. All rights reserved.
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
  'shared/util/Util',
  'util/FormController',
  'util/FormType',
  'views/consent/ConsentHeader',
  'views/consent/ConsentBeacon',
  'views/consent/ScopeList',
  'views/consent/ConsentButtonsBar'
],
function (Okta, Util, FormController, FormType, ConsentHeader, ConsentBeacon, ScopeList, ConsentButtonsBar) {

  var $ = Okta.$,
      _ = Okta._;

  return FormController.extend({
    className: 'consent-required',
    initialize: function () {
      this.model.set('expiresAt', this.options.appState.get('expiresAt'));
      this.model.set('scopes', this.options.appState.get('scopes'));
    },
    Model: {
      props: {
        expiresAt: ['string', true],
        scopes: ['array', true]
      },
      save: function () {
        return this.doTransaction(function(transaction) {
          return transaction.consent({
            consent: {
              expiresAt: this.get('expiresAt'),
              scopes: _.pluck(this.get('scopes'), 'name')
            }
          });
        });
      },
      cancel: function () {
        var self = this;
        return this.doTransaction(function(transaction) {
          return transaction.cancel();
        }).then(function () {
          self.settings.get('consent').cancel();
        });
      }
    },
    Form: {
      noButtonBar: true,
      formChildren: function () {
        var appState = this.options.appState;
        return [
          FormType.View({
            View: Okta.View.extend({
              className: 'consent-title',
              template: '\
                <p><b>{{appName}}</b> wants to access yor account (<b>{{userConsentName}}</b>) in order to:</p>\
              ',
              getTemplateData: function () {
                return {
                  appName: appState.get('targetLabel'),
                  userConsentName: appState.get('userConsentName') || appState.get('userProfile').firstName || appState.get('username')
                };
              }
            })
          }),
          FormType.View({
            View: new ScopeList({ model: this.model })
          }),
          FormType.View({
            View: Okta.View.extend({
              className: 'consent-description',
              template: '\
                <p>{{i18n code="consent.required.description" bundle="login"}}</p>\
                {{#if termsOfService}}\
                  <a class="terms-of-service" href="{{termsOfService}}" target="_blank">\
                    {{i18n code="consent.required.termsOfService" bundle="login"}}\
                  </a>\
                  {{#if privacyPolicy}}\
                    &#8226\
                  {{/if}}\
                {{/if}}\
                {{#if privacyPolicy}}\
                  <a class="privacy-policy" href="{{privacyPolicy}}" target="_blank">\
                    {{i18n code="consent.required.privacyPolicy" bundle="login"}}\
                  </a>\
                {{/if}}\
              ',
              getTemplateData: function () {
                return {
                  termsOfService: appState.get('targetTermsOfService') && appState.get('targetTermsOfService').href,
                  privacyPolicy: appState.get('targetPrivacyPolicy') && appState.get('targetPrivacyPolicy').href
                };
              }
            })
          }),
          FormType.View({
            View: new ConsentButtonsBar({ model: this.model })
          })
        ];
      }
    }
  });

});
