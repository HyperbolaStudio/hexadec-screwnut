"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HxComponent_1 = require("./HxComponent");
class HxIA extends HxComponent_1.HxComponent {
    constructor() {
        super();
        let shadow = this.shadowRoot ? this.shadowRoot : this.attachShadow({ mode: 'open' });
        if (this.shadowRoot) {
            shadow = this.shadowRoot;
        }
        ;
        this.container = document.createElement('div');
        this.container.className = 'container';
        this.areaSlot = document.createElement('slot');
        this.areaSlot.setAttribute('name', 'area');
        this.container.appendChild(this.areaSlot);
        shadow.appendChild(this.container);
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
exports.HxIA = HxIA;
customElements.define('hx-ia', HxIA);
