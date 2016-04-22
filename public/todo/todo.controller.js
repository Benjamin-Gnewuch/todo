var app = angular.module('todo');

app.controller('todoController', todo);
app.$inject = ['$http', 'userService'];

function todo($http, userService) {
  vm = this;
  activate();

  function activate() {
    getUser();
    getTodos();
  }

  function getTodos() {
    console.log("getTodos Called");
    var todos = $http.get('http://localhost:1337/todos/Ben');
    todos.then(function(todo) {
      vm.list = todo.data;
    });
  }

  vm.finished = function(item) {
    var payload = JSON.stringify({task: item});
    var todos = $http.delete('http://localhost:1337/todoFinish/' + item.task, payload);
    todos.then(function(todo) {
      getTodos();
    });
  }

  vm.addTodo = function() {
    if(vm.todoText != '' && vm.todoText != undefined) {
      var payload = JSON.stringify({task: vm.todoText, date: vm.todoDate});
      var todos = $http.post('http://localhost:1337/todo', payload);
      todos.then(function() {
        getTodos();
      });
    }
    vm.todoText = '';
  };

  function getUser() {
    var user = userService.getUser('Ben');
    user.then(function(user) {
      vm.user = (user.data[0].user) + "'s Todo List";
    });
  }
}
