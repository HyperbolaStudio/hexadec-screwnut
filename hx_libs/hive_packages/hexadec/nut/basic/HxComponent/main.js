"use strict";
class HxComponent extends HTMLElement {
    constructor() {
        super();
        this.componentTagName = '';
        //shadow attachment
        let shadow = this.attachShadow({ mode: 'open' });
        //add style handler links list
        this.styleLinksList = document.createElement('div');
        this.styleLinksList.className = 'design-declaration';
        shadow.appendChild(this.styleLinksList);
    }
}
class NutDesignDeclaration {
    constructor() {
        this._CSSFilesMap = new Map();
        //test code
        this._CSSFilesMap.set('hx-button', './hx_libs/hive_packages/studio/hyperbola/plastic/nutd/HxButton.css');
        //test code end
    }
    get CSSFilesMap() {
        return this._CSSFilesMap;
    }
}
var nutStyle = new NutDesignDeclaration();
