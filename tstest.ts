let txt:string="Hello World!";
class Test{
    x:string;
    constructor(x:string){
        this.x=x;
    }
    f():number{
        console.log(this.x);
        return this.x.length;
    }
}
let t=new Test(txt);
console.log(t.f());