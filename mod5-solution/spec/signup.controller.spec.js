describe("SignupController", function() {

    beforeEach(module('restaurant'));
  
    var $controller;
    var signupController;
    var $httpBackend;
  
    beforeEach(inject(function (_$controller_, _$httpBackend_) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
    
        var SignupServiceErrorMock = {};
        SignupServiceErrorMock.getItem = function (shortname) {
            throw new Error("Test message.");
        };
    
        signupController = $controller('SignupController',
            {SignupService: SignupServiceErrorMock});
    
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should send http request", function() {
        $httpBackend.expectGET('/');
    });

    /*
    xit("should change error message in controller", function() {
        signupController.checkFavefood();
        expect(signupController.errorMessage).toBe("Test message.");
        expect(signupController.validFaveFood).toNotBe(true);
    });*/
  
});