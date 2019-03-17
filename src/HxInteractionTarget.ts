import {HxComponent} from './HxComponent';
export class HxInteractionTarget extends HxComponent{
    constructor(){
        super();
        //fuck types
        let shadow:ShadowRoot = this.shadowRoot?this.shadowRoot:this.attachShadow({mode:'open'});
        if(this.shadowRoot){
            shadow = this.shadowRoot
        };
        this.container = document.createElement('div');
        this.container.className = 'container';
        // this.areaSlot = document.createElement('slot');
        // this.areaSlot.setAttribute('name' , 'area');
        // this.container.appendChild(this.areaSlot);
        shadow.appendChild(this.container);
    }
    container:HTMLDivElement;
    // areaSlot:HTMLSlotElement;
    // attributeChangedCallback(name:string , oldVal:string , newVal:string){
    //     if(name === 'inline'){
    //         let shadow:any = this.shadowRoot;
    //         let container:any = shadow.querySelector('.container');
    //         if(newVal === null){
    //             container.style.display = 'block';
    //         }else{
    //             container.style.display = 'inline-block';
    //         }
    //     }
    // }
}
// customElements.define('hx-ia',HxInteractionTarget);