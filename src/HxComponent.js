"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NutDesignDeclaration {
    constructor() {
        this._CSSFilesMap = new Map();
        //test code
        this._CSSFilesMap.set('hx-button', './src/studio/hyperbola/plastic/nutd/HxButton.css');
        //test code end
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
class HxComponent extends HTMLElement {
    constructor() {
        super();
        this.componentTagName = '';
        this.receiver = new Map();
        //shadow attachment
        let shadow = this.attachShadow({ mode: 'open' });
        //add style handler links list
        this.styleLinksList = document.createElement('div');
        this.styleLinksList.className = 'design-declaration';
        shadow.appendChild(this.styleLinksList);
    }
    static broadcast(message, context = document, selector = '*', shadowPenetrate) {
        let funcArr = [];
        (function dfs(root) {
            root.querySelectorAll(selector).forEach((elem, i, list) => {
                if (elem instanceof HxComponent && elem.receiver.has(message)) {
                    funcArr.push(elem.receiver.get(message) || ((arg) => { }));
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
            return new MessagePost([target.receiver.get('message') || ((arg) => { })]);
        }
    }
}
HxComponent.nutStyle = new NutDesignDeclaration();
exports.HxComponent = HxComponent;
