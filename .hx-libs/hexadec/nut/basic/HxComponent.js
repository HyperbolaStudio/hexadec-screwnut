"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var HxComponent = /** @class */ (function (_super) {
    __extends(HxComponent, _super);
    function HxComponent() {
        return _super.call(this) || this;
    }
    HxComponent.prototype.createStyle = function (styleText) {
        var style = document.createElement('style');
        style.textContent = styleText;
        if (this.shadowRoot) {
            this.shadowRoot.appendChild(style);
        }
        else {
            throw new Error("Shadow Root is not openen or not exist. try \"attachShadow({mode:'open'})\" first. ");
        }
        return style;
    };
    return HxComponent;
}(HTMLElement));
