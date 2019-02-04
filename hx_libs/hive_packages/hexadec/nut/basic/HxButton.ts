class HxButton extends HxIA{
    constructor(){
        super();
        let shadow:any = this.shadowRoot;
        let style:any = shadow.querySelector('style');
        style.textContent=`
            .container{
                position:relative;
                background:var(--hx-ia-bgcolor,var(--hx-global-bgcolor));
                color:var(--hx-ia-fgcolor,var(--hx-global-fgcolor));
                border:none;
                box-shadow:0 0 4px var(--hx-ia-act-color,var(--hx-global-theme-secondary-color));
                transition:box-shadow 0.2s,border 0.2s;
            }
            .container.flat{
                box-shadow:none;
            }
            @media(min-width:800px){
                .container:hover{
                    box-shadow:0 0 8px 1px var(--hx-ia-act-color,var(--hx-global-theme-secondary-color));
                }
            }
            .container:active{
                box-shadow:0 0 4px 1px var(--hx-ia-act-color,var(--hx-global-theme-secondary-color));
            }
        `;
        let container:any = shadow.querySelector('.container');
        container.style.borderRadius = '2px';
        container.style.padding='0 10px';
        container.style.margin='8px';
        container.style.lineHeight='36px';
        container.style.backgroundColor = 'var(--hx-button-bgcolor,var(--hx-global-theme-main-color))';
        container.style.color = 'var(--hx-button-fgcolor,var(--hx-global-theme-fgcolor))';
        container.style.alignItems = 'center';
        container.style.flexDirection = 'var(--hx-button-dir)';
        container.querySelector('slot[name = area]').remove();
        let imgSlot:HTMLSlotElement = document.createElement('slot');
        imgSlot.setAttribute('name' , 'img');
        let titleSlot:HTMLSlotElement = document.createElement('slot');
        titleSlot.setAttribute('name' , 'title');
        container.appendChild(imgSlot);
        container.appendChild(titleSlot);
        container.setAttribute('role','button');
    }
    static get observedAttributes():string[]{
        return ['inline','icon','rounded','flat'];
    }
    //custom properties
    get isFlat():boolean{
        let attrTarget:string = 'flat';
        return (this.getAttribute(attrTarget)==null)?false:true;
    }
    get isRounded():boolean{
        let attrTarget:string = 'rounded';
        return (this.getAttribute(attrTarget)==null)?false:true;
    }
    get isIcon():boolean{
        let attrTarget:string = 'icon';
        return (this.getAttribute(attrTarget)==null)?false:true;
    }
    set isFlat(is:boolean){
        let attrTarget:string = 'flat';
        if(is){
            this.setAttribute(attrTarget,'');
        }else{
            this.removeAttribute(attrTarget);
        }
    }
    set isRounded(is:boolean){
        let attrTarget:string = 'rounded';
        if(is){
            this.setAttribute(attrTarget,'');
        }else{
            this.removeAttribute(attrTarget);
        }
    }
    set isIcon(is:boolean){
        let attrTarget:string = 'icon';
        if(is){
            this.setAttribute(attrTarget,'');
        }else{
            this.removeAttribute(attrTarget);
        }
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