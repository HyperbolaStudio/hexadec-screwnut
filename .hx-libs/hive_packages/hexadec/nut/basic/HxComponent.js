"use strict";
class HxComponent extends HTMLElement {
    constructor() {
        super();
    }
    createStyle(styleText) {
        let style = document.createElement('style');
        style.textContent = styleText;
        if (this.shadowRoot) {
            this.shadowRoot.appendChild(style);
        }
        else {
            throw new Error(`Shadow Root is not openen or not exist. try "attachShadow({mode:'open'})" first. `);
        }
        return style;
    }
}
