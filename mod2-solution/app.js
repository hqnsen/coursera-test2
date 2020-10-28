(function () {
'use strict';

var defaultShoppingList = [
  { name: "cookies", quantity: 10 },
  { name: "whole chickens", quantity: 15 },
  { name: "mini eclairs", quantity: 42 },
  { name: "Ronald McDonald", quantity: 1 },
  { name: "iPhones", quantity: 1000 },
  { name: "college scholarships", quantity: 7 },
  { name: "houses", quantity: 8 }
];

// Declaring my angular module here
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

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

})();
