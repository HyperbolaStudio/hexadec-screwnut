"use strict";
class HxIA extends HxComponent {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        let container = document.createElement('div');
        container.className = 'container';
        this.createStyle(`
            .container{
                position:relative;
                background:var(--hx-ia-bgcolor,var(--hx-global-bgcolor));
                color:var(--hx-ia-fgcolor,var(--hx-global-fgcolor));
                border:none;
                transition:box-shadow 0.2s,border 0.2s;
            }
            @media(min-width:800px){
                .container:hover{
                    box-shadow:0 0 1px 1px var(--hx-ia-act-color,var(--hx-global-theme-secondary-color)) !important;
                }
            }
            .container:active{
                box-shadow:0 0 4px 1px var(--hx-ia-act-color,var(--hx-global-theme-secondary-color)) !important;
            }
        `);
        let areaSlot = document.createElement('slot');
        areaSlot.setAttribute('name', 'area');
        container.appendChild(areaSlot);
        shadow.appendChild(container);
    }
    static get observedAttributes() {
        return ['inline'];
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
