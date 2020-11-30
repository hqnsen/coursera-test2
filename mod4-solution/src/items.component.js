(function () {
'use strict';

angular.module('MenuApp')
.component('itemsbycat', {
    templateUrl: 'src/items.component.template.html',
    bindings: {
        items: '<',
        categoryName: '<'
    }
});

})();
        