import { EventMap, EventPost } from "../declaration/receiver/EventMap";
type BroadcastReturnNode = {
    val:any;
    next?:Array<BroadcastReturnNode|null>;
};
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

    call(eventKey:string,arg:any){
        let post:EventPost = {
            arg:arg,
            path:[this],
            postDirection:'none'
        }
        if(this.hasReceiver(eventKey)){
            return this.getReceiver(eventKey)(post);
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
            r.push(...this.parent.emit(eventKey,arg,post));
        }
        return r;
    }

    broadcast(
        eventKey:string,
        arg:any,
        post:EventPost = {
            arg:arg,
            path:[this],
            postDirection:'broadcast'
        }
    ):BroadcastReturnNode|null{
        let r:BroadcastReturnNode;
        if(this.hasReceiver(eventKey)){
            r = {val:this.getReceiver(eventKey)(post)};
        }else{
            return null;
        }
        if(this.children.length){
            r.next = [];
            for(let child of this.children){
                let cPost:EventPost = {
                    arg:arg,
                    path:[...post.path,child],
                    postDirection:'broadcast'
                }
                r.next.push(child.broadcast(eventKey,arg,cPost));
            }
        }
        return r;
    }

    emitAsync(eventKey:string,arg:any):Promise<any[]>{
        let p:Array<Promise<any>> = [];
        let parent:Receivable = this;
        while(1){
            if(parent.hasReceiver(eventKey)){
                p.push(new Promise((resolve,reject) => {
                    resolve(parent.call(eventKey,arg));
                }))
            }else{
                p.push(new Promise((resolve,reject) => {
                    resolve(null);
                }))
            }
            if(parent.parent){
                parent = parent.parent;
            }else{
                break;
            }
        }
        return Promise.all(p);
    }

    broadcastAsync(eventKey:string,arg:any){
        type BroadcastCallbackNode = {
            on:(eventPost:EventPost) => any | null;
            next?:Array<BroadcastCallbackNode>
        }
        let f:BroadcastCallbackNode = {
            on:this.getReceiver(eventKey)
        };
        (function dfs(target:Receivable,node:BroadcastCallbackNode){
            if(target.children.length){
                node.next = [];
                for(let child of target.children){
                    let n:BroadcastCallbackNode = {
                        on:child.getReceiver(eventKey)
                    }
                    dfs(child,n);
                }
            }
        })(this,f);
        //TODO
    }
}