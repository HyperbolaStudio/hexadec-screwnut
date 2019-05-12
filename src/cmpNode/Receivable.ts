import { EventMap, EventPost } from "../declaration/receiver/EventMap";

/**
 * Node of broadcast callback return tree.
 */
interface BroadcastReturnNode{
	/**
	 * Return value of broadcast target's callback.
	 */
    val?:any;
    
    /**
     * Return values of children's callbacks.
     */
    next?:Array<BroadcastReturnNode|null>;
};

/**
 * Currying accessor for receiver.
 * Why currying? For TypeScript type-checking. If not currying, Overload function leads it to AnyScript. Fxck TypeScript.????
 */
interface ReceiverAccessor{
	/**
	 * Get receiver callback.
	 * @returns Event callback
	 */
    get:() => ((eventPost:EventPost) => any)|null;
    
    /**
     * Set receiver callback.
     * @param on Event callback
     */
    set:(on:((eventPost:EventPost) => any)) => void;
}

/**
 * Implementation of a Receivable target.
 */
export class Receivable{
	/**
	 * Storage of events.
	 */
    private eventMap:EventMap = {};
	
	/**
	 * Receiver accessor.
	 * @param eventKey Key of event to access
	 * @returns Receiver accessor (currying)
	 */
    //receiver<K extends keyof RecvArgTypes,R extends keyof RecvReturnTypes>(eventKey:K&R):ReceiverAccessor<RecvArgTypes[K],RecvReturnTypes[R]>;
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

	/**
	 * This receivable target's parent.
	 * @default null
	 */
    private _parent:Receivable|null = null;
    
    /**
     * This receivable target's children.
     * @default []
     */
    private _children:Array<Receivable> = [];
    
    /**
     * Get this target's parent.
     * @returns Parent receivable
     */
    get parent(){
        return this._parent;
    }
    
    /**
     * Get this target's children
     * @returns Child receivables
     */
    get children(){
        return this._children;
    }
    
    /**
     * Append children receivables.
     * @param children Children to append
     */
    appendChild(...children:Receivable[]):void{
        for(let c of children){
            c._parent = this;
        }
        this._children.push(...children);
    }
    
    /**
     * Prepend children receivables.
     * @param children Children to prepend
     */
    prependChild(...children:Receivable[]):void{
        for(let c of children){
            c._parent = this;
        }
        this._children.unshift(...children);
    }

    /**
     * Insert children receivables.
     * @param index Location
     * @param children Children to prepend
     */
    insertChild(index:number,...children:Receivable[]):void{
        this._children.splice(1,0,...children);
    }
    
    /**
     * Is this a child of a receivable.
     * @returns It's obvious what is returned here.
     */
    get isConnected(){
        return Boolean(this._parent);
    }
    
	/**
	 * Call a event.
	 * @param eventKey The event to call
	 * @param arg Argument to pass
	 * @returns Event callback's return value
	 */
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
    
    /**
     * Emit a event
     * @param eventKey Event to emit
     * @param Argument to pass
     * @returns Callbacks' return values
     */
    emit(
        eventKey:string,
        arg:any,
    ):Array<any>{
        let post:EventPost = {
            arg:arg,
            path:[this],
            postDirection:'emit'
        };
        let r = [];
        let target = this;
        while(1){
            let recv = target.receiver(eventKey).get();
            if(recv){
                r.push(recv(post));
            }
            if(target._parent){
                post.path.push(target._parent);
            }else{
                break;
            }
        }       
        return r;
    }

	/**
     * Broadcast a event
     * @param eventKey Event to emit
     * @param Argument to pass
     * @param post Post of a broadcast event
     * @returns Callbacks' return values tree
     */
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
                //An interesting DFS
                //Yep, we must use recursion here.
                r.next.push(child.broadcast(eventKey,arg,cPost));
            }
        }
        return r;
    }
	
	/**
     * Emit a event (Async)
     * @param eventKey Event to emit
     * @param Argument to pass
     * @returns Callbacks' return values promise
     */
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

	//TODO What's this holy shit?
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