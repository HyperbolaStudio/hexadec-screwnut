var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
function getSlotHandler(slot) {
    let handler = {
        attr: {
            setter: (attribute) => {
                slot.targetElem.setAttribute(slot.targetName, attribute);
            },
            getter: () => {
                return slot.targetElem.getAttribute(slot.targetName);
            }
        },
        style: {
            setter: (property, priority) => {
                slot.targetElem.style.setProperty(slot.targetName, property, priority);
            },
            getter: () => {
                return slot.targetElem.style.getPropertyValue(slot.targetName);
            }
        },
        elem: {
            getter: () => {
                return slot.targetElem;
            }
        }
    };
    return handler;
}
function setSlot(slotMap, slotName, slot) {
    slotMap.set(slotName, slot);
}
function getSlot(slotMap, slotName) {
    return slotMap.get(slotName);
}
function slotIn(slotMap, key, value, priority) {
    let slot = slotMap.get(key);
    if (slot) {
        switch (slot.type) {
            case 'attr':
                getSlotHandler(slot).attr.setter(value);
                break;
            case 'style':
                getSlotHandler(slot).style.setter(value, priority);
        }
    }
}
function build(n, target) {
    let elem = document.createElement(n.tagName);
    if (n.attr) {
        for (let k in n.attr) {
            elem.setAttribute(k, n.attr[k]);
        }
    }
    if (n.style) {
        for (let k in n.style) {
            let v = n.style[k];
            if (typeof (v) === 'string') {
                elem.style.setProperty(k, v);
            }
            else {
                elem.style.setProperty(k, v.value, v.important ? 'important' : null);
            }
        }
    }
    if (n.DOMSlot && elem instanceof HxComponent) {
        for (let k in n.DOMSlot) {
            let slot = getSlot(elem.DOMSlotMap, k);
            if (slot) {
                slotIn(elem.DOMSlotMap, k, n.DOMSlot[k]);
            }
        }
    }
    if (n.child) {
        for (let childModel of n.child) {
            elem.appendChild(build(childModel, target));
        }
    }
    return elem;
}
export function View(model, containerTargetSlot) {
    return (target) => {
        let buildPos;
        if (containerTargetSlot) {
            let slot = getSlot(target.prototype.DOMSlotMap, containerTargetSlot);
            if (slot && slot.type === 'elem') {
                buildPos = slot.targetElem;
            }
            else {
                buildPos = target.prototype.container;
            }
        }
        else {
            buildPos = target.prototype.container;
        }
        if (!(model instanceof Array)) {
            buildPos.appendChild(build(model, target));
        }
        else {
            for (let m of model) {
                buildPos.appendChild(build(m, target));
            }
        }
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
        shadow.appendChild(this.container);
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
let XTest = class XTest extends HxComponent {
};
XTest = __decorate([
    Component('x-test'),
    View({
        tagName: 'p',
        style: {
            'width': '100px',
            'height': '100px',
            'background': '#00a0e9',
        },
    })
], XTest);
