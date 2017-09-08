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
  'util/FormType'
],
function (Okta, FormController, FormType) {

  var _ = Okta._;

  return FormController.extend({
    className: 'consent-required',
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
              scopes: this.get('scopes')
            }
          });
        });
      }
    },
    Form: {
      noButtonBar: true,
      title: function () {
        return 'Consent Required';
      },
      subtitle: function () {
        return 'Click button to give consent';
      },
      formChildren: function () {
        return [
          FormType.Button({
            title: 'CONSENT',
            className: 'button button-primary button-wide',
            attributes: {'data-se': 'custom-button'},
            click: function () {
              this.model.set('expiresAt', this.options.appState.get('transaction').expiresAt);
              this.model.set('scopes', _.pluck(this.options.appState.get('transaction').scopes, 'name'));
              this.model.save();
            }
          })
        ];
      }
    }
  });

});
