(function() {
    'use strict';
    angular.module('public')
    .controller('MyinfoController', MyinfoController);

    MyinfoController.$inject = ['SignupService', 'ApiPath'];
    function MyinfoController(SignupService, ApiPath) {
        var myinfo = this;
        myinfo.basePath = ApiPath;
        myinfo.data = SignupService.data;
    };
})();