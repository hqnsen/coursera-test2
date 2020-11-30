(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

    // Home page
    .state('home', {
        url: '/',
        templateUrl: 'src/home.template.html'
    })

    // Show all categories page
    .state('categories', {
        url: '/categories',
        templateUrl: 'src/categories.template.html',
        controller: 'MenuDataController as menuData',
        resolve: {
            items: ['MenuDataService', function (MenuDataService) {
                return MenuDataService.getAllItems();
            }]
        }
    })

    .state('categories.items', {
        url: '/items/{itemId}',
        templateUrl: 'src/items.template.html',
        controller: "ItemDetailController as itemDetail"
    });

}

})();
