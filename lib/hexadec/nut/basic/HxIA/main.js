"use strict";
class HxIA extends HxComponent {
    constructor() {
        super();
        let shadow = this.shadowRoot ? this.shadowRoot : this.attachShadow({ mode: 'open' });
        if (this.shadowRoot) {
            shadow = this.shadowRoot;
        }
        ;
        let container = document.createElement('div');
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
        let areaSlot = document.createElement('slot');
        areaSlot.setAttribute('name', 'area');
        container.appendChild(areaSlot);
        shadow.appendChild(container);
        this.container = container;
    }
    static get observedAttributes() {
        return ['inline'];
    }
    get inline() {
        let attrTarget = 'inline';
        return this.getAttribute(attrTarget) !== null;
    }
    set inline(is) {
        let attrTarget = 'inline';
        if (is) {
            this.setAttribute(attrTarget, '');
        }
        else {
            this.removeAttribute(attrTarget);
        }
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'inline') {
            let shadow = this.shadowRoot;
            let container = shadow.querySelector('.container');
            if (newVal === null) {
                container.style.display = 'block';
            }
            else {
                container.style.display = 'inline-block';
            }
        }
    }
}
customElements.define('hx-ia', HxIA);
