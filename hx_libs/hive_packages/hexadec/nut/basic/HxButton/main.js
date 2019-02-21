"use strict";
class HxButton extends HxIA {
    constructor() {
        super();
        this.componentTagName = 'hx-button';
        let shadow = this.shadowRoot;
        let container = shadow.querySelector('.container');
        container.querySelector('slot[name = area]').remove();
        let imgSlot = document.createElement('slot');
        imgSlot.setAttribute('name', 'img');
        let titleSlot = document.createElement('slot');
        titleSlot.setAttribute('name', 'title');
        container.appendChild(imgSlot);
        container.appendChild(titleSlot);
        container.setAttribute('role', 'button');
        this.updateStyle();
    }
    //custom properties getter/setter
    get flat() {
        let attrTarget = 'flat';
        return this.getAttribute(attrTarget) !== null;
    }
    set flat(is) {
        let attrTarget = 'flat';
        if (is) {
            this.setAttribute(attrTarget, '');
        }
        else {
            this.removeAttribute(attrTarget);
        }
    }
    get rounded() {
        let attrTarget = 'rounded';
        return this.getAttribute(attrTarget) !== null;
    }
    set rounded(is) {
        let attrTarget = 'rounded';
        if (is) {
            this.setAttribute(attrTarget, '');
        }
        else {
            this.removeAttribute(attrTarget);
        }
    }
    get icon() {
        let attrTarget = 'icon';
        return this.getAttribute(attrTarget) !== null;
    }
    set icon(is) {
        let attrTarget = 'icon';
        if (is) {
            this.setAttribute(attrTarget, '');
        }
        else {
            this.removeAttribute(attrTarget);
        }
    }
    //style handler
    updateStyle() {
        let styleList = nutStyle.CSSFilesMap.get(this.componentTagName);
        if (styleList) {
            if (typeof (styleList) === 'string') {
                styleList = [styleList];
            }
            styleList.forEach((val, index, arr) => {
                let cntCssLink = document.createElement('link');
                cntCssLink.rel = 'stylesheet';
                cntCssLink.href = val;
                this.styleLinksList.appendChild(cntCssLink);
            });
        }
    }
    //attr listener
    static get observedAttributes() {
        return ['inline', 'icon', 'rounded', 'flat'];
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
        else if (name === 'icon') {
            if (newVal === null) {
                container.querySelector('slot[name = title]').style.display = '';
                container.style.padding = '0 10px';
            }
            else {
                container.querySelector('slot[name = title]').style.display = 'none';
                container.style.padding = '6px';
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
        else if (name === 'flat') {
            if (newVal === null) {
                container.classList.remove('flat');
            }
            else {
                container.classList.add('flat');
            }
        }
    }
}
customElements.define('hx-button', HxButton);
