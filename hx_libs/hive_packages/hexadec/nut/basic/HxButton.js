"use strict";
class HxButton extends HxIA {
    constructor() {
        super();
        let shadow = this.shadowRoot;
        let style = shadow.querySelector('style');
        style.textContent = `
            .container{
                position:relative;
                background:var(--hx-ia-bgcolor,var(--hx-global-bgcolor));
                color:var(--hx-ia-fgcolor,var(--hx-global-fgcolor));
                border:none;
                box-shadow:0 0 4px var(--hx-ia-act-color,var(--hx-global-theme-secondary-color));
                transition:box-shadow 0.2s,border 0.2s;
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
        let container = shadow.querySelector('.container');
        container.style.borderRadius = '2px';
        container.style.padding = '0 10px';
        container.style.margin = '8px';
        container.style.lineHeight = '36px';
        container.style.backgroundColor = 'var(--hx-button-bgcolor,var(--hx-global-theme-main-color))';
        container.style.color = 'var(--hx-button-fgcolor,var(--hx-global-theme-fgcolor))';
        container.style.alignItems = 'center';
        container.style.flexDirection = 'var(--hx-button-dir)';
        container.querySelector('slot[name = area]').remove();
        let imgSlot = document.createElement('slot');
        imgSlot.setAttribute('name', 'img');
        let titleSlot = document.createElement('slot');
        titleSlot.setAttribute('name', 'title');
        container.appendChild(imgSlot);
        container.appendChild(titleSlot);
        container.setAttribute("role", "button");
    }
    static get observedAttributes() {
        return ['inline', 'circle', 'rounded'];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        let shadow = this.shadowRoot;
        let container = shadow.querySelector('.container');
        if (name === 'inline') {
            if (newVal === null) {
                container.style.display = 'flex';
            }
            else {
                container.style.display = 'inline-flex';
            }
        }
        else if (name === 'circle') {
            container.querySelector('slot[name = title]').style.display = 'none';
            if (newVal === null) {
                container.querySelector('slot[name = title]').style.display = '';
                container.style.padding = '0 10px';
                container.style.borderRadius = '2px';
                container.style.lineHeight = '36px';
            }
            else {
                container.querySelector('slot[name = title]').style.display = 'none';
                container.style.padding = '8px';
                container.style.borderRadius = '32px';
                container.style.lineHeight = '';
            }
        }
        else if (name === 'rounded') {
            if (newVal === null) {
                container.style.borderRadius = '2px';
            }
            else {
                container.style.borderRadius = '36px';
            }
        }
    }
}
customElements.define("hx-button", HxButton);
