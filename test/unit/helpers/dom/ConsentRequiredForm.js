define(['./Form'], function (Form) {

  return Form.extend({

    orgLogo: function () {
      return this.$('.org-logo');
    },

    username: function () {
      return this.$('.username-wrapper');
    },

    userLogo: function () {
      return this.$('.user-logo');
    },

    clientLogo: function () {
      return this.$('.client-logo');
    },

    scopeList: function () {
      return this.$('.scope-list-wrapper');
    },

    consentTitle: function () {
      return this.$('.consent-title');
    },

    termsOfService: function () {
      return this.$('.terms-of-service');
    },

    privacyPolicy: function () {
      return this.$('.privacy-policy');
    },

    consentButton: function() {
      return this.$('.consent-button');
    },

    cancelButton: function() {
      return this.$('.cancel-button');
    }
  });

});
