var app = angular.module('todo');

app.factory('userService', userService);

userService.$inject = ['$http'];

function userService($http) {
  function getUser(name) {
    console.log(name);
    return $http.get('http://localhost:1337/user/' + name);
  }
  function authorize(name, pw) {
    return $http.post('http://localhost:1337/login/')
  }
  return {
    getUser : getUser
  }
}
