(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var itemToBuy = this;
  var itemsBought = 0;
  var soldOut = false;

  itemToBuy.items = ShoppingListCheckOffService.getToBuyList();

  itemToBuy.buyItem = function(itemIndex) {
    try {
      ShoppingListCheckOffService.addItemToBoughtList(itemIndex);
      itemsBought++;
      //console.log(itemsBought);
    }
    catch(error) {
      console.log("error caught");
      itemToBuy.errorMessage=error.message;
    }
    console.log(itemToBuy.errorMessage);
    /*if(itemsBought===itemToBuy.items.length) {
      itemToBuy.soldOut = true;
    }
    if(soldOut) {
      throw new Error("Everything is bought!");
    }*/

  };


}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var itemBought = this;
  var blnBoughtListNotEmpty = false;

  itemBought.items = ShoppingListCheckOffService.getAlreadyBoughtList();
  //console.log(itemBought.items.length);
  //itemAdder.itemName = "";
  //itemAdder.itemQuantity = "";

  /*
  itemBought.addItem = function () {
    ShoppingListService.addItem(itemBought.itemName, itemBought.itemQuantity);
  }*/
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
    //console.log("toBuyList.length:", toBuyList.length);
    for(var i=0;i<toBuyList.length;i++){
      //console.log("toBuyList[i].bought:", (toBuyList[i].bought));
      if(toBuyList[i].bought) {
        counter++;
      }
    }
    //console.log(counter);
    //console.log("console.log(counter===toBuyList.length: ", (counter===toBuyList.length));
    if(counter===toBuyList.length) {
      console.log("Error was thrown");
      throw new Error("Everything is bought!");
    }

  };

}

})();
