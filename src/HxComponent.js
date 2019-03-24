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
        let buildPos;
        if (containerTarget) {
            buildPos = target.prototype.get(containerTarget) || target.prototype.container;
        }
        else {
            buildPos = target.prototype.container;
        }
        let buildTarget;
        function build(n) {
            let elem = document.createElement(n.tagName);
            if (n.attr) {
                for (let k in n.attr) {
                    elem.setAttribute(k, n.attr[k]);
                }
            }
            if (n.style) {
                for (let k in n.style) {
                    elem.style[k] = n.style[k] || '';
                }
            }
            if (n.DOMSlot && elem instanceof HxComponent) {
                for (let k in n.DOMSlot) {
                    elem._setDOMSlot(k, n.DOMSlot[k]);
                }
            }
            if (n.child) {
                for (let childModel of n.child) {
                    elem.appendChild(build(childModel));
                }
            }
            return elem;
        }
    };
}
let x = {
    tagName: 'div',
    style: {
        lineHeight: '10px',
    }
};
export class HxComponent extends HTMLElement {
    constructor() {
        super();
        this._setDOMSlot = (slotName, value) => {
        };
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
