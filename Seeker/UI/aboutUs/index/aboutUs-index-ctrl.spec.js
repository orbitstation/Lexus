
describe("About Us Controller", function () {

    var scope, controller,httpLocalBackend;
    beforeEach(module('miniSPA'));

    beforeEach(inject(function ($rootScope, $controller, $httpBackend) {
        httpLocalBackend = $httpBackend;
        scope = $rootScope.$new();
        controller = $controller('aboutUsIndexCtrl', { '$scope': scope });
    }));

    it("should define controller", function () {
        expect(controller).toBeDefined();
    });
    it("should test scope", function () {
        expect(scope.test).toEqual(1);
    });
    it("should test scope 1", function () {
        expect(scope.test).toEqual(1);
    });

    it("should drop the bass", function () {
        //Other backend mocks include whenPUT, whenPOST
        httpLocalBackend.whenGET('/seeker/api/me/drop').respond(200, [{ dropped: true }]);
        scope.dropBass(3);
        httpLocalBackend.flush();
        expect(scope.sound).toEqual([{ dropped: true }]);
    });
});