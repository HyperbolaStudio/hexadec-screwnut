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
let bOn = (e:EventPost<number>):boolean => {
    console.log(22);
    return e.arg > 5;
}
let rv = new Receivable<rat,rrt>();
rv.setReceiver('a',aOn);
rv.setReceiver('b',bOn);

let rva = new Receivable<rat,rrt>();
rva.setReceiver('a',aOn);
rva.setReceiver('b',bOn);
rva.parent = rv;

let rvb = new Receivable<rat,rrt>();
rvb.setReceiver('a',aOn);
rvb.setReceiver('b',bOn);
rvb.parent = rv;

rv.children = [rva,rvb];

console.log(rv.broadcast('a','fffff'));
console.log(rvb.emit('b',4));