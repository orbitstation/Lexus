function add(a, b) { return a + b; }
describe("Demo Test", function () {

    it("should add two positive numbers", function () {
        expect(add(2, 2)).toEqual(4);
    });

    it("should add two numbers", function () {
        expect(add(11, -5)).toEqual(6);
    });
});