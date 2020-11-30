(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['MenuDataService', 'items'];
function ItemsController(MenuDataService, items) {
    var itemsCtrl = this;
    itemsCtrl.categoryName = items.data.category.name;
    itemsCtrl.items = items.data.menu_items;
}

})();
        