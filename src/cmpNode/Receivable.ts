import { EventMap, EventPost } from "../declaration/receiver/EventMap";
export class Receivable<RecvArgTypes = any,RecvReturnTypes = any>{
    private eventMap:EventMap = {};

    setReceiver<K extends keyof RecvArgTypes,R extends keyof RecvReturnTypes>(eventKey:K&R,on:(eventPost:EventPost<RecvArgTypes[K]>) => RecvReturnTypes[R]):void;
    setReceiver(eventKey:string,on:(eventPost:EventPost) => any):void;
    setReceiver(eventKey:string,on:(eventPost:EventPost) => any):void{
        this.eventMap[eventKey] = {on};
    }

    getReceiver<K extends keyof RecvArgTypes,R extends keyof RecvReturnTypes>(eventKey:K&R):(eventPost:EventPost<RecvArgTypes[K]>) => RecvReturnTypes[R];
    getReceiver(eventKey:string):(eventPost:EventPost) => any;
    getReceiver(eventKey:string):((eventPost:EventPost) => any){
        return this.eventMap[eventKey].on;
    }

    hasReceiver(eventKey:string):boolean{
        return Boolean(this.eventMap[eventKey]);
    }

    parent:Receivable|null = null;
    children:Array<Receivable> = [];

    receive(eventKey:string,arg:any){
        let post:EventPost = {
            arg:arg,
            path:[this],
            postDirection:'none'
        }
        if(this.hasReceiver(eventKey)){
            this.getReceiver(eventKey)(post);
        }
    }
    emit(
        eventKey:string,
        arg:any,
        post:EventPost = {
            arg:arg,
            path:[this],
            postDirection:'emit'
        }
    ):Array<any>{
        let r = [];
        if(this.hasReceiver(eventKey)){
            r.push(this.getReceiver(eventKey)(post));
        }
        if(this.parent){
            post.path.push(this.parent);
            this.parent.emit(eventKey,arg,post);
        }
        return r;
    }
}