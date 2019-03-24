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

//decorators


//component define
export function Component<K extends HxComponent>(tagName:string){
    return (target:(new() => K)) => {
        customElements.define(tagName,target);
    }
}



//view builder
interface ViewModel{
    tagName:string;
    revealElemSlotName?:string;
    classList?:Array<string>;
    attr?:{
        [property:string]:string;
    }
    style?:{
        [P in keyof CSSStyleDeclaration]?:CSSStyleDeclaration[P];
    }
    DOMSlot?:{
        [property:string]:string;
    }
    ElemSlot?:{
        [property:string]:ViewModel|HTMLElement;
    }
    child?:Array<ViewModel> 
}
//store slots in slot map of slotable
interface SlotDeclaration{
    targetElem:HTMLElement;
    type:'attr'|'classList'|'style'|'DOMSlot'|'ElemSlot'|'self';
    targetName?:string;
}
//implementation of component that has slot storage
interface Slotable{
      DOMSlotMap:Map<string,SlotDeclaration>;
      container:HTMLElement;
      _setDOMSlot:(slotName:string,value:string) => void;
}
export function View(model:ViewModel,containerTarget?:string){
    return (target:(new() => Slotable)) => {
        let buildPos:HTMLElement;//position to build the view model
        if(containerTarget){
            buildPos = target.prototype.get(containerTarget) || target.prototype.container;
        }else{
            buildPos = target.prototype.container;
        }
        let buildTarget:HTMLElement;//built model
        function build(n:ViewModel):HTMLElement{
            let elem = document.createElement(n.tagName);
            if(n.attr){
                for(let k in n.attr){
                    elem.setAttribute(k,n.attr[k]);
                }
            }
            if(n.style){
                for(let k in n.style){
                    elem.style[k] = n.style[k]||'';
                }
            }
            if(n.DOMSlot && elem instanceof HxComponent){
                for(let k in n.DOMSlot){
                    elem._setDOMSlot(k,n.DOMSlot[k]);
                }
            }
            if(n.child){
                for(let childModel of n.child){
                    elem.appendChild(build(childModel));
                }
            }
            return elem;
        }
    }
}
let x:ViewModel = {
    tagName:'div',
    style:{
        lineHeight:'10px',
    }
}
export class HxComponent extends HTMLElement  implements Slotable{
    _setDOMSlot=(slotName: string, value: string) => {

    }
    DOMSlotMap: Map<string, SlotDeclaration> = new Map();
    container: HTMLElement = document.createElement('div');
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
    // receiver:Map<any,(arg:any)=>any> = new Map<any,(arg:any)=>any>();
    static nutStyle:NutDesignDeclaration = new NutDesignDeclaration();
}