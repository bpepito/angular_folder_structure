(function () {
  "use strict";

  angular.module("todoApp").service("TodoService", TodoService);

  TodoService.$inject = ["NotificationService"];

  function TodoService(NotificationService) {
    var vm = this;

    var todos = [];
    var nextId = 1;

    vm.getAllTodos = getAllTodos;
    vm.getTodoById = getTodoById;
    vm.addTodo = addTodo;
    vm.deleteTodo = deleteTodo;
    vm.toggleTodo = toggleTodo;
    vm.getCompletedTodos = getCompletedTodos;
    vm.getTodoStats = getTodoStats;

    loadSampleData();

    function getAllTodos() {
      return angular.copy(todos);
    }

    function getTodoById(id) {
      return _.find(todos, { id: id });
    }

    function addTodo(todo) {
      var newTodo = {
        id: nextId++,
        text: todo.text,
        completed: false,
        createdAt: new Date(),
      };
      todos.push(newTodo);
      return angular.copy(newTodo);
    }

    function deleteTodo(id) {
      for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
          return todos.splice(i, 1)[0];
        }
      }
      return null;
    }

    function toggleTodo(id) {
      var todo = getTodoById(id);
      if (todo) {
        todo.completed = !todo.completed;
        todo.completedAt = todo.completed ? new Date() : null;
        return angular.copy(todo);
      }
      return null;
    }

    function getCompletedTodos() {
      return _.filter(todos, { completed: true });
    }

    function getTodoStats() {
      var total = todos.length;
      var completed = getCompletedTodos().length;

      return {
        total: total,
        completed: completed,
        active: total - completed,
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      };
    }

    function loadSampleData() {
      var sampleTodos = [
        { text: "Learn AngularJS", completed: true },
        { text: "Build a todo app", completed: false },
        { text: "Master $scope and services", completed: false },
      ];

      _.each(sampleTodos, function (todo) {
        addTodo(todo);
      });

      NotificationService.showSuccess("Welcome to your Todo App!");
    }
  }
})();
