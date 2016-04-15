var app = angular.module('todo', []);

app.controller('homeController', home);

app.$inject = ['$http'];

function home($http) {
  var vm = this;
  vm.message = 'Welcome Home ';

  var user = $http.get('http://localhost:1337/user');
  user.then(function(info) {
    vm.user = info.data;
  })
}

app.controller('todoController', todo);

function todo($http) {
  vm = this;
  activate();

  function activate() {
    getTodos();
  }

  function getTodos() {
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
      var payload = JSON.stringify({task: vm.todoText});
      var todos = $http.post('http://localhost:1337/todo', payload);
      todos.then(function() {
        getTodos();
      });
    }
    vm.todoText = '';
  };
}
