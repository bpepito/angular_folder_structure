(function () {
  "use strict";

  angular.module("todoApp").service("StorageService", StorageService);

  function StorageService() {
    var vm = this;
    var storage = {};

    vm.get = function (key) {
      return storage[key];
    };

    vm.set = function (key, value) {
      storage[key] = value;
    };

    vm.remove = function (key) {
      delete storage[key];
    };
  }
})();
