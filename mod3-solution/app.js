(function () {
  'use strict';
  
  
  // Declaring my angular module here
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('MenuItemsUrl', "https://davids-restaurant.herokuapp.com/menu_items.json");

  function FoundItemsDirective() {
    var ddo = {
      restrict: "E",
      templateUrl: 'foundItems.html',
      scope: {
        foundItems: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };
  
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var ctrl = this;
    ctrl.noResults = function() {
      if (ctrl.foundItems === undefined) {
        return true;
      }
      if (ctrl.foundItems.length < 1) {
        return true;
      }
      return false;
    };
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;
    ctrl.removeItem = function (itemIndex) {
      if (ctrl.found !== undefined) {
        ctrl.found.splice(itemIndex, 1);
      } else {
        console.log("Could not remove item at index "+itemIndex+" because list is empty");
      }
    };
    ctrl.narrowIt = function () {
      var menuMatchesPromise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
      menuMatchesPromise.then(function (response) {
        ctrl.found = response;
      }).catch(function (error) {
        console.log(error);
      });
    };
  }

  MenuSearchService.$inject = ['$http', 'MenuItemsUrl'];
  function MenuSearchService($http, MenuItemsUrl) {
    var service = this;
    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: "GET",
        url: MenuItemsUrl
      }).then(function(result) {
        // process results and only keep items that match
        var foundItems = [];
        for (var i = 0; i < result.data.menu_items.length; i++) {
          var description = result.data.menu_items[i].description;
          if (description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
            foundItems.push(result.data.menu_items[i]);
          }
        }
        return foundItems;
      });
    };
  }


  
  
})();
  