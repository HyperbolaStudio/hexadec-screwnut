class HxButton extends HxIA{
    constructor(){
        super();
        this.componentTagName = 'hx-button';
        let shadow:any = this.shadowRoot;
        let link:HTMLLinkElement = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './hx_libs/hive_packages/hexadec/nut/basic/HxButton.css';
        let container:any = shadow.querySelector('.container');
        container.querySelector('slot[name = area]').remove();
        let imgSlot:HTMLSlotElement = document.createElement('slot');
        imgSlot.setAttribute('name' , 'img');
        let titleSlot:HTMLSlotElement = document.createElement('slot');
        titleSlot.setAttribute('name' , 'title');
        container.appendChild(imgSlot);
        container.appendChild(titleSlot);
        container.appendChild(link);
        container.setAttribute('role','button');
    }

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

    //style handler
    styleHandler(styleList:string[]):void{
        
    }
    
    //attr listener
    static get observedAttributes():string[]{
        return ['inline','icon','rounded','flat'];
    }
    attributeChangedCallback(name:string , oldVal:string , newVal:string){
        let shadow:any = this.shadowRoot;
        let container:any = shadow.querySelector('.container');
        if(name === 'inline'){
            if(newVal === null){
                container.style.display = 'flex';
            }else{
                container.style.display = 'inline-flex';
            }
        }else if(name === 'icon'){
            if(newVal === null){
                container.querySelector('slot[name = title]').style.display = '';
                container.style.padding = '0 10px';
            }else{
                container.querySelector('slot[name = title]').style.display = 'none';
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
        }
    }
}
customElements.define('hx-button' , HxButton);