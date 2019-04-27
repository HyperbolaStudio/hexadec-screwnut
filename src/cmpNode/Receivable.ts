import { EventMap, EventPost } from "../declaration/receiver/EventMap";
type BroadcastReturnNode = {
    val?:any;
    next?:Array<BroadcastReturnNode|null>;
};
interface ReceiverAccessor<ArgType = any,RetType = any>{
    get:() => ((eventPost:EventPost<ArgType>) => RetType)|null;
    set:(on:((eventPost:EventPost<ArgType>) => RetType)) => void;
}
export class Receivable<RecvArgTypes = any,RecvReturnTypes = any>{
    private eventMap:EventMap = {};

    receiver<K extends keyof RecvArgTypes,R extends keyof RecvReturnTypes>(eventKey:K&R):ReceiverAccessor<RecvArgTypes[K],RecvReturnTypes[R]>;
    receiver(eventKey:string):ReceiverAccessor;
    receiver(eventKey:string){
        return {
            get:() => {
                return this.eventMap[eventKey] ? this.eventMap[eventKey].on : null;
            },
            set:(on:(eventPost:EventPost) => any) => {
                this.eventMap[eventKey] = {on};
            }
        }
    }

    private _parent:Receivable|null = null;
    private _children:Array<Receivable> = [];
    get parent(){
        return this._parent;
    }
    get children(){
        return this._children;
    }
    appendChild(...child:Receivable[]):number{
        for(let c of child){
            c._parent = this;
        }
        return this._children.push(...child);
    }
    prependChild(...child:Receivable[]):number{
        for(let c of child){
            c._parent = this;
        }
        return this._children.unshift(...child);
    }
    get isConnected(){
        return Boolean(this._parent);
    }

    call(eventKey:string,arg:any){
        let post:EventPost = {
            arg:arg,
            path:[this],
            postDirection:'none'
        }
        let recv = this.receiver(eventKey).get();
        if(recv){
            return recv(post);
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
        let recv = this.receiver(eventKey).get();
        if(recv){
            r.push(recv(post));
        }
        if(this._parent){
            post.path.push(this._parent);
            r.push(...this._parent.emit(eventKey,arg,post));
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
    ):BroadcastReturnNode{
        let r:BroadcastReturnNode = {};
        let recv = this.receiver(eventKey).get();
        if(recv){
            r = {val:recv(post)};
        }
        if(this._children.length){
            r.next = [];
            for(let child of this._children){
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
            let recv = parent.receiver(eventKey).get();
            if(recv){
                p.push(new Promise((resolve,reject) => {
                    resolve(parent.call(eventKey,arg));
                }))
            }else{
                p.push(new Promise((resolve,reject) => {
                    resolve(null);
                }))
            }
            if(parent._parent){
                parent = parent._parent;
            }else{
                break;
            }
        }
        return Promise.all(p);
    }

    // broadcastAsync(eventKey:string,arg:any){
    //     type BroadcastCallbackNode = {
    //         on:(eventPost:EventPost) => any | null;
    //         next?:Array<BroadcastCallbackNode>
    //     }
    //     let f:BroadcastCallbackNode = {
    //         on:this.getReceiver(eventKey)
    //     };
    //     (function dfs(target:Receivable,node:BroadcastCallbackNode){
    //         if(target.children.length){
    //             node.next = [];
    //             for(let child of target.children){
    //                 let n:BroadcastCallbackNode = {
    //                     on:child.getReceiver(eventKey)
    //                 }
    //                 dfs(child,n);
    //             }
    //         }
    //     })(this,f);
    //     //TODO
    // }
}