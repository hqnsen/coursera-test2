(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

    .state('home', {
        url: '/',
        templateUrl: 'src/home.template.html'
    })

    .state('categories', {
        url: '/categories',
        templateUrl: 'src/categories.template.html',
        controller: 'CategoriesController as categories',
        resolve: {
            items: ['MenuDataService', function (MenuDataService) {
                return MenuDataService.getAllCategories();
            }]
        }
    })

    .state('items', {
        url: '/items/{itemId}',
        templateUrl: 'src/items.template.html',
        controller: "ItemsController as itemsByCat",
        resolve: {
            items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                var shortName = $stateParams.itemId;
                console.log(shortName);
                return MenuDataService.getItemsForCategory(shortName);
            }]
        }
    });

}

})();
