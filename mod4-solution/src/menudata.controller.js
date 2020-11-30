(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuDataController', MenuDataController);

MenuDataController.$inject = ['MenuDataService', 'items'];
function MenuDataController(MenuDataService, items) {
    var menuData = this;
    menuData.items = items;
}

})();
    