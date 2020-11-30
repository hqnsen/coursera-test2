(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http'];
function MenuDataService($http) {
    console.log("Hello world");
    var service = this;
    var baseUrl = 'https://davids-restaurant.herokuapp.com/';
    service.getAllCategories = function() {
        console.log("getAllCategories called");
        var allCatsUrl = baseUrl+'categories.json';
        return $http.get(allCatsUrl);
    };
    service.getItemsForCategory = function(categoryShortName) {
        var getUrl = baseUrl+'menu_items.json?category='+categoryShortName;
        return $http.get(getUrl);
    };
}

})();