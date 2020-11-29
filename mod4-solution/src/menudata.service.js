(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);

function MenuDataService() {
    var service = this;
    var baseUrl = 'https://davids-restaurant.herokuapp.com/';
    service.getAllCategories = function() {
        var allCatsUrl = baseUrl+'categories.json';
        return $http.get(allCatsUrl);
    };
    service.getItemsForCategory = function(categoryShortName) {
        var getUrl = baseUrl+'menu_items.json?category='+categoryShortName;
        return $http.get(getUrl);
    };
}

})();