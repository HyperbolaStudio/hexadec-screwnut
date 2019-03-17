import { HxInteractionTarget } from './HxInteractionTarget';
export class HxButton extends HxInteractionTarget {
    constructor() {
        super();
        this.container.tabIndex = 0;
        this.imgElement = document.createElement('img');
        this.imgElement.className = 'icon-elem';
        this.imgElement.style.display = 'none';
        this.titleElement = document.createElement('div');
        this.titleElement.className = 'title-elem';
        this.container.appendChild(this.imgElement);
        this.container.appendChild(this.titleElement);
        this.container.setAttribute('role', 'button');
        this.updateStyle();
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
    get btnTitle() {
        return this.getAttribute('btn-title');
    }
    set btnTitle(txt) {
        if (txt) {
            this.setAttribute('btn-title', txt);
        }
        else {
            this.removeAttribute('btn-title');
        }
    }
    get btnIconSrc() {
        return this.getAttribute('btn-icon-src');
    }
    set btnIconSrc(src) {
        if (src) {
            this.setAttribute('btn-icon-src', src);
        }
        else {
            this.removeAttribute('btn-icon-src');
        }
    }
    static get observedAttributes() {
        return ['inline', 'icon', 'rounded', 'flat', 'btn-icon-src', 'btn-title'];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        let container = this.container;
        let containerClass = this.container.classList;
        for (let attr of HxButton.observedAttributes) {
            if (name === 'btn-icon-src' || name === 'btn-title') {
                break;
            }
            if (name === attr) {
                if (newVal === null) {
                    containerClass.remove(attr);
                }
                else {
                    containerClass.add(attr);
                }
                break;
            }
        }
        if (name === 'btn-icon-src') {
            if (newVal === null) {
                this.imgElement.style.display = 'none';
                this.imgElement.src = '';
            }
            else {
                this.imgElement.style.display = '';
                this.imgElement.src = newVal;
            }
        }
        else if (name === 'btn-title') {
            this.titleElement.textContent = newVal;
        }
    }
    build(b) {
        let btn = this;
        btn.btnTitle = b.btnTitle;
        btn.btnIconSrc = b.btnIconSrc || null;
        btn.onclick = b.onclick;
    }
}
customElements.define('hx-button', HxButton);
