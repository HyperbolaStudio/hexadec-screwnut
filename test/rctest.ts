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
    return e.arg.length;
}
let bOn = (e:EventPost<number>):boolean => {
    return e.arg > 5;
}
let rv = new Receivable<rat,rrt>();
rv.setReceiver('a',aOn);
document.createElement