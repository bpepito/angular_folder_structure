(function () {
  "use strict";

  angular.module("todoApp").controller("TodoController", TodoController);

  TodoController.$inject = [
    "$scope",
    "TodoService",
    "Todo2Service",
    "NotificationService",
    "StorageService",
  ];

  function TodoController(
    $scope,
    TodoService,
    Todo2Service,
    NotificationService,
    StorageService
  ) {
    var vm = this;

    // Bindable properties
    vm.todos = [];
    vm.newTodo = {};
    vm.currentFilter = "all";
    vm.notification = NotificationService.getNotification();
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
      var savedFilter = StorageService.get("todoFilter");
      if (savedFilter) {
        vm.currentFilter = savedFilter;
      }
    }

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
        NotificationService.showSuccess("Todo added successfully!");
      }
    }

    function deleteTodo(id) {
      Todo2Service.deleteTodo(id);
      NotificationService.showSuccess("Todo deleted successfully.");
      loadTodos();
    }

    function toggleTodo(id) {
      var updated = Todo2Service.toggleTodo(id);
      var message = updated.completed
        ? "Todo completed!"
        : "Todo marked as active!";
      NotificationService.showSuccess(message);
      loadTodos();
    }

    function setFilter(filter) {
      vm.currentFilter = filter;
      StorageService.set("todoFilter", filter);
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
      return TodoService.getTodoStats().total;
    }

    function getActiveCount() {
      return TodoService.getTodoStats().active;
    }

    function getCompletedCount() {
      return TodoService.getTodoStats().completed;
    }

    function getCompletionRate() {
      return TodoService.getTodoStats().completionRate;
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

      NotificationService.showSuccess("Welcome to your Todo App!");
    }
  }
})();
