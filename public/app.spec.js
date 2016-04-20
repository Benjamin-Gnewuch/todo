var webPage = require('webpage');
var page = webPage.create();

page.viewportSize = {width: 1920, height: 1080};

page.onConsoleMessage = function(msg) {
  console.log(msg);
}

page.open('http://localhost:1337', function start(status) {
  page.includeJs('https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js',
  function() {
    page.evaluate(function() {
      $('#todo-button')[0].click();
    });
  });

  setTimeout(function() {
    page.render('todo-after.jpeg', {format: 'jpeg', quality: '100'});
    phantom.exit();
  }, 1000);
});
