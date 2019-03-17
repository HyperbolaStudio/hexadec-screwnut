class NutDesignDeclaration {
    constructor() {
        this._CSSFilesMap = new Map();
        this._CSSFilesMap.set('HX-BUTTON', './src/studio/hyperbola/plastic/nutd/HxButton.css');
    }
    get CSSFilesMap() {
        return this._CSSFilesMap;
    }
}
class MessagePost {
    constructor(handlers) {
        this.handlers = handlers;
    }
    emit(arg, async = true) {
        if (async) {
            let handlerPromises = [];
            this.handlers.forEach((func, i, arr) => {
                handlerPromises.push(new Promise((result, reject) => {
                    result(func(arg));
                }));
            });
            return Promise.all(handlerPromises);
        }
        else {
            let handlerResults = [];
            this.handlers.forEach((func, i, arr) => {
                handlerResults.push(func(arg));
            });
            return handlerResults;
        }
    }
}
export class HxComponent extends HTMLElement {
    constructor() {
        super();
        this.componentTagName = '';
        this.receiver = new Map();
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
    static broadcast(message, context = document, selector = '*', shadowPenetrate) {
        let funcArr = [];
        (function dfs(root) {
            root.querySelectorAll(selector).forEach((elem, i, list) => {
                if (elem instanceof HxComponent && elem.receiver.has(message)) {
                    funcArr.push(arg => (elem.receiver.get(message) || ((arg) => { }))(arg));
                }
                if (shadowPenetrate && elem.shadowRoot) {
                    dfs(elem.shadowRoot);
                }
            });
        })(context);
        return new MessagePost(funcArr);
    }
    static post(message, target) {
        if (target.receiver.has(message)) {
            return new MessagePost([arg => (target.receiver.get('message') || ((arg) => { }))(arg)]);
        }
    }
}
HxComponent.nutStyle = new NutDesignDeclaration();
