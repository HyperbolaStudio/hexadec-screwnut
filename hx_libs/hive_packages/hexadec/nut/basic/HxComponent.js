"use strict";
class HxComponent extends HTMLElement {
    constructor() {
        super();
        this.componentTagName = '';
        //shadow attachment
        this.attachShadow({ mode: 'open' });
        //add style handler links list
        let styleLinksList = document.createElement('div');
    }
}
class NutDesignDeclaration {
    constructor() {
        this._CSSFilesMap = new Map();
        //test code
        this._CSSFilesMap.set('hx-button', './hx_libs/hive_packages/hexadec/nut/basic/HxButton.css');
        //test code end
    }
    get CSSFilesMap() {
        return this._CSSFilesMap;
    }
}
