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
interface HxNodeModel{
    tagName:string;
    revealElemSlotName?:string;
    classList?:Array<string>;
    attr?:{
        [property:string]:string;
    }
    style?:{
        [property:string]:string|{value:string;important:boolean};
    }
    DOMSlot?:{
        [property:string]:string;
    }
    ElemSlot?:{
        [property:string]:HxNodeModel|HTMLElement;
    }
    child?:Array<HxNodeModel> 
}
//store slots in slot map of slotable
interface SlotHandler{
    attr:{
        setter:(attr:string) => void;
        getter:() => string|null;
    }
    style:{
        setter:(prop:string,priority?:'important') => void;
        getter:() => string;
    }
    elem:{
        getter:() => HTMLElement;
    }
}
interface SlotDeclaration{
    targetElem:HTMLElement;
    type:keyof SlotHandler;
    targetName:string;
}
function getSlotHandler (slot:SlotDeclaration) {
    let handler:SlotHandler = {
        attr:{
            setter:(attribute:string):void => {
                slot.targetElem.setAttribute(slot.targetName,attribute);
            },
            getter:():string|null => {
                return slot.targetElem.getAttribute(slot.targetName);
            }
        },
        style:{
            setter:(property:string,priority?:'important'):void => {
                slot.targetElem.style.setProperty(slot.targetName,property,priority);
            },
            getter:():string => {
                return slot.targetElem.style.getPropertyValue(slot.targetName);
            }
        },
        elem:{
            getter:():HTMLElement => {
                return slot.targetElem;
            }
        }
    };
    
}
//implementation of component that has slot storage
interface Slotable{
      DOMSlotMap:Map<string,SlotDeclaration>;
      container:HTMLElement;
}
function setSlot(slotMap:Map<string,SlotDeclaration>,slotName:string,slot:SlotDeclaration){
    if(slotMap.has(slotName)){
        throw new Error(`Error when setting slot "${slotName}": Slot already exist`);
    }else{
        slotMap.set(slotName,slot);
    }
}
function build(n:HxNodeModel):HTMLElement{
    let elem = document.createElement(n.tagName);
    if(n.attr){
        for(let k in n.attr){
            elem.setAttribute(k,n.attr[k]);
        }
    }
    if(n.style){
        for(let k in n.style){
            let v = n.style[k];
            if(typeof(v) === 'string'){
                elem.style.setProperty(k,v);
            }else{
                elem.style.setProperty(k,v.value,v.important?'important':null);
            }
        }
    }
    if(n.DOMSlot && elem instanceof HxComponent){
        for(let k in n.DOMSlot){
            
        }
    }
    if(n.child){
        for(let childModel of n.child){
            elem.appendChild(build(childModel));
        }
    }
    return elem;
}
export function View(model:HxNodeModel,containerTargetSlot?:string){
    return (target:(new() => Slotable)) => {
        let buildPos:HTMLElement;//position to build the view model
        if(containerTargetSlot){
            buildPos = target.prototype.get(containerTargetSlot) || target.prototype.container;
        }else{
            buildPos = target.prototype.container;
        }
        // let builtTarget:HTMLElement;//built model
        buildPos.appendChild(build(model));
    }
}
let x:HxNodeModel = {
    tagName:'div',
    style:{
        lineHeight:'10px',
    }
}
export class HxComponent extends HTMLElement  implements Slotable{
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