/**
 * jQuery alias handler. Won't be called until the qQuery and the DOM loads
 */
$(function() {
  'use strict';

  /**
   * @name loginUser
   * @description Login helper function. Makes API call to api/v1/login
   * @param email {string}
   * @param password {string} << should be hashed in actual use!
   */
  function loginUser(email, password) {
    var request = $.post('api/v1/login', {
      email: email,
      password: password
    });
    request.done(function(data) {
      $('.status').text('Login successful');
    });
    request.fail(function(err) {
      $('.status').text('Login unsuccessful');
    });
  }

  /**
   * jQuery event handler for login button. Calls loginUser with form data.
   */
  $('.login').click(function() {
    var email = $('.email').val()
      , password = $('.password').val();
    loginUser(email, password);
  });
});
