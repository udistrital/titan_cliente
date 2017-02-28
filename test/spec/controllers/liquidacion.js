'use strict';

describe('Controller: LiquidacionCtrl', function () {

  // load the controller's module
  beforeEach(module('clientePruebaApp'));

  var LiquidacionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LiquidacionCtrl = $controller('LiquidacionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LiquidacionCtrl.awesomeThings.length).toBe(3);
  });
});
