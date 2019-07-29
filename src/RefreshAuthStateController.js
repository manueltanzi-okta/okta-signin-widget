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

define(['q', 'okta', 'util/FormController'], function (Q, Okta, FormController) {

  return FormController.extend({
    className: 'refresh-auth-state',

    Model: {},

    Form: {
      noButtonBar: true
    },

    preRender: function () {
      var appState = this.options.appState;
      this.model.startTransaction(function () {
        appState.trigger('loading', true);
        var trans = this.options.appState.get('introspectSuccess');
        var transError = this.options.appState.get('introspectError');
        if (trans && trans.data) {
          return Q.resolve(trans);
        } else {
          return Q.reject(transError);
        }
      });
    },

    remove: function () {
      this.options.appState.trigger('loading', false);
      return FormController.prototype.remove.apply(this, arguments);
    }

  });
});
