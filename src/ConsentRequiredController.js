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
  'util/FormController',
  'util/FormType',
  'views/consent/ConsentBeacon',
  'views/consent/ScopeList',
  'views/consent/ConsentButtonsBar'
],
function (Okta, FormController, FormType, ConsentBeacon, ScopeList, ConsentButtonsBar) {

  var _ = Okta._;

  return FormController.extend({
    className: 'consent-required',
    initialize: function () {
      // this.addSectionTitle('test');
      console.log('transaction', this.options.appState.get('transaction'));
      this.model.set('expiresAt', this.options.appState.get('transaction').expiresAt);
      // this.model.set('scopes', this.options.appState.get('transaction').scopes);
      this.model.set('scopes', [{name: 'View profile information', description: 'ASD1'}, {name: 'Schedule appointments', description: 'ASD2'}, {name: 'Cancel appointments', description: 'ASD3'}, {name: 'Edit appointments', description: 'ASD4'}]);
    },
    Model: {
      props: {
        expiresAt: ['string', true],
        scopes: ['array', true]
      },
      save: function () {
        console.log(this);
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
          console.log('self', self);
          self.state.set('navigateDir', Enums.DIRECTION_BACK);
          self.options.appState.trigger('navigate', '');
        });
      }
    },
    Form: {
      noButtonBar: true,
      // title: function () {
      //   return 'Consent Required';
      // },
      // subtitle: function () {
      //   return 'Click button to give consent';
      // },
      formChildren: function () {
        return [
          FormType.View({
            View: new ConsentBeacon({ model: this.model })
          }),
          FormType.View({
            View: Okta.View.extend({
              className: 'consent-title',
              template: '\
                <p><b>{{appName}}</b> is requesting permissions to:</p>\
              ',
              getTemplateData: function () {
                return { appName: this.options.appState.get('transaction').target.label };
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
                <p>By clicking Allow Access, you allow this app access to the actions listed above.</p>\
                {{#if termsOfService}}\
                  <a href="{{termsOfService}}">\
                    Terms of Service\
                  </a>\
                {{/if}}\
                {{#if termsOfService}}{{#if privacyPolicy}}\
                  &#8226\
                {{/if}}{{/if}}\
                {{#if privacyPolicy}}\
                  <a href="{{privacyPolicy}}">\
                    Privacy Policy\
                  </a>\
                {{/if}}\
              ',
              getTemplateData: function () {
                return {
                  termsOfService: 'link1', //this.options.appState.get('transaction').target.terms-of-service.href,
                  privacyPolicy: 'link2' //this.options.appState.get('transaction').target.privacy-policy.href
                }
              }
            })
          }),
          FormType.View({
            View: new ConsentButtonsBar({ model: this.model })
          }),
          // FormType.Button({
          //   title: 'CONSENT',
          //   className: 'button-primary button next link-button',
          //   // attributes: {'data-se': 'custom-button'},
          //   click: function () {
          //     // this.model.set('expiresAt', this.options.appState.get('transaction').expiresAt);
          //     // this.model.set('scopes', _.pluck(this.options.appState.get('transaction').scopes, 'name'));
          //     this.model.save();
          //   }
          // }),
          // FormType.Button({
          //   title: 'CANCEL',
          //   className: 'button-primary button next link-button',
          //   // attributes: {'data-se': 'custom-button'},
          //   click: function () {
          //     this.model.cancel();
          //   }
          // })
        ];
      }
    }
  });

});
