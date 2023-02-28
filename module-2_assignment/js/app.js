(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var itemToBuy = this;

  itemToBuy.items = ShoppingListCheckOffService.getToBuyList();

  itemToBuy.buyItem = function(itemIndex) {
    try {
      ShoppingListCheckOffService.addItemToBoughtList(itemIndex);
    }
    catch(error) {
      itemToBuy.errorMessage=error.message;
    }
  };


}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var itemBought = this;
  var blnBoughtListNotEmpty = false;

  itemBought.items = ShoppingListCheckOffService.getAlreadyBoughtList();
}

function ShoppingListCheckOffService() {
  var service = this;
  var blnBoughtListNotEmpty = false;

  var toBuyList = [
    {
      name: "Milk",
      quantity: "2 bottles",
      bought:false
    },
    {
      name: "Donuts",
      quantity: "2 dozen",
      bought:false
    },
    {
      name: "Cookies",
      quantity: "3 boxes",
      bought:false
    },
    {
      name: "Chocolate",
      quantity: "5 bars",
      bought:false
    },
    {
      name: "Frozen Pizza",
      quantity: "5 boxes",
      bought:false
    }
  ];

  var alreadyBoughtList = [];

  service.getToBuyList = function () {
    return toBuyList;
  };

  service.getAlreadyBoughtList = function() {
    return alreadyBoughtList;
  };

  service.addItemToBoughtList = function(itemIndex) {
    var tempItem = toBuyList[itemIndex];
    var newItem = {
      name: tempItem.name,
      quantity: tempItem.quantity
    };
    alreadyBoughtList.push(newItem);
    toBuyList[itemIndex].bought=true;
    blnBoughtListNotEmpty = true;
    service.checkForOpenItems();
  }

  service.getBoughtListStatus = function() {
    return blnBoughtListNotEmpty;
  }

  service.checkForOpenItems = function() {
    var counter = 0;
    for(var i=0;i<toBuyList.length;i++){
      if(toBuyList[i].bought) {
        counter++;
      }
    }
    if(counter===toBuyList.length) {
      throw new Error("Everything is bought!");
    }

  };

}

})();
