var app = angular.module('todo');

app.factory('userService', userService);

userService.$inject = ['$http'];

function userService($http) {
  function getUser(name) {
    console.log(name);
    return $http.get('http://localhost:1337/user/' + name);
  }
  return {
    getUser : getUser
  }
}
