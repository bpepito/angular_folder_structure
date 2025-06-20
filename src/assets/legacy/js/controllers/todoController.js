(function () {
  "use strict";

  angular.module("todoApp").controller("TodoController", TodoController);

  TodoController.$inject = [
    "$scope",
    "TodoService",
    "Todo2Service",
    // "NotificationService",
    "Notification2Service",
    // "StorageService",
    "Storage2Service",
  ];

  function TodoController(
    $scope,
    TodoService,
    Todo2Service,
    // NotificationService,
    Notification2Service,
    // StorageService,
    Storage2Service
  ) {
    var vm = this;

    // Bindable properties
    vm.todos = [];
    vm.newTodo = {};
    vm.currentFilter = "all";
    vm.notification = Notification2Service.getNotification();
    vm.watchCollection = [];

    // Bindable methods
    vm.addTodo = addTodo;
    vm.deleteTodo = deleteTodo;
    vm.toggleTodo = toggleTodo;
    vm.setFilter = setFilter;
    vm.getFilteredTodos = getFilteredTodos;
    vm.getTotalCount = getTotalCount;
    vm.getActiveCount = getActiveCount;
    vm.getCompletedCount = getCompletedCount;
    vm.getCompletionRate = getCompletionRate;

    // Initialize
    activate();

    function activate() {
      if (Todo2Service.getAllTodos().length === 0) {
        loadSampleData();
      }

      loadTodos();
      resetForm();

      // Load saved filter
      var savedFilter = Storage2Service.get("todoFilter");
      if (savedFilter) {
        vm.currentFilter = savedFilter;
      }
    }

    Notification2Service.getState$().subscribe((state) => {
      $scope.$applyAsync(() => {
        vm.notification = state;
      });
    });

    function loadTodos() {
      vm.todos = Todo2Service.getAllTodos();
    }

    function resetForm() {
      vm.newTodo = {
        text: "",
      };
    }

    function addTodo() {
      if (vm.newTodo.text && vm.newTodo.text.trim()) {
        Todo2Service.addTodo(vm.newTodo);
        loadTodos();
        resetForm();
        Notification2Service.showNotification(
          "Todo added successfully!",
          "success"
        );
      }
    }

    function deleteTodo(id) {
      Todo2Service.deleteTodo(id);
      Notification2Service.showNotification(
        "Todo deleted successfully.",
        "success"
      );
      loadTodos();
    }

    function toggleTodo(id) {
      Todo2Service.toggleTodo(id);
      var updated = Todo2Service.getAllTodos().find((todo) => todo.id === id);
      var message = updated.completed
        ? "Todo completed!"
        : "Todo marked as active!";
      Notification2Service.showNotification(message, "success");
      loadTodos();
    }

    function setFilter(filter) {
      vm.currentFilter = filter;
      Storage2Service.set("todoFilter", filter);
    }

    function getFilteredTodos() {
      if (vm.currentFilter === "all") {
        return vm.todos;
      } else if (vm.currentFilter === "active") {
        return vm.todos.filter(function (todo) {
          return !todo.completed;
        });
      } else if (vm.currentFilter === "completed") {
        return vm.todos.filter(function (todo) {
          return todo.completed;
        });
      }
      return vm.todos;
    }

    // Stats
    function getTotalCount() {
      return Todo2Service.getTodoStats().total;
    }

    function getActiveCount() {
      return Todo2Service.getTodoStats().active;
    }

    function getCompletedCount() {
      return Todo2Service.getTodoStats().completed;
    }

    function getCompletionRate() {
      return Todo2Service.getTodoStats().completionRate;
    }

    // Watch for changes
    $scope.$watchCollection(
      function () {
        return vm.todos;
      },
      function (newTodos, oldTodos) {
        if (newTodos !== oldTodos) {
          console.log("Todos changed:", Todo2Service.getTodoStats());
        }
      }
    );

    function loadSampleData() {
      const sampleTodos = [
        { text: "Learn AngularJS", completed: true },
        { text: "Build a todo app", completed: false },
        { text: "Master $scope and services", completed: false },
      ];

      sampleTodos.forEach((todo) => {
        Todo2Service.addTodo(todo);
      });

      loadTodos();

      Notification2Service.showNotification(
        "Welcome to your Todo App!",
        "success"
      );
    }
  }
})();
