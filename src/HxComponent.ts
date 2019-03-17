class NutDesignDeclaration{
    _CSSFilesMap:Map<string,string|string[]> = new Map();
    constructor(){
        //test code
        this._CSSFilesMap.set('HX-BUTTON','./src/studio/hyperbola/plastic/nutd/HxButton.css')
        //test code end
    }
    get CSSFilesMap():Map<string,string|string[]>{
        return this._CSSFilesMap
    }
}
class MessagePost{
    constructor(handlers:Array<(arg:any)=>any>){
        this.handlers = handlers;
    }
    handlers:Array<(arg:any)=>any>;
    emit(arg?:any,async:boolean = true):Promise<any>/*async*/|Array<any>{
        if(async){
            let handlerPromises:Array<Promise<any>> = [];
            this.handlers.forEach((func,i,arr)=>{
                handlerPromises.push(new Promise<any>((result,reject)=>{
                    result(func(arg));
                }));
            });
            return Promise.all(handlerPromises);
        }else{
            let handlerResults:Array<any> = [];
            this.handlers.forEach((func,i,arr)=>{
                handlerResults.push(func(arg));
            })
            return handlerResults;
        }
    }
}
export class HxComponent extends HTMLElement{
    componentTagName:string = '';
    constructor(){
        super();

        //shadow attachment
        let shadow:ShadowRoot = this.attachShadow({mode:'open'});

        //add style handler links list
        this.styleLinksList = document.createElement('div');
        this.styleLinksList.className = 'design-declaration';

        shadow.appendChild(this.styleLinksList);
        
    }
    updateStyle():void{
        let styleList:string|string[]|undefined = HxComponent.nutStyle.CSSFilesMap.get(this.tagName);
        if(styleList){
            if(typeof(styleList) === 'string'){
                styleList = [styleList];
            }
            styleList.forEach((val , index , arr) => {
                let cssLink = document.createElement('link');
                cssLink.rel = 'stylesheet';
                cssLink.href = val;
                this.styleLinksList.appendChild(cssLink);
            });
        }
        
    }
    styleLinksList:HTMLDivElement;
    receiver:Map<any,(arg:any)=>any> = new Map<any,(arg:any)=>any>();
    static nutStyle:NutDesignDeclaration = new NutDesignDeclaration();
    
    static broadcast(
        message:any,
        context:ShadowRoot|HTMLDocument|HTMLElement = document,
        selector:string = '*',
        shadowPenetrate:boolean
    ):MessagePost{
        let funcArr:Array<(arg:any)=>any> = [];
        (function dfs(root:ShadowRoot|HTMLDocument|HTMLElement):void{
            root.querySelectorAll(selector).forEach((elem,i,list)=>{
                if(elem instanceof HxComponent && elem.receiver.has(message)){
                    funcArr.push(arg=>(elem.receiver.get(message)||((arg:any)=>{}))(arg))
                }
                if(shadowPenetrate && elem.shadowRoot){
                    dfs(elem.shadowRoot);
                }
            })
        })(context);
        return new MessagePost(funcArr);
    }
    static post(message:any,target:HxComponent):MessagePost|void{
        if(target.receiver.has(message)){
            return new MessagePost([arg=>(target.receiver.get('message')||((arg:any)=>{}))(arg)]);
        }
    }
}