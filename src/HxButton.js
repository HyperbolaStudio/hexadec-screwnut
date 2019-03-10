import { HxIA } from './HxIA';
import { HxComponent } from './HxComponent';
export class HxButton extends HxIA {
    constructor() {
        super();
        this.componentTagName = 'hx-button';
        let shadow = this.shadowRoot;
        // let container:any = shadow.querySelector('.container');
        this.areaSlot.remove();
        this.imgElement = document.createElement('img'); //button icon
        this.imgElement.className = 'icon-elem';
        this.imgElement.style.display = 'none';
        this.titleElement = document.createElement('div'); //button title
        this.titleElement.className = 'title-elem';
        this.container.appendChild(this.imgElement);
        this.container.appendChild(this.titleElement);
        this.container.setAttribute('role', 'button');
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
    //style handler
    updateStyle() {
        let styleList = HxComponent.nutStyle.CSSFilesMap.get(this.componentTagName);
        if (styleList) {
            if (typeof (styleList) === 'string') {
                styleList = [styleList];
            }
            styleList.forEach((val, index, arr) => {
                let cssLink = document.createElement('link');
                cssLink.rel = 'stylesheet';
                cssLink.href = val;
                this.styleLinksList.appendChild(cssLink);
            });
        }
    }
    //attr listener
    static get observedAttributes() {
        return ['inline', 'icon', 'rounded', 'flat', 'btn-icon-src', 'btn-title'];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        let container = this.container;
        let containerClass = this.container.classList;
        //style-alike attr handler
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
            }
            else {
                this.imgElement.style.display = '';
                this.imgElement.src = newVal;
            }
        }
        else if (name === 'btn-title') {
            if (newVal) {
                this.titleElement.innerText = newVal;
            }
        }
    }
}
customElements.define('hx-button', HxButton);
