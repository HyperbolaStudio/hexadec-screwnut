import {Receivable} from '../src/cmpNode/Receivable';
import { EventPost } from '../src/declaration/receiver/EventMap';
type rat = {
    a:string;
    b:number;
}
type rrt = {
    a:number;
    b:boolean;
}
let aOn = (e:EventPost<string>):number => {
    console.log(11);
    return e.arg.length;
}
let aOn1 = (e:EventPost<string>):number => {
    console.log(1111);
    return e.arg.length;
}
let bOn = (e:EventPost<number>):boolean => {
    console.log(22);
    return e.arg > 5;
}
let rv = new Receivable<rat,rrt>();
rv.receiver('a').set(aOn1);

let rva = new Receivable<rat,rrt>();
rva.receiver('a').set(aOn);
rva.receiver('b').set(bOn);

let rvb = new Receivable<rat,rrt>();
rvb.receiver('a').set(aOn);
rvb.receiver('b').set(bOn);

rv.appendChild(rva,rvb);

console.log(rv.broadcast('b',4));
console.log(rvb.emit('a','fff'));