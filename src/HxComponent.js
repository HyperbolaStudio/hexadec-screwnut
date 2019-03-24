class NutDesignDeclaration {
    constructor() {
        this._CSSFilesMap = new Map();
        this._CSSFilesMap.set('HX-BUTTON', './src/studio/hyperbola/plastic/nutd/HxButton.css');
    }
    get CSSFilesMap() {
        return this._CSSFilesMap;
    }
}
export function Component(tagName) {
    return (target) => {
        customElements.define(tagName, target);
    };
}
export function View(model, containerTarget) {
    return (target) => {
    };
}
export class HxComponent extends HTMLElement {
    constructor() {
        super();
        this.DOMSlotMap = new Map();
        this.container = document.createElement('div');
        let shadow = this.attachShadow({ mode: 'open' });
        this.styleLinksList = document.createElement('div');
        this.styleLinksList.className = 'design-declaration';
        shadow.appendChild(this.styleLinksList);
    }
    updateStyle() {
        let styleList = HxComponent.nutStyle.CSSFilesMap.get(this.tagName);
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
}
HxComponent.nutStyle = new NutDesignDeclaration();
