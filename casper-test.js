casper.test.begin('Todo test', 5, function suite(test) {
  casper.start('http://localhost:1337' , function() {

    casper.then(function() {
      this.click('#todo-button');
      casper.waitForSelector('#add-text', function() {
        casper.sendKeys('#add-text', 'Test');
        return casper.click('#add-button');
      });
    });

    casper.then(function() {
      casper.wait(3000, function() {
        test.assertSelectorHasText('ul > li:last-child > span.ng-binding', 'Test');
        if(this.fetchText('ul > li:last-child > span.ng-binding') == 'Test') {
          this.click('ul li:last-child input');
        }
      });
    });

    casper.then(function() {
      casper.wait(500, function() {
        test.assertSelectorDoesntHaveText('ul > li:last-child > span.ng-binding', 'Test');
        test.assertSelectorHasText('ul > li:last-child > span.ng-binding', 'Merge');
      })
    });

    casper.then(function() {
      casper.waitForSelector('#todo-header', function() {
        casper.wait(1500, function() {
          test.assertSelectorHasText('#todo-header', "Ben's Todo List");
        });
      });
    });

    casper.then(function() {
      this.click('#home-button');
      casper.waitForSelector('h2', function() {
        casper.wait(2000, function() {
          if(this.exists('h2.col-md-12')) {
            test.assertSelectorHasText('h2.col-md-12', 'Welcome Home Ben!');
          }
        });
      });
    });
  });

  casper.run(function() {
    test.done();
  });
});
