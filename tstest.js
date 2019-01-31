"use strict";
let txt = "Hello World!";
class Test {
    constructor(x) {
        this.x = x;
    }
    f() {
        console.log(this.x);
        return this.x.length;
    }
}
let t = new Test(txt);
console.log(t.f());
