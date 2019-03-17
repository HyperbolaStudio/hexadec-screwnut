import {HxInteractionTarget} from './HxInteractionTarget';
import {HxComponent} from './HxComponent';
import { HxButtonBuilder } from './HxButtonBuilder';
export class HxButton extends HxInteractionTarget{
    constructor(){
        super();
        // console.log(this.tagName);
        // this.componentTagName = 'hx-button';
        // let shadow:any = this.shadowRoot;
        // let container:any = shadow.querySelector('.container');
        // this.areaSlot.remove();

        // this.container = document.createElement('button');
        this.container.tabIndex=0;
        this.imgElement = document.createElement('img');//button icon
        this.imgElement.className = 'icon-elem';
        this.imgElement.style.display = 'none';

        this.titleElement = document.createElement('div');//button title
        this.titleElement.className = 'title-elem';

        this.container.appendChild(this.imgElement);
        this.container.appendChild(this.titleElement);
        this.container.setAttribute('role','button');
        this.updateStyle();
    }

    /*
                    ||titleElement
                    \/
        ------------------------
        |  /     ---           |
        | |----  |__} /-- \  / |
        |  \     |    |    \/  |
        ------------------------
           /\
           ||imgElement
    */
    imgElement:HTMLImageElement;
    titleElement:HTMLDivElement;

    //custom properties getter/setter
    get inline():boolean{
        let attrTarget:string = 'inline';
        return this.getAttribute(attrTarget) !== null;
    }
    set inline(is:boolean){
        let attrTarget:string = 'inline';
        if(is){
            this.setAttribute(attrTarget,'');
        }else{
            this.removeAttribute(attrTarget);
        }
    }

    get flat():boolean{
        let attrTarget:string = 'flat';
        return this.getAttribute(attrTarget) !== null;
    }
    set flat(is:boolean){
        let attrTarget:string = 'flat';
        if(is){
            this.setAttribute(attrTarget,'');
        }else{
            this.removeAttribute(attrTarget);
        }
    }

    get rounded():boolean{
        let attrTarget:string = 'rounded';
        return this.getAttribute(attrTarget) !== null;
    }
    set rounded(is:boolean){
        let attrTarget:string = 'rounded';
        if(is){
            this.setAttribute(attrTarget,'');
        }else{
            this.removeAttribute(attrTarget);
        }
    }

    get icon():boolean{
        let attrTarget:string = 'icon';
        return this.getAttribute(attrTarget) !== null;
    }
    set icon(is:boolean){
        let attrTarget:string = 'icon';
        if(is){
            this.setAttribute(attrTarget,'');
        }else{
            this.removeAttribute(attrTarget);
        }
    }

    get btnTitle():string|null{
        return this.getAttribute('btn-title')
    }
    set btnTitle(txt:string|null){
        if(txt){
            this.setAttribute('btn-title',txt);
        }else{
            this.removeAttribute('btn-title');
        }
        
    }

    get btnIconSrc():string|null{
        return this.getAttribute('btn-icon-src')
    }
    set btnIconSrc(src:string|null){
        if(src){
            this.setAttribute('btn-icon-src',src);
        }else{
            this.removeAttribute('btn-icon-src');
        }
        
    }
    //style handler
    
    
    //attr listener
    static get observedAttributes():string[]{
        return ['inline','icon','rounded','flat','btn-icon-src','btn-title'];
    }
    attributeChangedCallback(name:string , oldVal:string , newVal:string){
        let container:any = this.container;
        let containerClass:DOMTokenList = this.container.classList;
        //style-alike attr handler
        for(let attr of HxButton.observedAttributes){
            if(name === 'btn-icon-src' || name === 'btn-title'){
                break;
            }
            if(name === attr){
                if(newVal === null){
                    containerClass.remove(attr);
                }else{
                    containerClass.add(attr);
                }
                break;
            }
        }
        if(name === 'btn-icon-src'){
            if(newVal === null){
                this.imgElement.style.display = 'none';
                this.imgElement.src = '';
            }else{
                this.imgElement.style.display = '';
                this.imgElement.src = newVal;
            }
            
        }else if(name === 'btn-title'){
            this.titleElement.textContent = newVal;
            
        }
    }
    build(b:HxButtonBuilder){
        let btn:any = this;
        btn.btnTitle = b.btnTitle;
        btn.btnIconSrc = b.btnIconSrc||null;
        btn.onclick = b.onclick;  
    }
}
customElements.define('hx-button' , HxButton);