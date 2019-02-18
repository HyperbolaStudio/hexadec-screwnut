class HxIA extends HxComponent{
    constructor(){
        super();
        const shadow:ShadowRoot = this.attachShadow({mode:'open'});
        let container:HTMLDivElement = document.createElement('div');
        container.className = 'container';
        // this.createStyle(`
        //     .container{
        //         position:relative;
        //         background:var(--hx-ia-bgcolor,var(--hx-global-bgcolor));
        //         color:var(--hx-ia-fgcolor,var(--hx-global-fgcolor));
        //         border:none;
        //         transition:box-shadow 0.2s,border 0.2s;
        //     }
        //     @media(min-width:800px){
        //         .container:hover{
        //             box-shadow:0 0 1px 1px var(--hx-ia-act-color,var(--hx-global-theme-secondary-color)) !important;
        //         }
        //     }
        //     .container:active{
        //         box-shadow:0 0 4px 1px var(--hx-ia-act-color,var(--hx-global-theme-secondary-color)) !important;
        //     }
        // `);
        let areaSlot:HTMLSlotElement = document.createElement('slot');
        areaSlot.setAttribute('name' , 'area');
        container.appendChild(areaSlot);
        shadow.appendChild(container);
    }
    static get observedAttributes():string[]{
        return ['inline'];
    }
    get isInline():boolean{
        let attrTarget:string = 'inline';
        return (this.getAttribute(attrTarget)==null)?false:true;
    }
    set isInline(is:boolean){
        let attrTarget:string = 'inline';
        if(is){
            this.setAttribute(attrTarget,'');
        }else{
            this.removeAttribute(attrTarget);
        }
    }
    attributeChangedCallback(name:string , oldVal:string , newVal:string){
        if(name === 'inline'){
            let shadow:any = this.shadowRoot;
            let container:any = shadow.querySelector('.container');
            if(newVal === null){
                container.style.display = 'block';
            }else{
                container.style.display = 'inline-block';
            }
        }
    }
}
customElements.define('hx-ia',HxIA);