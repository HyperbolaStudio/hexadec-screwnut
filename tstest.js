"use strict";
var txt = "Hello World!";
var Test = /** @class */ (function () {
    function Test(x) {
        this.x = x;
    }
    Test.prototype.f = function () {
        console.log(this.x);
        return this.x.length;
    };
    return Test;
}());
var t = new Test(txt);
console.log(t.f());
