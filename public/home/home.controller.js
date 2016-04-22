var app = angular.module('todo');

app.controller('homeController', home);

app.$inject = ['userService'];

function home(userService) {
  var vm = this;
  console.log(vm);
  vm.message = 'Welcome Home';
  console.log(vm.message);

  var user = userService.getUser('Ben');
  user.then(function(info) {
    console.log(vm);
    vm.user = info.data[0].user;
    console.log(vm);
    console.log(vm.message + ' ' + vm.user + '!');
  })
  console.log(vm);
}
