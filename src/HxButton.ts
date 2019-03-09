import {HxIA} from './HxIA';
import {screwnut} from './HxComponent';
export class HxButton extends HxIA{
    constructor(){
        super();
        this.componentTagName = 'hx-button';
        let shadow:any = this.shadowRoot;
        let container:any = shadow.querySelector('.container');
        container.querySelector('slot[name = area]').remove();

        this.imgElement = document.createElement('img');//button icon
        this.imgElement.style.width = this.imgElement.style.height = '24px';
        this.imgElement.style.display = 'none';

        this.titleElement = document.createElement('div');//button title

        container.appendChild(this.imgElement);
        container.appendChild(this.titleElement);
        container.setAttribute('role','button');
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
    updateStyle():void{
        let styleList:string|string[]|undefined = screwnut.nutStyle.CSSFilesMap.get(this.componentTagName);
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
    
    //attr listener
    static get observedAttributes():string[]{
        return ['inline','icon','rounded','flat','btn-icon-src','btn-title'];
    }
    attributeChangedCallback(name:string , oldVal:string , newVal:string){
        let container:any = this.container;
        if(name === 'inline'){
            if(newVal === null){
                container.style.display = 'flex';
            }else{
                container.style.display = 'inline-flex';
            }

        }else if(name === 'icon'){
            if(newVal === null){
                container.querySelector('div').style.display = '';
                container.style.padding = '0 10px';
            }else{
                container.querySelector('div').style.display = 'none';
                container.style.padding = '6px';
            }

        }else if(name === 'rounded'){
            if(newVal === null){
                container.style.borderRadius = '2px';
            }else{
                container.style.borderRadius = '36px';
            }

        }else if(name === 'flat'){
            if(newVal === null){
                container.classList.remove('flat');
            }else{
                container.classList.add('flat');
            }

        }else if(name === 'btn-icon-src'){
            if(newVal === null){
                this.imgElement.style.display = 'none';
            }else{
                this.imgElement.style.display = '';
                this.imgElement.src = newVal;
            }
            
        }else if(name === 'btn-title'){
            if(newVal){
                this.titleElement.innerText = newVal;
            }
        }
    }
}
customElements.define('hx-button' , HxButton);