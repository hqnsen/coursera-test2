(function() {
    'use strict';
    angular.module('public')
    .controller('SignupController', SignupController);

    SignupController.$inject = ['SignupService'];
    function SignupController(SignupService) {
        var signup = this;

        signup.submit = function () {
            console.log("boom!");

            signup.saved = true;

            if (signup.validFavefood) {
                var obj = {
                    'firstname': signup.firstname,
                    'lastname': signup.lastname,
                    'email': signup.email,
                    'phone': signup.phone,
                    'favefoodshortname': signup.favefood,
                    'favefoodname': signup.response.name,
                    'favefooddescription': signup.response.description
                };
                SignupService.saveSignup(obj);
            } else {
                console.log("hi");
                signup.saved = false;
            }
        };

        signup.checkFavefood = function() {
            signup.queryMade = true;
            if (!signup.favefood) {
                signup.queryMade = false;
                return;
            }
            console.log(signup.favefood);
            var resultPromise = SignupService.getMenuItem(signup.favefood);
            resultPromise.then(
                function successCallback(response) {
                    console.log("BOOM BOOM");
                    console.log(response);
                    signup.validFavefood = true;
                    signup.response = response;

                }, function errorCallback() {
                    console.log("BOOM GOES THE ERROR");
                    delete signup.validFavefood;
                }
            );
        };
    }
})();