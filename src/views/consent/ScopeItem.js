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
    className: 'scope-item', //clearfix?
    template: '\
      <div class="scope-item-text">\
        <p>{{name}}</p>\
      </div>\
      {{#if true}}\
        <span class="scope-item-tooltip icon form-help-16"></span>\
      {{/if}}\
    ',

    events: {
    },

    initialize: function () {
      console.log('here bitches');
      console.log(this);
      this.render();
    },

    // getTemplateData: function () {
    //   var name = FactorUtil.getFactorLabel(this.model.get('__provider__'), this.model.get('__factorType__'));
    //   return {
    //     name: instructions
    //   };
    // }
  });

});
