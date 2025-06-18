(function () {
  "use strict";

  angular.module("todoApp").service("NotificationService", NotificationService);

  NotificationService.$inject = ["$timeout"];

  function NotificationService($timeout) {
    var vm = this;

    var notification = {
      show: false,
      message: "",
      type: "success",
    };

    vm.getNotification = function () {
      return notification;
    };

    vm.showSuccess = function (message) {
      vm.show(message, "success");
    };

    vm.showError = function (message) {
      vm.show(message, "error");
    };

    vm.show = function (message, type) {
      notification.message = message;
      notification.type = type || "success";
      notification.show = true;

      $timeout(function () {
        notification.show = false;
      }, 3000);
    };
  }
})();
