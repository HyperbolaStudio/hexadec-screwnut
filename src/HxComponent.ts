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
export function Component<K extends HxComponent>(tagName:string){
    return (target:(new() => K)) => {
        customElements.define(tagName,target);
    }
}
interface ViewModel{
    tagName:string;
    revealElemSlotName?:string;
    classList?:Array<string>;
    attr?:{
        [property:string]:string;
    }
    style?:{
        [property:string]:string;
    }
    DOMSlot?:{
        [property:string]:string;
    }
    ElemSlot?:{
        [property:string]:ViewModel|HTMLElement;
    }
    child?:Array<ViewModel> 
}
interface SlotDeclaration{
    targetElem:HTMLElement;
    type:'attr'|'classList'|'style'|'DOMSlot'|'ElemSlot'|'self';
    targetName?:string;
}
interface Slotable{
      DOMSlotMap:Map<string,Array<SlotDeclaration>>;
      container:HTMLElement;
}
export function View(model:ViewModel,containerTarget?:string){
    return (target:(new() => Slotable)) => {
        
    }
}
export class HxComponent extends HTMLElement  implements Slotable{
    DOMSlotMap: Map<string, SlotDeclaration[]> = new Map();
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