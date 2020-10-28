(function () {
  'use strict';
  
  var defaultShoppingList = [
    { name: "cookies", quantity: 10, pricePerItem: 1.5 },
    { name: "whole chickens", quantity: 15, pricePerItem: 0.03 },
    { name: "mini eclairs", quantity: 42, pricePerItem: 0.50 },
    { name: "Ronald McDonald", quantity: 1, pricePerItem: 1000000 },
    { name: "iPhones", quantity: 1000, pricePerItem: 799 },
    { name: "college scholarships", quantity: 7, pricePerItem: 150000 },
    { name: "houses", quantity: 8, pricePerItem: 400000 }
  ];
  
  // Declaring my angular module here
  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
  .filter('ngDollars', NgDollarsFilter);
  
  // Defining my controllers here
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtList = this;
    boughtList.items = ShoppingListCheckOffService.getBoughtItems();
  }
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyList = this;
    toBuyList.items = ShoppingListCheckOffService.getToBuyItems();
    toBuyList.buy = function(idx) {
      ShoppingListCheckOffService.buy(idx);
    };
  }
  
  // Service stuff here
  function ShoppingListCheckOffService() {
    var service = this;
    var toBuyItems = [];
    var boughtItems = [];
  
    // Load initial list
    toBuyItems = defaultShoppingList;
  
    service.getToBuyItems = function() {
      return toBuyItems;
    };
    service.getBoughtItems = function() {
      return boughtItems;
    };
    service.buy = function(idx) {
      var x = toBuyItems.splice(idx, 1);
      // splice returns an array, even if only 1 element, so much
      // get it out
      boughtItems.push(x[0]);
    };
  }

  // Filter stuff here
  // part 2d says to build your own custom filter but I'm pretty sure we could just do:
  // {{list.pricePerItem | currency : '$$$'}}
  // Regardless, I made my own so I can get credit
  NgDollarsFilter.$inject = ['$filter'];
  function NgDollarsFilter(filter) {
    var currencyFilter = filter('currency');
    var ngDollarsSymbol = '\$\$\$';
    return function(amount) {
      amount = amount || 0;
      var result = currencyFilter(amount);
      result = ngDollarsSymbol + result.substr(1);
      return result;
    };
  }
  
  })();
  