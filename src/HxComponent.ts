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
interface SlotSetter{//Set slot when building node model
    slotName:string;
}
interface HxNodeModel{//Build node target
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
    child?:Array<HxNodeModel> 
}
interface SlotHandler{//getter and setter via slot
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
//store slots in slot map of slotable
interface SlotDeclaration{
    targetElem:HTMLElement;
    type:keyof SlotHandler;
    targetName:string;
}
//implementation of SlotHandler
function getSlotHandler (slot:SlotDeclaration):SlotHandler {
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
    }
    return handler;
}
//implementation of component that has slot storage
interface Slotable{
      DOMSlotMap:Map<string,SlotDeclaration>;
      container:HTMLElement;
}
//setter of slot declaration
function setSlot(slotMap:Map<string,SlotDeclaration>,slotName:string,slot:SlotDeclaration){
    slotMap.set(slotName,slot);
}
//getter of sloy declaration
function getSlot(slotMap:Map<string,SlotDeclaration>,slotName:string){
    return slotMap.get(slotName);
}
//set slot value via slot
function slotIn(slotMap:Map<string,SlotDeclaration>,key:string,value:string,priority?:'important'){
    let slot = slotMap.get(key);
    if(slot){
        switch(slot.type){
            case 'attr':
                getSlotHandler(slot).attr.setter(value);
                break;
            case 'style':
                getSlotHandler(slot).style.setter(value,priority);
        }
    }
}
//TODO add a slot setter as a union type with string
function build(n:HxNodeModel,target:new()=>Slotable):HTMLElement{
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
            	//where v is string
                //'line-height': '24px'
                elem.style.setProperty(k,v);
            }else{
            	//where v is object
                /*
                'line-height': {
                    value:'24px',
                    important: true
                }
                */
                elem.style.setProperty(k,v.value,v.important?'important':null);
            }
        }
    }
    if(n.DOMSlot && elem instanceof HxComponent){
    	//for only HxComponent can be sloted-in
        for(let k in n.DOMSlot){
            let slot = getSlot(elem.DOMSlotMap,k);//TODO what's this line used for?
            if(slot){
                slotIn(elem.DOMSlotMap,k,n.DOMSlot[k]);
            }
        }
    }
    if(n.child){
        for(let childModel of n.child){
            elem.appendChild(build(childModel,target));
        }
    }
    return elem;
}
export function View(model:HxNodeModel|Array<HxNodeModel>,containerTargetSlot?:string){
    return (target:(new() => Slotable)) => {
        let buildPos:HTMLElement;//position to build the view model
        if(containerTargetSlot){
            let slot = getSlot(target.prototype.DOMSlotMap,containerTargetSlot);
            if(slot && slot.type === 'elem'){
            	//where has target slot as element slot
                buildPos = slot.targetElem
            }else{
            	//where default
                buildPos = target.prototype.container;
            }
        }else{
        	//where also default
            buildPos = target.prototype.container;
        }
        // let builtTarget:HTMLElement;//built model
        if(!(model instanceof Array)){
            buildPos.appendChild(build(model,target));
        }else{
            for(let m of model){
                buildPos.appendChild(build(m,target));
            }
        }
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
        shadow.appendChild(this.container);
        
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
@Component('x-test')
@View({
    tagName:'p',
    style:{
        'width':'100px',
        'height':'100px',
        'background':'#00a0e9',
    },
})
class XTest extends HxComponent{

}