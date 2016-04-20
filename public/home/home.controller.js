var app = angular.module('todo');

app.controller('homeController', home);

app.$inject = ['userService'];

function home(userService) {
  var vm = this;
  vm.message = 'Welcome Home ';

  var user = userService.getUser('Ben');
  user.then(function(info) {
    console.log(info.data[0].user);
    vm.user = info.data[0].user;
  })
}
