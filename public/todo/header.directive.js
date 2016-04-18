var app = angular.module('todo');

app.directive('todoheader', header);

function header() {
  return {
    templateUrl: 'todo/header.directive.html'
  }
}
