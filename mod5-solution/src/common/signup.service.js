(function () {
    "use strict";
    
    angular.module('common')
    .service('SignupService', SignupService);
    
    
    SignupService.$inject = ['$http', 'ApiPath'];
    function SignupService($http, ApiPath) {
        var service = this;
        
        service.getMenuItem = function (shortname) {
            if (!shortname) {
                console.log('WARN: No shortname in signup service');
            }

            return $http.get(ApiPath + '/menu_items/'+shortname+'.json').then(function (response) {
                return response.data;
            });
        };

        /* Expects:
                var obj = {
                    'firstname': signup.firstname,
                    'lastname': signup.lastname,
                    'email': signup.email,
                    'phone': signup.phone,
                    'favefoodshortname': signup.favefood,
                    'favefoodname': signup.response.name,
                    'favefooddescription': signup.response.description
                };
        */
        service.saveSignup = function (signupData) {
            service.data = signupData;
            console.log("saved in service");
        };
    
    }
    
    
    
})();
    