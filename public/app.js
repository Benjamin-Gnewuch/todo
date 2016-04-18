var app = angular.module('todo', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when("/todo", {
    templateUrl: "/todo/viewtodo.html",
    controller: "todoController",
    controllerAs: "todo"
  })
  .when("/home", {
    templateUrl: "/home/viewhome.html",
    controller: "homeController",
    controllerAs: "home"
  })
}]);
